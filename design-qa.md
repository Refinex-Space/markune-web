# Markune Web Design QA

## 验收范围

- 视觉真相：`https://kodamatemplate.framer.website/`
- 内容与资源真相：`/Users/refinex/develop/project/madora-web-html`（保持只读）
- 实现：`http://127.0.0.1:4273/`
- 浏览器与像素密度：Playwright Chromium，`deviceScaleFactor: 1`
- CSS 视口：`1440×1000`、`1024×900`、`390×844`
- 路由：首页、About、Blog 列表、6 篇文章、Changelog、Contact、Download、Privacy Policy、Terms of Service，共 14 个路由。
- 对比方式：相同视口分段截图后拼接；Pixelmatch `threshold: 0.1`，不屏蔽正文、图片、组件或 Framer 徽标。
- 动态处理：源站等待滚动浮现状态稳定后分段采集；实现通过视觉回归标记冻结动画、Ticker、过渡和光标。

## 证据

- [逐路由 Pixelmatch 报告](/Users/refinex/develop/project/madora-web/design-qa/pixelmatch-report.md)
- [源站与实现截图](/Users/refinex/develop/project/madora-web/design-qa/routes)
- [逐像素差异图](/Users/refinex/develop/project/madora-web/design-qa/diffs)
- [移动端分段并排对比](/Users/refinex/develop/project/madora-web/design-qa/focused)

当前报告中的 39 组图像尺寸可直接比较，但它们来自本轮逐步收敛过程，不是最后一次代码变更后的统一全量重采样。因此报告可用于定位差异，不能作为最终验收快照。

本轮最新重点样本：

| 页面 | 像素尺寸 | 差异率 |
| --- | ---: | ---: |
| About 移动端 | `390×8903` | `4.8252%` |
| What we shipped in Q1 移动端 | `390×5194` | `5.5244%` |
| 其余五篇文章移动端 | 等尺寸源站/实现拼图 | `6.5533%–7.3442%` |

全量混合快照平均差异率为 `8.7128%`，最大差异率为 `18.0515%`。这些结果均明显高于 `0.1%` 门槛。

## 首页 Hero 局部复验（2026-07-27）

- 源视觉真相：`/var/folders/0w/8y5fmh897_gc458bn5q2s7240000gp/T/codex-clipboard-106767e8-a052-4073-885e-2d592cec1750.png`，`3178×2416`，用户标注的目标是保留苔藓背景、只替换居中的软件截图。
- 实现截图：`/Users/refinex/develop/project/madora-web/design-qa/focused/home-hero-madora-current.png`，`1425×802`；实现地址 `http://localhost:4273/?brand=postbuild`。
- 同一输入对比：`/Users/refinex/develop/project/madora-web/design-qa/focused/home-hero-madora-comparison.png`，同时包含源图和最新浏览器渲染图。
- CSS 视口与密度：桌面 `1440×1000`、移动 `390×844`，`deviceScaleFactor: 1`；浏览器可视宽度因滚动条分别为 `1425`、`375`。
- 状态：页面加载并等待 `1400ms`，确保 Hero 入场动画完成；未进入 hover 状态。
- 桌面几何：背景框 `1200×711`；Markune 前景图 `1032×542.445`，边界 `196.5–1228.5 / 610.668–1153.113`，完整位于背景框 `112.5–1312.5 / 526.391–1237.391` 内。
- 移动几何：背景框 `343×203.227`；Markune 前景图 `294.977×155.719`，完整位于背景框内。
- 图片质量：背景继续使用原始 `2464×1856` 苔藓资源并以 `cover` 填充；Markune 截图保持原始 `5100×2676` 资源并以 `contain` 显示，无左右裁切、无非等比拉伸。
- 字体、颜色、文案：本轮未更改；与本次 Hero 图层修复无新增漂移。
- 控制台：仅有 React DevTools 与 HMR 信息，无 error/warn。

局部对比历史：

1. 修复前：Markune 截图直接替换整张 Hero 合成图，原苔藓背景丢失，软件截图在页面中承担了错误的全幅背景角色（P1）。
2. 修复：将 Hero 改为真实双图层，恢复苔藓背景，把 Markune 截图作为居中的独立前景层，并删除前景上的裁切规则。
3. 修复后：桌面和移动端边界测量均确认前景图完整包含在背景框内；本次局部范围无剩余 P0/P1/P2 问题，局部结果为 `passed`。全站结果仍受下述既有差异影响，保持 `blocked`。

## 对比历史

1. 初始全量对比：平均差异率 `10.6984%`，最大 `19.6423%`；About 与文章移动端存在明显结构、排版和 CTA 偏差。
2. 修复后：重做 About 指标/价值观/团队卡片结构，校正文章正文排版与移动端相关推荐几何，加入首页按钮图标换位交互和滚动浮现行为。
3. 复测结果：About 移动端降至 `4.8252%`，Q1 文章移动端降至 `5.5244%`；仍存在可见 P1/P2 差异，未达到通过条件。

## Download 新增页面 QA（2026-07-29）

