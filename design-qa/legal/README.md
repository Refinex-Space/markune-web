# 法律页面与页脚验证

日期：2026-09-05。

## 内容依据

- [Markune README](https://github.com/Refinex-Space/markune)：本地 Markdown、工作区数据、Git 与 Codex 集成。
- [Markune LICENSE](https://github.com/Refinex-Space/markune/blob/main/LICENSE) 与 [Apache-2.0 全文](https://www.apache.org/licenses/LICENSE-2.0)：使用、修改、分发条件、商标与责任边界。
- [Markune SECURITY](https://github.com/Refinex-Space/markune/blob/main/SECURITY.md)：安全问题报告渠道。
- 本地 Markune 的 `docs/architecture/overview.md`、`components/workspace/use-app-update.ts`、`src-tauri/src/git.rs`：本地持久化、远程图片、AI 权限、自动版本检查与 Git 推送行为。仅作只读核对，未修改桌面应用。
- 当前网站的下载请求、页面源码与依赖：未主动接入广告或分析脚本，下载页请求 GitHub 发布信息。
- [个人信息保护法](https://www.stats.gov.cn/gk/tjfg/xgfxfg/202503/t20250310_1958923.html)、[GitHub 隐私声明](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)、[OpenAI 隐私政策](https://openai.com/policies/privacy-policy/)：告知、选择、保存和第三方处理边界。

“本地数据不自动上传”限定于普通本地工作流，不扩大为完全不联网、绝对安全或第三方零日志的承诺。官网线上托管服务、访问日志配置、第三方账户设置未核验；也未对桌面应用进行全量网络抓包或法律合规审计。

## 页脚与交互

- 移除“优势”，全站导航与 About 页标签统一为“关于我”。
- “功能”指向现有核心能力锚点 `/#benefits`；价格和 FAQ 分别指向 `/#pricing`、`/#faq`。
- 三个区域入口采用原生链接，修复浏览器中连续点击时客户端路由生成 `#benefits#pricing` 的问题。
- 下载、更新日志、博客、About、隐私政策与服务条款分别连接既有路由；联系开发者使用 `mailto:refinexcn@gmail.com`。
- 法律页面采用桌面侧边目录、手机原生折叠目录、顶部摘要、编号章节、更新时间、相关政策链接与返回顶部。移除法律正文后的下载推广区，仅在这两页关闭底部模糊层。

## 已执行验证

- Lint、TypeScript 检查通过。
- 12 个测试文件、26 项 Vitest 测试通过，含页脚入口回归检查。
- 生产构建及静态导出检查通过：14 条路由、61 个资源。
- 内置浏览器实际点击九个站内页脚入口，读取确认相应页面标题和 URL；邮箱仅核对目标，未发送邮件。
- 连续点击“功能 → 定价 → 常见问题 → 功能”，三个锚点地址及目标内容正确。
- 法律页面桌面与手机截图检查；手机目录展开、章节跳转已验证，无横向溢出，目录目标均存在。

未执行仓库完整 Playwright E2E 套件，未部署或提交 Git commit。
