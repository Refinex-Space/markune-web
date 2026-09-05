# About 页面设计与验证

核对日期：2026-09-05。

## 页面目标

让访问者知道 Markune 背后的开发者是谁，理解三个项目各自的用途，并能直接体验产品、查看源码或联系开发者。

## 内容依据

- 用户提供：Refinex（沉默的老李）、Java 研发工程师、个人开发者、邮箱及手绘头像；Markweave 是 Markune 的底层编辑器。
- [Markune](https://github.com/Refinex-Space/markune)：本地优先、Markdown-first 桌面工作区，包含写作、日程、图谱、画板与 AI 协作。
- [Markweave](https://github.com/Refinex-Space/markweave)：MIT 许可的 Markdown-first 所见即所得编辑器，提供 React、Vue 2、Vue 3 适配。
- [AgentArk README](https://github.com/Refinex-Space/agentark/blob/main/README.md)：基于 AgentScope Java 的 Agent 应用平台，涉及构建、版本、运行与治理；当前为开发基线，因此页面标注「开发中」，不宣称已获得生产验证。

未使用模板中的虚构团队、客户、评价、使用人数与公司故事，也未添加未经提供的个人履历、工作年限或客户承诺。开发理念属于基于项目方向编写的个人介绍文案。

## 编排与视觉

1. 自我介绍：姓名与身份优先，手绘头像为视觉中心。
2. 页内目录：从想法开始、正在构建、保持联系。
3. 背景介绍：从 Java 研发到完整产品的关注点。
4. 项目：Markune 为主卡，复用本站已有工作区截图；Markweave、AgentArk 为并列次级卡，清楚说明项目关系。
5. 开发理念：深绿色背景形成阅读节奏，说明本地文件、能力复用与使用体验。
6. 联系：邮箱、复制反馈、GitHub，以及简短署名。

沿用站点的字体、容器、黑白与绿色体系，通过非对称首屏、轻微倾斜的头像卡和细分隔线形成个人作品集感。头像原样复制并重命名为 `public/assets/about/refinex-avatar.png`，SHA-256 与源图一致；没有引入额外自然摄影素材。

页面样式使用 CSS Module 隔离。只在 About 页面关闭原有底部固定模糊层，避免遮挡阅读；保留全站的减少动态效果偏好支持。公共导航改为「关于我」，公共页脚校正产品定位和真实联系方式，这些文案会在其他页面同步生效。

## 验证

- `pnpm lint`：通过。
- `pnpm typecheck`：通过；生产构建中的 TypeScript 检查也通过。
- `pnpm test`：11 个测试文件、25 项测试通过，含邮箱复制成功、失败提示与重试。
- `pnpm build`：通过，About 成功静态导出。
- `pnpm check:static`：14 条路由、61 个资源检查通过，新增头像列入检查。
- `git diff --check`：通过。
- Codex 内置浏览器人工检查：桌面默认视口、1024×900、390×844、320×740；About 正文无横向溢出，头像与产品图加载成功。
- 实际操作：项目与联系锚点、邮箱复制及成功反馈、手机导航展开和 Escape 关闭。
- 仓库链接与 mailto 目标已核对；没有发送邮件或执行外部写入。

本次未运行仓库完整 Playwright E2E 套件；页面交互与响应式检查通过内置浏览器完成。没有部署或提交 Git commit。
