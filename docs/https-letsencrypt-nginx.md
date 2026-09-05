# 使用 Let’s Encrypt 为 Markune 免费开启 HTTPS

适用于阿里云 Ubuntu 24.04 + Nginx，使用 Let’s Encrypt 免费证书和 Certbot 完成申请、Nginx 配置及自动续期。本文同时为 `markune.com` 和 `www.markune.com` 配置 HTTPS；用于其他网站时，统一替换域名和站点配置路径。

已经完成 HTTPS 配置的服务器，无需重复安装或申请，直接查看第 5 节的验证与第 6 节的续期维护。静态文件上传步骤见 [前端部署手册](deployment-aliyun-nginx.md)。

## 1. 确认申请条件

- 两个域名的 A 记录均指向当前服务器公网 IPv4，且通过 HTTP 能访问本站。
- 阿里云防火墙 / 安全组与 Ubuntu UFW 均放行 TCP `80`、`443`。
- Nginx 站点配置为 `/etc/nginx/sites-available/markune-web`，已启用并包含以下域名：

```nginx
server_name markune.com www.markune.com;
```

在**本机终端**检查公网 HTTP，申请前应返回 `200`：

```bash
curl -I http://markune.com/
curl -I http://www.markune.com/
```

若连接超时，先按部署手册检查两层防火墙；服务器本机返回 `200` 不能代替公网验证。若配置了 AAAA 记录，也必须保证对应 IPv6 服务可达。

以下安装、申请及维护命令均在 **Termius 的服务器终端**执行。任一步报错时先处理错误，再继续下一步。

## 2. 检查并安装 Certbot

先检查是否已有安装：

```bash
command -v certbot
snap list certbot
```

尚未安装时可能提示未找到。确认没有既有安装后执行：

```bash
sudo apt update
sudo apt install -y snapd
sudo snap install --classic certbot
sudo /snap/bin/certbot --version
```

本文使用 Snap 安装，因此后续统一使用 `/snap/bin/certbot`。如果已经通过其他方式安装，沿用已有安装，将命令中的路径替换为实际路径，不要重复混装。

## 3. 备份并检查 Nginx

备份当前站点配置，保留日期以避免覆盖以前的备份：

```bash
sudo cp -a /etc/nginx/sites-available/markune-web \
  "/etc/nginx/sites-available/markune-web.bak.$(date +%Y%m%d%H%M%S)"

sudo nginx -t
```

确认输出包含 `syntax is ok` 和 `test is successful` 后再申请。备份保存在 `sites-available`，不要将备份文件链接到 `sites-enabled`。

## 4. 申请证书并开启 HTTPS

```bash
sudo /snap/bin/certbot --nginx \
  -d markune.com \
  -d www.markune.com \
  --redirect
```

按提示填写联系邮箱、阅读并确认服务条款。两个 `-d` 表示同一张证书覆盖两个域名；`--nginx` 会自动配置 Nginx，`--redirect` 会让 HTTP 请求跳转到 HTTPS。

成功后，Certbot 会显示证书路径及到期时间。实际路径以命令输出为准，后续也可通过 `certbot certificates` 查询；不要复制或公开其中的私钥文件。

检查配置并重载：

```bash
sudo nginx -t && sudo systemctl reload nginx
```

这个步骤无需重新上传前端文件。若此前构建时使用的 `NEXT_PUBLIC_SITE_URL` 仍为 HTTP 或示例域名，则另按部署手册用实际 HTTPS 地址重新构建、上传，以更新页面元信息。

## 5. 验证 HTTPS 与跳转

在**本机终端**执行：

```bash
curl -I https://markune.com/
curl -I https://www.markune.com/
curl -I http://markune.com/
curl -I http://www.markune.com/
```

预期两个 HTTPS 首页返回 `200`，两个 HTTP 地址返回跳转响应，`Location` 指向对应 HTTPS 地址。不要添加 `-k`，否则会跳过证书验证。

浏览器打开 [Markune](https://markune.com/) 和 [www.markune.com](https://www.markune.com/)，确认没有证书警告，再打开并刷新一篇指南，检查图片、样式及脚本是否正常加载。

在**服务器终端**核对证书和监听端口：

```bash
sudo /snap/bin/certbot certificates
sudo ss -lntp '( sport = :80 or sport = :443 )'
```

证书的域名列表应包含两个域名，且 Nginx 应监听 443。仅在防火墙放行 443 不会自动启用 HTTPS。

## 6. 自动续期与日常维护

Certbot 的 Snap 安装会设置自动续期任务，在证书到期前尝试续期。执行一次演练并检查定时器：

```bash
sudo /snap/bin/certbot renew --dry-run
systemctl list-timers --all | grep -i certbot
```

确认续期演练成功，且列表中存在 Certbot 续期定时器。若没有定时器或演练失败，应先处理问题，不能只凭当前 HTTPS 可用就认为自动续期已经正常。无需额外创建重复的 cron 任务，也不要频繁强制重新签发证书。

后续维护时注意：

- 保留公网 80 端口，用于 HTTP 跳转及当前方案的域名验证。
- 更新网站只上传静态文件；不要用最初的 HTTP 模板覆盖 Certbot 修改后的 Nginx 配置。
- 保留服务器上的 `/etc/letsencrypt/`；换服务器时应规划证书迁移或在新服务器重新申请。
- 域名解析、Nginx 配置或网络规则改变后，重新检查访问和续期演练。

## 7. 常见问题

| 现象 | 检查方向 |
| --- | --- |
| 域名验证超时 | 两个域名的 A / AAAA 记录、80 端口公网可达性、阿里云与 UFW 两层规则 |
| 找不到匹配的 Nginx 站点 | `server_name` 是否包含两个域名，配置是否已在 `sites-enabled` 启用 |
| HTTP 正常，HTTPS 超时 | 两层防火墙是否放行 443、Nginx 是否监听 443 |
| 根域名正常，www 证书报错 | 证书域名列表是否包含 `www.markune.com`，www 是否解析到正确服务器 |
| 浏览器仍显示不安全 | 是否访问 HTTPS；是否存在证书错误或页面加载 HTTP 资源，结合浏览器 Network / Console 排查 |
| 续期演练失败 | 域名和 80 端口是否仍可访问，Nginx 配置是否有效，查看 Certbot 日志 |

服务器诊断命令：

```bash
sudo nginx -t
sudo ufw status verbose
sudo tail -n 50 /var/log/letsencrypt/letsencrypt.log
sudo tail -n 50 /var/log/nginx/markune-web.error.log
```

## 官方资料

- [Let’s Encrypt 入门与免费证书说明](https://letsencrypt.org/getting-started/)
- [Certbot：Nginx + Snap 安装、申请及自动续期](https://certbot.eff.org/instructions?os=snap&ws=nginx)
