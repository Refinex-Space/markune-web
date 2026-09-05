# 阿里云 Ubuntu 24.04 + Nginx 静态部署手册

本机用 `pnpm build` 打出静态站点，再用 Termius 等 SSH / SFTP 工具连上服务器上传文件并配置 Nginx。服务器不需要安装 Node.js、pnpm、PM2 或数据库。

将全文命令和配置中的 `example.com` 统一换成实际域名。站点固定放在 `/var/www/markune-web/`。

## 1. 本机打包

在项目根目录执行：

```bash
pnpm install --frozen-lockfile
NEXT_PUBLIC_SITE_URL=https://example.com pnpm build
pnpm check:static
```

把 `https://example.com` 换成实际上线地址（含 `https://`，不要末尾斜杠）。这个值会写进页面的分享图和 canonical，只改 Nginx 不会更新它。

构建成功后，项目根目录会出现 `out/`。确认里面直接有这些内容再上传：

```text
out/
├── index.html
├── 404.html
├── _next/
├── assets/
├── download/index.html
└── blog/getting-started/index.html
```

上传的是 `out/` **里面的文件**，不要把整个 `out` 文件夹再套一层传到服务器。不要上传源码、`.env*`、`node_modules/` 或 `.next/`。

站点按域名根路径部署，不能直接挂到 `/markune/` 这类子目录。

## 2. 上传到服务器

用 Termius 连上 Ubuntu 24.04 服务器（SSH 终端 + SFTP 均可）。首次部署时，在服务器终端执行：

```bash
sudo mkdir -p /var/www/markune-web
sudo chown "$USER:$USER" /var/www/markune-web
```

然后用 SFTP 把本机 `out/` 目录中的全部内容上传到：

```text
本机：<项目根目录>/out/*
服务器：/var/www/markune-web/
```

传完后服务器上应是：

```text
/var/www/markune-web/
├── index.html
├── 404.html
├── _next/
├── assets/
├── download/index.html
└── blog/getting-started/index.html
```

如果上传后文件权限过严，在服务器终端补一次：

```bash
find /var/www/markune-web -type d -exec chmod 755 {} +
find /var/www/markune-web -type f -exec chmod 644 {} +
```

### 域名与两层防火墙

域名 A 记录指向这台服务器的公网 IPv4。根域名和 `www` 都需要访问时，分别设置 `@` 和 `www` 的 A 记录。中国内地服务器对外提供网站服务前，先完成域名备案。

**阿里云控制台**：轻量应用服务器在“防火墙”中放行 TCP `80`、`443`，来源为 `0.0.0.0/0`，并确认规则已启用；ECS 则检查对应安全组的入方向规则。

**服务器终端**：阿里云放行端口后，还要检查 Ubuntu 自身的 UFW，二者独立生效：

```bash
sudo ufw status verbose
```

