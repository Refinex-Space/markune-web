# Markune Web

**Markune 官方网站：产品介绍、桌面客户端下载、使用指南与更新日志。**

[Markune](https://github.com/Refinex-Space/markune) 是以本地 Markdown 为核心，连接写作、知识整理与 AI 协作的桌面工作区。本仓库维护其官方网站的页面、内容与静态资源；桌面应用源码及安装包由主仓库维护。

[桌面应用源码](https://github.com/Refinex-Space/markune) · [客户端下载](https://github.com/Refinex-Space/markune/releases) · [服务器部署手册](docs/deployment-aliyun-nginx.md)

## 站点内容

| 页面 | 路径 | 内容 |
| --- | --- | --- |
| 首页 | `/` | 产品介绍、核心能力、定价展示与常见问题 |
| 下载 | `/download/` | macOS / Windows 安装包选择、版本与文件信息 |
| 使用指南 | `/blog/`、`/blog/[slug]/` | 入门、Markdown 写作、工作流与进阶指南 |
| 更新日志 | `/changelog/` | 产品版本记录 |
| 关于 | `/about/` | 开发者与项目介绍 |
| 联系 | `/contact/` | 联系表单界面 |
| 法律页面 | `/legal/privacy-policy/`、`/legal/terms-of-service/` | 隐私政策与服务条款 |

指南详情在构建时预生成，既有文章地址通过内容映射保留。字体、图片及图标资源随站点部署。

## 技术与运行方式

项目使用 Next.js 16 App Router、React 19、TypeScript 5、Tailwind CSS 4、Radix Primitives 与 Phosphor Icons。具体版本以 [package.json](package.json) 和 [pnpm-lock.yaml](pnpm-lock.yaml) 为准。

[next.config.ts](next.config.ts) 已设置 `output: "export"`、`trailingSlash: true` 与 `images.unoptimized: true`。`pnpm build` 会将完整静态站点生成到 `out/`，子页面以 `路由/index.html` 形式输出，可由 Nginx 直接托管，服务器无需运行 Node.js、Next.js 或 PM2。

当前实现有以下边界：

- 下载页在浏览器中请求 Markune 主仓库的 GitHub Releases API，校验版本及安装包信息；请求失败时提供 Releases 页面入口。安装包仍托管在 GitHub，网站部署不会同步安装包。
- 联系表单目前只执行前端校验并模拟成功状态，**不会发送邮件或保存留言**。
- 定价为页面内容展示；本仓库没有支付、账号或业务后端。
- 站点按域名根路径部署，尚未配置子路径 `basePath`。

## 本地开发

使用 Node.js 24 与 **pnpm 11.12.0**；pnpm 版本由 `packageManager` 固定。本地已验证的 Node.js 版本为 24.14.1。

进入项目目录后执行：

```bash
node --version
pnpm --version
pnpm install --frozen-lockfile
pnpm dev
```

访问 [本地开发站点](http://localhost:3000)。若尚未安装 pnpm，可在已有 Node.js 的环境中运行 `npm install -g pnpm@11.12.0`。

### 站点域名

`NEXT_PUBLIC_SITE_URL` 是构建时使用的公开站点地址，格式为完整 origin，例如 `https://example.com`，请替换为实际域名：

```bash
NEXT_PUBLIC_SITE_URL=https://example.com pnpm build
pnpm check:static
```

该值用于全局 `metadataBase`、Open Graph 图片绝对地址和指南详情的 canonical。未设置时不生成这些显式域名信息；它不会自动添加全站 canonical、站点地图或域名解析。换域名后需要重新构建并上传。

开发环境可参考 [.env.example](.env.example)。当前 `.gitignore` 未忽略 `.env.local`，如自行创建环境文件，请避免将其误加入提交；`NEXT_PUBLIC_*` 中只能放公开信息。

## 常用命令与验证

| 命令 | 用途 |
| --- | --- |
| `pnpm dev` | 启动开发服务 |
| `pnpm build` | 生产构建并导出 `out/` |
| `pnpm check:static` | 检查导出页面、必需资源与模板残留 |
| `pnpm lint` | ESLint 检查 |
| `pnpm typecheck` | TypeScript 类型检查 |
| `pnpm test` | Vitest 单元与组件测试 |
| `pnpm test:watch` | 测试监听模式 |
| `pnpm test:e2e` | Playwright 桌面、平板与手机视口测试 |
| `pnpm verify` | 依次执行 lint、类型检查、单元测试、构建、静态检查和端到端测试 |

首次运行端到端测试前安装 Chromium：

```bash
pnpm exec playwright install chromium
pnpm verify
```

Playwright 使用本地 `4273` 端口的 **Next.js 开发服务**；它不会验证 Nginx 配置、HTTPS 或线上静态文件服务。生产部署还需完成部署手册中的 HTTP 与浏览器验收。

## 目录与内容维护

```text
src/
  app/              页面路由、布局与全局样式
  components/       页面组件与可复用交互
  content/          站点、下载、指南、日志、定价及法律内容
  types/            内容与下载数据类型
  test/             测试初始化
public/assets/      图片、标识与本地字体
scripts/            静态导出检查与视觉比对脚本
tests/e2e/          Playwright 测试
design-qa/          视觉检查记录与截图
docs/               项目文档与部署手册
out/                构建生成的部署产物，不纳入版本控制
```

| 修改内容 | 主要入口 |
| --- | --- |
| 站点名称、导航、联系信息、备案展示 | [src/content/site.ts](src/content/site.ts) |
| 下载来源与安装包规则 | [src/content/downloads.ts](src/content/downloads.ts) |
| 指南与旧地址映射 | [src/content/blog.ts](src/content/blog.ts)、[src/content/guides/](src/content/guides/) |
| 版本记录 | [src/content/changelog.ts](src/content/changelog.ts) |
| 定价、FAQ、法律文案 | [src/content/pricing.ts](src/content/pricing.ts)、[src/content/faqs.ts](src/content/faqs.ts)、[src/content/legal.ts](src/content/legal.ts) |
| 全局元信息 | [src/app/layout.tsx](src/app/layout.tsx) |

新增页面或指南时，检查静态参数生成、站内链接及 [静态检查脚本](scripts/check-static-output.mjs) 的路由清单，并运行相关测试与构建。

`design-qa/` 与 `qa:capture`、`qa:compare` 保留了历史视觉比对工具。原始参考站点为模板页面，不能直接作为当前 Markune 产品内容的验收标准；使用前先核对脚本中的路由、目标地址和比对基线。

## 部署

标准流程为：**本地构建 `out/` → 压缩并校验 → SSH 上传 → 解压到版本目录 → 切换 `current` → Nginx 提供静态文件 → 配置 HTTPS 并验收**。

完整命令、目录权限、Nginx 配置、证书续期及回滚步骤见 [阿里云 Ubuntu 24.04 + Nginx 静态部署手册](docs/deployment-aliyun-nginx.md)。服务器已安装 Nginx 时，从手册的环境检查开始即可。

## 项目关联与许可

桌面端功能问题和安装包发布请前往 [Markune 主仓库](https://github.com/Refinex-Space/markune)；本站页面、内容与部署问题在本仓库维护。

本仓库采用 [MIT License](LICENSE)。第三方图片、字体及历史模板素材的许可请以对应来源的授权说明为准。
