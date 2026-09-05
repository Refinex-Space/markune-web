# 阿里云 Ubuntu 24.04 + Nginx 静态部署手册

本文适用于已安装 Nginx 的 Ubuntu 24.04 服务器，以及当前 Markune Web 的 Next.js 静态导出配置。构建在本地完成，服务器只接收 `out/` 的内容，无需安装 Node.js、pnpm、PM2 或数据库。

发布使用独立版本目录，Nginx 固定指向 `current` 软链接。这样可以先完整上传，再切换版本，也便于回滚。

## 1. 准备参数与检查环境

示例值必须按实际情况替换，文中不会假定你的真实域名、IP 或登录账号：

| 参数 | 示例 | 说明 |
| --- | --- | --- |
| 域名 | `example.com` | 网站域名，不带协议；全文配置与验收命令需同步替换 |
| 公网 IP | `203.0.113.10` | 文档示例地址，不能直接使用 |
| SSH 用户 | `ubuntu` | 实际有 sudo 权限的登录用户 |
| SSH 端口 | `22` | 以服务器实际配置为准 |
| 站点目录 | `/var/www/markune-web` | 本文统一使用的目录 |

**本地终端**（macOS / Linux；Windows 可使用 WSL），进入本项目根目录：

```bash
export MARKUNE_HOST=203.0.113.10
export MARKUNE_SSH_USER=ubuntu
export MARKUNE_SSH_PORT=22
export MARKUNE_SITE_URL=https://example.com
node --version
pnpm --version
ssh -p "$MARKUNE_SSH_PORT" "$MARKUNE_SSH_USER@$MARKUNE_HOST"
```

本地使用 Node.js 24、pnpm 11.12.0。首次 SSH 连接应核对主机指纹，不要关闭主机密钥校验。密钥登录可在 SSH 配置中设置 `IdentityFile`，或给 `ssh` / `scp` 增加 `-i` 参数。

**服务器终端**检查：

```bash
lsb_release -ds
nginx -v
sudo nginx -t
sudo systemctl status nginx --no-pager
ls -l /etc/nginx/sites-enabled/
```