如果显示 `Status: active`，且没有允许 `80/tcp`、`443/tcp`，执行：

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw status verbose
```

确认输出中有这两个端口的 `ALLOW IN` 规则。规则立即生效，无需重启 Nginx，也不需要关闭 UFW；保留原来的 SSH 规则。若 UFW 为 `inactive`，本步骤无需启用它。[Ubuntu UFW 说明](https://help.ubuntu.com/community/UFW)

特别注意：`Default: deny (incoming)` 且仅放行 `22/tcp` 时，SSH 和服务器本机访问可以正常，公网网站连接仍会被拦截。

## 3. 配置 Nginx

服务器已安装 Nginx。首次部署时创建站点配置：

```bash
sudo nano /etc/nginx/sites-available/markune-web
```

写入下面内容，只替换 `example.com`：

```nginx
server {
    listen 80;
    server_name example.com;

    root /var/www/markune-web;
    index index.html;
    charset utf-8;

    access_log /var/log/nginx/markune-web.access.log;
    error_log /var/log/nginx/markune-web.error.log;

    location ^~ /_next/static/ {
        try_files $uri =404;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location ~ /\.(?!well-known(?:/|$)) {
        deny all;
    }

    error_page 404 /404.html;
    location = /404.html {
        internal;
        add_header Cache-Control "no-cache" always;
    }

    location / {
        try_files $uri $uri/ =404;
        add_header Cache-Control "no-cache" always;
    }
}
```

`try_files $uri $uri/ =404` 对应本项目的 `trailingSlash: true`：访问 `/download` 会落到 `download/index.html`，刷新指南详情也能找到文件。不存在的路径返回真正的 `404`，不要写成回退到 `/index.html`。

如果根域名和 `www` 都要提供服务，将上面的域名配置写为 `server_name example.com www.example.com;`，并确保两条 DNS 记录均已生效。

启用站点：

```bash
sudo ln -s /etc/nginx/sites-available/markune-web /etc/nginx/sites-enabled/markune-web
sudo nginx -t && sudo systemctl reload nginx
```

若软链接已经存在，不必重复创建。同名配置已在用时，先备份再改，不要覆盖现有 HTTPS 证书段。

在服务器上自检：

```bash
curl -I -H 'Host: example.com' http://127.0.0.1/
curl -I -H 'Host: example.com' http://127.0.0.1/blog/getting-started/
```

两条都应返回 `200`，这只证明 Nginx 能在服务器本机提供页面。接着在**本机终端**测试公网 HTTP：

```bash
curl --noproxy '*' -I --connect-timeout 10 --max-time 15 http://example.com/
```

启用 HTTPS 前应返回 `200`。`--noproxy '*'` 排除 curl 显式代理设置的影响，但不会关闭系统 VPN 或透明代理。浏览器再打开 `http://example.com/`、`/download/`、`/blog/getting-started/`，以及一个不存在的地址确认是 404；启用了 `www` 时也要单独验证。

暂时只用 IP 访问时，把 `server_name` 改成公网 IP。正式用域名后改回域名，并用新的 `NEXT_PUBLIC_SITE_URL` 重新构建、重新上传。

## 4. 配置 HTTPS

完整的免费证书申请、配置备份、双域名验证与自动续期步骤见 [使用 Let’s Encrypt 为 Markune 免费开启 HTTPS](https-letsencrypt-nginx.md)。已经配置完成时，按该文档检查访问和续期即可，无需重复申请。

放行 `443/tcp` 不等于启用了 HTTPS。第 3 节配置只监听 HTTP 的 80 端口，完成证书配置前先使用 `http://` 验收。

域名已解析、80 端口从公网能访问本站后，在服务器执行：

```bash
sudo apt update
sudo apt install -y snapd
sudo snap install --classic certbot
sudo /snap/bin/certbot --nginx -d example.com --redirect
sudo nginx -t && sudo systemctl reload nginx
```

按提示填写邮箱并同意条款。Certbot 会改站点配置、加上 HTTPS 和跳转。之后不要再用第 3 节的 HTTP 模板整文件覆盖。

已安装 Certbot 时，用实际可执行路径即可，不要重复安装。`www` 也解析到这台机器且要对外服务时，再增加 `-d www.example.com`。

配置完成后，在本机执行 `curl -I https://example.com/` 确认返回 `200`，再执行 `curl -I http://example.com/` 确认跳转到 HTTPS。

## 5. 以后更新

1. 本机重新执行第 1 节，得到新的 `out/`。
2. 用 Termius 把 `out/` 里的全部内容覆盖上传到 `/var/www/markune-web/`。
3. 用浏览器再打开首页、下载页、一篇指南，并刷新嵌套路由。

配置没改就不用重载 Nginx。换域名后必须用新的 `NEXT_PUBLIC_SITE_URL` 重新构建再上传。

## 6. 常见问题

| 现象 | 优先检查 |
| --- | --- |
| 显示 Nginx 欢迎页 | `server_name` 是否是实际域名；站点软链接是否启用；是否执行了 `reload` |
| 403 | `/var/www/markune-web/index.html` 是否存在；目录是否为 `755`、文件是否为 `644` |
| 首页正常，子页面刷新 404 | 是否完整上传了 `out/` 里的全部文件；是否多套了一层 `out/` |
| 样式或脚本 404 | `_next/` 是否完整上传 |
| 改域名后分享地址仍旧 | 用正确的 `NEXT_PUBLIC_SITE_URL` 重新构建并上传 |
| 公网超时，服务器本机正常 | DNS 是否指向当前公网 IP；阿里云防火墙 / 安全组和 Ubuntu UFW 是否都放行；Nginx 是否监听公网可达的地址 |
| 浏览器显示 502，服务器本机返回 200 | 对比本机直连与代理访问；代理连接源站失败也可能返回 502，不能仅凭浏览器错误判断 Nginx 配置有误 |
| HTTP 正常，HTTPS 不通 | 443 是否在两层防火墙放行；证书是否已配置；Nginx 是否实际监听 443 |

排查时可在服务器执行：

```bash
sudo nginx -t
sudo ufw status verbose
sudo ss -lntp '( sport = :80 or sport = :443 )'
sudo tail -n 50 /var/log/nginx/markune-web.error.log
ls -l /var/www/markune-web/index.html
```

HTTP 应能看到 Nginx 监听 `0.0.0.0:80` 或实际对外服务的网卡地址；只监听 `127.0.0.1:80` 无法接收公网请求。443 则应在 HTTPS 配置完成后出现。

如果浏览器返回 502，而第 3 节的本机直连命令超时，先排查两层防火墙和网络路径。需要对比代理响应时，在**本机终端**将下面的代理地址换成自己实际使用的地址：

```bash
curl --proxy http://127.0.0.1:7897 --noproxy '' -I --connect-timeout 10 --max-time 15 http://example.com/
```

典型情况：DNS 正确、阿里云已放行、Nginx 本机返回 `200`，但 UFW 默认拒绝入站且仅允许 SSH。此时公网直连会超时，经本机代理访问可能返回 `502`。对应修正是补充 UFW 的网站端口放行规则，再做公网验收，无需修改静态资源或增加反向代理。