- 该页面为 Markune 新增产品页面，Kodama 源站没有 `/download/`，因此不做虚假的源站 Pixelmatch；验收采用同站设计语言、固定视口截图、交互测试和真实 GitHub Releases 数据检查。
- [桌面 `1440×1000`](/Users/refinex/develop/project/madora-web/design-qa/focused/download-desktop.png)、[平板 `1024×900`](/Users/refinex/develop/project/madora-web/design-qa/focused/download-tablet.png)、[移动端 `390×844`](/Users/refinex/develop/project/madora-web/design-qa/focused/download-mobile.png) 均已在 Chromium、`deviceScaleFactor: 1` 下实际采集。
- 三个视口均无横向溢出或内容横向裁切；苔藓背景、白色下载面板、圆角、阴影、渐进模糊与既有站点设计一致。移动端改为单列面板，系统和架构切换保持完整可操作。
- 实际页面读取 OSS `downloads/stable.json`，确认版本 `0.1.15`、发布时间、三个安装包文件名/大小/SHA-256 与下载链接均来自实时清单。清单和三个版本化安装包均为 `HTTP 200`，提供 `Access-Control-Allow-Origin: *` 与 GET/HEAD。
- E2E 通过固定清单覆盖 Windows 自动推荐、macOS/Windows 切换、Apple Silicon/Intel 切换、键盘操作、复制反馈、错误与重试；路由检查未发现 console、page 或资源错误。
- 新增页面范围无剩余 P0–P3 视觉问题，单页结果为 `passed`。该结果不改变原有 13 页面与 Kodama 比对仍为 `blocked` 的结论。

### Logo 与下载按钮局部修正（2026-07-29）

- 源视觉标注：`/var/folders/0w/8y5fmh897_gc458bn5q2s7240000gp/T/codex-clipboard-8ba62ffe-f662-4993-b049-374f9e3b1c5f.png`，`1824×1368`；目标是移除面板 Logo 卡片阴影，并为 `Download for …` 增加明确 hover 状态。
- 实现改动：Logo 卡片保留原尺寸、边框、圆角和白色背景，仅删除 `box-shadow`；主下载按钮 hover 切换为站点苔绿色背景与深色文字，下载图标下移 `2px`，active 状态增加轻微亮度反馈，focus-visible 继续复用全站描边。
- 交互证据：Playwright 在 Chromium 桌面、平板和移动项目中实际执行 hover，均确认背景为 `rgb(203, 255, 151)`、文字为 `rgb(6, 8, 3)`，3 项通过。
- 浏览器渲染截图：本次尝试在 Codex 内置浏览器以相同视口采集时，本地 URL 被浏览器安全策略阻止；现有三张下载页截图早于该局部修改，不能冒充修改后证据。因此本次局部视觉复验为 `blocked`，阻塞项仅为缺少修改后的浏览器截图，不是已发现的 P0–P3 缺陷。

## 工程验证

- `pnpm lint`：通过。
- `pnpm typecheck`：通过。
- `pnpm test`：通过，7 个测试文件、18 个测试。
- `pnpm build`：通过，Next.js 完成 17 个静态页面生成步骤，路由表确认 14 个计划路由均为静态输出。
- `pnpm check:static`：通过，14 个路由与 56 个必需资源完整。
- `pnpm test:e2e`：通过，52 项通过；2 项为平板/移动端重复错误态的预期跳过，错误态在 Chromium 完整执行。

## Findings

- [P1] Pixelmatch 门槛未通过
  - Location：全部路由，重点为 About 与六篇文章移动端。
  - Evidence：最新重点样本仍为 `4.8252%–7.3442%`，目标为 `≤0.1%`。
  - Impact：正文换行、卡片节奏、图片/标识与 CTA 的差异仍可见，不能宣称一比一。
  - Fix：在同一最终构建上重新全量采集，再按分段差异继续修正字体渲染、纵向节奏和共享 CTA。

- [P2] 共享 CTA 与特殊图形仍有漂移
  - Location：About、文章页底部 CTA，以及客户 Logo/模板特殊图形。
  - Evidence：分段差异图的高差异区域主要集中在 CTA 背景/模糊层、特殊标识和微排版。
  - Impact：多个页面复用该区块，单处偏差会放大到全量结果。
  - Fix：以源资源与源 DOM 几何继续校正，不以手绘图形替代。

- [P2] Framer 徽标要求与零遮罩门槛冲突
  - Location：源站页面浮层。
  - Evidence：源站截图保留 Framer 徽标，而实现按产品计划移除；当前规则又不允许屏蔽该区域。
  - Impact：即使正文完全一致，移动端仍无法在计入徽标像素时达到 `0.1%`。
  - Fix：后续验收必须明确允许仅排除第三方 Framer 徽标，或接受该项为预期差异；本轮不自行更改标准。

## 结论

工程构建、类型、Lint、单元测试和静态导出检查通过；首页按钮交互与滚动浮现已实现。视觉证据仍有 P1/P2 差异，且最终统一截图与 E2E 未在最后代码状态重跑，因此不能真实写为 `passed`。

final result: blocked