本文采用 Ubuntu 软件包常见的 `sites-available` / `sites-enabled` 布局。若使用宝塔、源码安装或其他布局，先确认主配置实际包含哪个站点目录，再调整配置路径。已有配置检查失败时先处理错误，不要直接覆盖已有站点。[Ubuntu 配置说明](https://ubuntu.com/server/docs/how-to/web-services/configure-nginx/)

在阿里云安全组中允许网站入站 TCP `80`、`443`；SSH 端口仅向管理来源开放。若启用了 UFW，再允许这两个 Web 端口：

```bash
sudo ufw status verbose
# 仅在 UFW 已启用时执行以下两行
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

不要为本站开放 `3000` 或 `4273`，也不要在尚未确认 SSH 放行规则时直接启用 UFW。安全组与系统防火墙需要分别核对。[阿里云安全组说明](https://help.aliyun.com/zh/ecs/user-guide/start-using-security-groups)

将域名 A 记录指向服务器公网 IPv4；只有配置了可用 IPv6 时才添加 AAAA 记录。中国内地服务器对外提供网站服务前，应完成所用域名的备案及接入要求；页面现有备案号也需核对是否适用于该域名。[阿里云网站搭建说明](https://help.aliyun.com/zh/dws/getting-started/the-whole-process-of-website-building)

## 2. 本地构建与打包

**回到本地终端**，保持第 1 节的本地变量可用。在项目根目录执行；任一检查失败均应停止发布：

```bash
pnpm install --frozen-lockfile
NEXT_PUBLIC_SITE_URL="$MARKUNE_SITE_URL" pnpm build && pnpm check:static
```

修改过代码时，建议先运行 `pnpm verify`；首次运行需 `pnpm exec playwright install chromium`。该套端到端测试运行在开发服务上，不能代替第 7 节的生产验收。

`NEXT_PUBLIC_SITE_URL` 会写入构建产物的元信息，修改服务器环境变量或重载 Nginx 均不会更新它。当前站点部署在域名根路径，不适用于直接挂到 `/markune/` 等子目录。[Next.js 静态导出说明](https://nextjs.org/docs/app/guides/static-exports)

检查产物并生成带版本号的压缩包，包放在仓库外的同级目录：

```bash
test -f out/index.html && test -f out/404.html && test -d out/_next/static
export MARKUNE_RELEASE="$(date -u +%Y%m%dT%H%M%SZ)-$(git rev-parse --short HEAD)"
export MARKUNE_PACKAGE_DIR="$(cd .. && pwd)/markune-web-packages"
mkdir -p "$MARKUNE_PACKAGE_DIR"
COPYFILE_DISABLE=1 tar -czf "$MARKUNE_PACKAGE_DIR/markune-web-$MARKUNE_RELEASE.tar.gz" -C out .
(
  cd "$MARKUNE_PACKAGE_DIR" &&
  shasum -a 256 "markune-web-$MARKUNE_RELEASE.tar.gz" > "markune-web-$MARKUNE_RELEASE.tar.gz.sha256"
)
printf '%s\n' "$MARKUNE_RELEASE"
```

记录输出的版本号，后续服务器步骤使用相同值。版本号中的 Git 短哈希仅标识当前提交，不代表工作区一定干净；正式发布前应核对 `git status --short`。macOS 自带 `shasum`；Linux 若无该命令，可将其替换为 `sha256sum`。

压缩包根目录应直接包含 `index.html`、`404.html`、`_next/`、`assets/` 及各页面目录，不能多套一层 `out/`。必须上传完整产物，包括 Next.js 生成的导航数据文件；不要只挑选 HTML、CSS 和 JS。

## 3. 创建服务器目录并上传

**服务器终端**，首次部署时执行：

```bash
mkdir -p "$HOME/markune-web-upload"
chmod 700 "$HOME/markune-web-upload"
sudo install -d -o root -g root -m 755 /var/www/markune-web
sudo install -d -o root -g root -m 755 /var/www/markune-web/releases
```

上传目录只用于暂存，站点目录由 root 管理；Nginx 只需读取权限，不需要拥有写权限。

**本地终端**，沿用第 2 节的变量：

```bash
scp -P "$MARKUNE_SSH_PORT" \
  "$MARKUNE_PACKAGE_DIR/markune-web-$MARKUNE_RELEASE.tar.gz" \
  "$MARKUNE_PACKAGE_DIR/markune-web-$MARKUNE_RELEASE.tar.gz.sha256" \
  "$MARKUNE_SSH_USER@$MARKUNE_HOST:markune-web-upload/"
```

注意 `scp` 指定端口使用大写 `-P`，`ssh` 使用小写 `-p`。不要上传源码、`.env*`、`node_modules/` 或 `.next/`。

## 4. 校验、解压并切换版本

**服务器终端**，把下面的版本号替换为第 2 节记录的真实值。整个代码块在子 Shell 中执行，任一步失败都会停止：

```bash
(
  set -eu
  MARKUNE_RELEASE=20260905T100000Z-abc1234
  MARKUNE_ROOT=/var/www/markune-web
  MARKUNE_RELEASE_DIR="$MARKUNE_ROOT/releases/$MARKUNE_RELEASE"

  cd "$HOME/markune-web-upload"
  sha256sum -c "markune-web-$MARKUNE_RELEASE.tar.gz.sha256"
  # 每次发布必须使用新目录；同名目录已存在时停止，避免覆盖旧版本
  sudo mkdir -m 755 "$MARKUNE_RELEASE_DIR"
  sudo tar --no-same-owner -xzf "markune-web-$MARKUNE_RELEASE.tar.gz" -C "$MARKUNE_RELEASE_DIR"
  sudo chown -R root:root "$MARKUNE_RELEASE_DIR"
  sudo find "$MARKUNE_RELEASE_DIR" -type d -exec chmod 755 {} +
  sudo find "$MARKUNE_RELEASE_DIR" -type f -exec chmod 644 {} +
  sudo test -f "$MARKUNE_RELEASE_DIR/index.html"
  sudo test -f "$MARKUNE_RELEASE_DIR/404.html"
  sudo test -f "$MARKUNE_RELEASE_DIR/blog/getting-started/index.html"
  sudo test -d "$MARKUNE_RELEASE_DIR/_next/static"

  # 保留当前版本路径，供回滚时查询
  if [ -L "$MARKUNE_ROOT/current" ]; then
    readlink -f "$MARKUNE_ROOT/current" | sudo tee "$MARKUNE_ROOT/previous-release.txt"
  elif [ -e "$MARKUNE_ROOT/current" ]; then
    echo 'current 已存在且不是软链接，请先核对目录用途。' >&2
    exit 1
  fi

  sudo ln -s "$MARKUNE_RELEASE_DIR" "$MARKUNE_ROOT/current.next"
  sudo mv -Tf "$MARKUNE_ROOT/current.next" "$MARKUNE_ROOT/current"
  readlink -f "$MARKUNE_ROOT/current"
)
```

校验应显示 `OK`，最后输出新版本路径。`current.next` 若已存在，先检查上次发布状态，不能跳过错误；不要同时进行两个发布。`mv -Tf` 是 Ubuntu 上 GNU `mv` 的语法，用于在同一目录内原子替换软链接。

最终目录类似：

```text
/var/www/markune-web/
├── releases/
│   └── 20260905T100000Z-abc1234/
│       ├── index.html
│       ├── 404.html
│       ├── _next/
│       ├── assets/
│       ├── download/index.html
│       └── blog/getting-started/index.html
├── current -> releases/20260905T100000Z-abc1234
└── previous-release.txt   # 第二次发布起记录上一个版本路径
```

## 5. 配置 Nginx

**服务器终端**，首次部署时创建独立站点文件：

```bash
sudo nano /etc/nginx/sites-available/markune-web
```

如果同名配置已存在，先备份并审阅，不要覆盖正在使用的 HTTPS 配置。将以下内容写入文件，把 `example.com` 替换为实际域名：

```nginx
server {
    listen 80;
    server_name example.com;

    root /var/www/markune-web/current;
    index index.html;
    charset utf-8;

    access_log /var/log/nginx/markune-web.access.log;
    error_log /var/log/nginx/markune-web.error.log;

    # 带内容哈希的构建资源可长期缓存；404 不附带 immutable 缓存头
    location ^~ /_next/static/ {
        try_files $uri =404;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # 拒绝隐藏文件，保留 ACME 证书验证路径
    location ~ /\.(?!well-known(?:/|$)) {
        deny all;
    }

    error_page 404 /404.html;
    location = /404.html {
        internal;
        add_header Cache-Control "no-cache" always;
    }

    # 子路由对应目录中的 index.html；其他文件按真实路径返回
    location / {
        try_files $uri $uri/ =404;
        add_header Cache-Control "no-cache" always;
    }
}
```

此配置与 `trailingSlash: true` 对应，访问 `/download` 会由目录规则跳转到 `/download/`，刷新指南详情也能找到对应文件。不存在的路径返回真正的 `404`，不要使用 `/index.html` 作为所有路由的兜底。[Nginx `try_files` 说明](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files)

HTML、无哈希图片和导航数据使用 `no-cache`，允许存储但每次需向服务器重新验证；只有 `/_next/static/` 使用长期缓存。不要给所有资源一律设置 `immutable`。

启用站点并检查：

```bash
# 首次启用时执行；若软链接已存在，先用 ls -l 核对，无需重复创建
sudo ln -s /etc/nginx/sites-available/markune-web /etc/nginx/sites-enabled/markune-web
sudo nginx -t && sudo systemctl reload nginx
curl -I -H 'Host: example.com' http://127.0.0.1/
curl -I -H 'Host: example.com' http://127.0.0.1/blog/getting-started/
```

两条 HTTP 请求应返回 `200`。通过实际域名访问时 Nginx 会匹配 `server_name`，无需删除其他站点或默认站点。域名未解析前，可在本地临时验收：

```bash
curl --resolve example.com:80:203.0.113.10 -I http://example.com/download/
```

若暂时仅使用 IP，可把 `server_name` 改为真实公网 IP，通过 `http://公网IP/` 验证；以后需改回域名并重新构建域名元信息。不要设置冲突的 `default_server`。发布 IPv6 的 AAAA 记录时，还需要相应 IPv6 网络放行和 `listen [::]:80;`。

## 6. 配置 HTTPS

先确认真实域名已解析、80 端口从公网可达，且命中本站。下面采用 [Certbot 官方 Nginx + Snap 方式](https://certbot.eff.org/instructions?os=snap&ws=nginx)；已有证书或 Certbot 时沿用既有安装和续期方式，不要重复安装。

**服务器终端**：

```bash
command -v certbot
snap list certbot
```

未安装时，上面可能提示未找到。确认没有其他安装方式后执行：

```bash
sudo apt update
sudo apt install -y snapd
sudo snap install --classic certbot
```

备份配置并申请证书，域名必须替换；按提示提供真实联系邮箱并同意服务条款：

```bash
sudo cp -a /etc/nginx/sites-available/markune-web "/etc/nginx/sites-available/markune-web.bak.$(date -u +%Y%m%dT%H%M%SZ)"
sudo /snap/bin/certbot --nginx -d example.com --redirect
sudo nginx -t && sudo systemctl reload nginx
sudo /snap/bin/certbot renew --dry-run
systemctl list-timers --all | grep -i certbot
```

Certbot 会更新站点配置并添加 HTTPS 与重定向。只有 `www` 也已解析到此服务器、加入 `server_name` 且需要提供服务时，才增加 `-d www.example.com`。使用已有 Certbot 时，将 `/snap/bin/certbot` 替换为其实际可执行路径。

检查续期演练成功、自动续期定时器存在。后续保留 HTTP 验证所需的 80 端口，不要再用第 5 节的初始 HTTP 模板覆盖生成后的配置。

## 7. 线上验收

**本地终端**，将域名替换后执行：

```bash
curl -I http://example.com/
curl -I https://example.com/
curl -I https://example.com/download/
curl -I https://example.com/blog/getting-started/
curl -I https://example.com/assets/markune-logo-dark.svg
curl -I https://example.com/this-page-does-not-exist/
curl -I https://example.com/_next/static/missing-file.js
```

预期结果：HTTP 跳转 HTTPS；首页、下载、指南与图片为 `200`；不存在的页面和 JS 为 `404`。正常页面应带 `Cache-Control: no-cache`。从浏览器 Network 面板复制一个真实 `/_next/static/` 资源 URL，再用 `curl -I` 确认 `200` 和长期缓存头；不要拿不存在的文件验证缓存命中。

浏览器还需检查：

- 首页和指南在桌面、手机宽度下显示正常，直接打开并刷新嵌套路由成功。
- 站内导航、图片、字体加载正常，Network 中没有本站资源 404；页面源码中的 Open Graph 地址和指南 canonical 使用实际域名。
- 下载页能获取 GitHub 发布信息，或在请求失败时显示 Releases 备用入口。其网络依赖是浏览器访问 GitHub API，Nginx 可访问不代表下载能力已通过验证。
- 联系页当前只模拟提交成功，不会发信或存储留言，不能把成功提示当作邮件送达验收。

## 8. 后续更新与回滚

**更新**：重新执行第 2～4 节，使用新的版本号，完成第 7 节验收。配置未变时无需重载 Nginx；不要直接覆盖 `current` 中的文件。保留至少上一个已验收版本和对应压缩包。

软链接切换能避免发布期间出现半套文件，但不保证已打开的旧页面与新资源完全一致。旧标签页若请求旧构建中尚未加载的 JS，可能遇到 404；此时刷新页面。若后续需要保证长期打开页面跨版本继续工作，应单独设计旧哈希资源保留策略。

**回滚**：先查询记录，确认目标确实是已验收版本：

```bash
cat /var/www/markune-web/previous-release.txt
ls -l /var/www/markune-web/releases/
```

把旧版本目录填入以下变量，再执行：

```bash
(
  set -eu
  MARKUNE_ROLLBACK_DIR=/var/www/markune-web/releases/20260905T100000Z-abc1234
  sudo test -f "$MARKUNE_ROLLBACK_DIR/index.html"
  sudo test -f "$MARKUNE_ROLLBACK_DIR/404.html"
  sudo test -d "$MARKUNE_ROLLBACK_DIR/_next/static"
  sudo ln -s "$MARKUNE_ROLLBACK_DIR" /var/www/markune-web/current.rollback
  sudo mv -Tf /var/www/markune-web/current.rollback /var/www/markune-web/current
  readlink -f /var/www/markune-web/current
)
```

随后重复线上验收。回滚静态文件不会回滚 Nginx 配置或证书；如故障来自配置，应恢复对应配置备份，再执行 `sudo nginx -t && sudo systemctl reload nginx`。清理旧版本前必须核对 `current` 和回滚目标，不要删除仍需使用的目录。

## 9. 常见故障

| 现象 | 优先检查 |
| --- | --- |
| 显示 Nginx 欢迎页 | 请求的 Host 是否匹配 `server_name`；站点软链接是否启用；是否完成 reload |
| 403 | `current` 是否指向有效目录；每级目录是否有读取和进入权限；是否缺少 `index.html` |
| 首页正常，子页面刷新 404 | 是否完整上传 `out/`；是否多套了一层 `out`；`try_files` 是否与目录型导出匹配 |
| 样式或脚本 404 | `_next/` 是否完整；是否误部署到子路径；是否为发布前已打开的旧标签页 |
| 改域名后分享地址仍旧 | 用正确 `NEXT_PUBLIC_SITE_URL` 重新构建并上传，不是只修改 Nginx |
| 下载页无法取得版本 | 浏览器到 GitHub API 的网络、限流、Release 状态及安装包名称是否符合代码约定 |
| 公网超时，本机正常 | 安全组、UFW、DNS A / AAAA、Nginx 监听地址 |
| 证书签发或续期失败 | 域名解析、80 端口公网可达性、匹配的站点配置与 Certbot 日志 |

**服务器诊断命令**：

```bash
sudo nginx -t
sudo journalctl -u nginx -n 50 --no-pager
sudo tail -n 50 /var/log/nginx/markune-web.error.log
namei -l /var/www/markune-web/current/index.html
readlink -f /var/www/markune-web/current
```

本手册中的服务器命令需要在目标主机执行后才能确认部署成功；本地构建和静态检查不包含阿里云网络、实际 Nginx 或证书签发验证。
