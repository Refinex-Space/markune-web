export interface ChangelogEntry {
  version: string;
  status: "新增" | "改进" | "修复";
  tone: "new" | "improved" | "fix";
  date: string;
  title: string;
  image: string;
  tabletImage: string;
  mobileImage: string;
  paragraphs: string[];
}

const workspaceHero = {
  image: "/assets/feature-local-workspace.png",
  tabletImage: "/assets/feature-local-workspace.png",
  mobileImage: "/assets/feature-local-workspace.png",
} as const;

const inboxDaily = {
  image: "/assets/feature-inbox-daily-flow.png",
  tabletImage: "/assets/feature-inbox-daily-flow.png",
  mobileImage: "/assets/feature-inbox-daily-flow.png",
} as const;

const gitSync = {
  image: "/assets/capability-git-sync-panel.png",
  tabletImage: "/assets/capability-git-sync-panel.png",
  mobileImage: "/assets/capability-git-sync-panel.png",
} as const;

const integrations = {
  image: "/assets/capability-integrations.webp",
  tabletImage: "/assets/capability-integrations.webp",
  mobileImage: "/assets/capability-integrations.webp",
} as const;

const figma = {
  image: "/assets/changelog-figma.webp",
  tabletImage: "/assets/changelog-figma-tablet.avif",
  mobileImage: "/assets/changelog-figma-mobile.avif",
} as const;

const notifications = {
  image: "/assets/changelog-notifications.webp",
  tabletImage: "/assets/changelog-notifications-tablet.avif",
  mobileImage: "/assets/changelog-notifications-mobile.avif",
} as const;

const blogQ1 = {
  image: "/assets/blog-q1.webp",
  tabletImage: "/assets/blog-q1-tablet.avif",
  mobileImage: "/assets/blog-q1-card.avif",
} as const;

const blogContext = {
  image: "/assets/blog-context-switching.webp",
  tabletImage: "/assets/blog-context-switching-tablet.avif",
  mobileImage: "/assets/blog-context-switching-card.avif",
} as const;

const blogAutomation = {
  image: "/assets/blog-automation.webp",
  tabletImage: "/assets/blog-automation-tablet.avif",
  mobileImage: "/assets/blog-automation-card.avif",
} as const;

export const changelogEntries: ChangelogEntry[] = [
  {
    version: "0.2.1",
    status: "改进",
    tone: "improved",
    date: "2026年8月10日",
    title: "v0.2.1：自定义 Codex 端点与 macOS 原生菜单",
    ...integrations,
    paragraphs: [
      "新增自定义 Responses API 兼容端点配置，可在设置中接入自有模型服务，API Key 只保存在系统钥匙串，不会写入前端状态或日志。",
      "macOS 菜单栏新增“设置…”与“检查更新…”，分别复用现有设置页与版本检查流程，不再额外弹出第二个设置窗口。",
      "加固 Codex 发送流程，修复线程恢复与会话续聊问题；同时移除 Windows 侧栏在固定目录与文件夹上的多余焦点环。",
    ],
  },
  {
    version: "0.2.0",
    status: "新增",
    tone: "new",
    date: "2026年8月9日",
    title: "v0.2.0：工作区外观与目录体验升级",
    ...workspaceHero,
    paragraphs: [
      "工作区树支持自定义图标与外观设置，目录页重做为更清晰的网格视图，并新增文件夹总览、Pinned 总览与根级折叠。",
      "Daily 日历支持展开状态与周起始日设置，Inbox 侧栏与文档树间距、预览样式一并优化；Markdown 文档新增字数统计。",
      "桌面端新增窗口透明度调节并持久化保存；Git 入口可见性可在设置中调整，系统导航布局也修复了切换时的位移与遮挡问题。",
    ],
  },
  {
    version: "0.1.19",
    status: "修复",
    tone: "fix",
    date: "2026年8月7日",
    title: "v0.1.19：打开工作区更稳健",
    ...notifications,
    paragraphs: [
      "修复打开工作区时遇到失效路径或损坏条目可能导致异常的问题。现在会跳过无效节点并给出更安全的恢复行为，避免阻塞整个工作区加载。",
    ],
  },
  {
    version: "0.1.18",
    status: "新增",
    tone: "new",
    date: "2026年8月7日",
    title: "v0.1.18：Daily 导出与 Markweave 0.5.2",
    ...blogQ1,
    paragraphs: [
      "Daily 笔记与标签栏文档支持导出，便于把当天记录或当前文档分享到工作区之外。",
      "编辑器升级到 Markweave 0.5.2，支持附件上传；系统导航布局也改为可折叠，窄屏下更易腾出编辑空间。",
    ],
  },
  {
    version: "0.1.17",
    status: "改进",
    tone: "improved",
    date: "2026年8月4日",
    title: "v0.1.17：Markweave 0.4.3 编辑器升级",
    ...blogAutomation,
    paragraphs: [
      "同步升级 Markweave 与 @markweave/react 至 0.4.3，带来编辑器稳定性与 Markdown 渲染改进。建议所有用户更新以获得更一致的编辑体验。",
    ],
  },
  {
    version: "0.1.16",
    status: "新增",
    tone: "new",
    date: "2026年8月1日",
    title: "v0.1.16：Daily、图谱与 AI 编辑",
    ...blogContext,
    paragraphs: [
      "新增 Daily Notes 页面与日历集成，侧边栏可直接进入笔记入口；同时上线工作区图谱可视化，支持 D3 关系浏览与管理。",
      "Markdown 编辑器接入 AI 编辑能力，并支持源码模式切换；图稿侧栏可定位到所属相册，目录树也会显示文件夹文档数量。",
      "macOS 标题栏与侧边栏按钮样式继续打磨，Pinned 菜单移入侧边栏；节点路径支持复制相对或绝对路径。",
    ],
  },
  {
    version: "0.1.15",
    status: "修复",
    tone: "fix",
    date: "2026年7月28日",
    title: "v0.1.15：macOS 标题栏对齐修复",
    ...figma,
    paragraphs: [
      "修复切换文档标题后 macOS 窗口红绿灯位置不重置的问题。标题栏现在会根据当前文档状态正确对齐原生窗口控件。",
    ],
  },
  {
    version: "0.1.14",
    status: "改进",
    tone: "improved",
    date: "2026年7月26日",
    title: "v0.1.14：Git 面板与对话框视觉优化",
    ...gitSync,
    paragraphs: [
      "修复 Git 面板在 macOS 上的样式渲染问题，并优化对话框内容的透明背景与模糊效果。",
      "编辑器依赖升级至 Markweave 0.3.1；同步完善发布说明规范，确保对外文案不包含私有信息。",
    ],
  },
  {
    version: "0.1.13",
    status: "改进",
    tone: "improved",
    date: "2026年7月24日",
    title: "v0.1.13：AI 面板稳定性提升",
    ...integrations,
    paragraphs: [
      "增强 AI 面板消息发送与错误处理逻辑，修复右侧面板样式导致的渲染异常。",
      "同步调整 Tauri 更新器配置结构，为后续正式启用应用内更新做好准备。",
    ],
  },
  {
    version: "0.1.12",
    status: "改进",
    tone: "improved",
    date: "2026年7月24日",
    title: "v0.1.12：发布资产校验",
    ...notifications,
    paragraphs: [
      "新增发布资产验证脚本，在正式发布前自动检查 GitHub Release 是否包含完整的安装包、签名与 latest.json，降低发布遗漏风险。",
    ],
  },
  {
    version: "0.1.11",
    status: "改进",
    tone: "improved",
    date: "2026年7月24日",
    title: "v0.1.11：发布预检优化",
    ...figma,
    paragraphs: [
      "优化发布预检流程：移除不必要的 Rust 冷构建、限制预检资源占用，并为 Tauri sidecar 准备步骤，缩短 CI 反馈时间。",
    ],
  },
  {
    version: "0.1.10",
    status: "改进",
    tone: "improved",
    date: "2026年7月24日",
    title: "v0.1.10：发布工作流增强",
    ...blogQ1,
    paragraphs: [
      "发布工作流新增 dev 分支预检与版本一致性校验，Tag 创建前会先验证源码、依赖与发布配置是否满足门禁要求。",
    ],
  },
  {
    version: "0.1.9",
    status: "改进",
    tone: "improved",
    date: "2026年7月24日",
    title: "v0.1.9：发布运行时升级",
    ...blogAutomation,
    paragraphs: [
      "升级 GitHub Actions 发布运行时，并同步调整 0.1.8 的构建准备步骤，为后续多平台打包奠定基础。",
    ],
  },
  {
    version: "0.1.8",
    status: "改进",
    tone: "improved",
    date: "2026年7月24日",
    title: "v0.1.8：发布文档更新",
    ...blogContext,
    paragraphs: [
      "更新发布手册中的公钥说明与日期信息，确保维护者按最新流程配置桌面版自动更新的签名与 endpoint。",
    ],
  },
  {
    version: "0.1.7",
    status: "新增",
    tone: "new",
    date: "2026年7月24日",
    title: "v0.1.7：Markune 首个桌面公开版",
    ...inboxDaily,
    paragraphs: [
      "首个面向用户的桌面公开版：以本地 Markdown 为核心，提供文档树、标签页、全局搜索、Daily 日历、Inbox 收集与本地资产存储。",
      "内置 Git 面板、终端与 Git Sync 设置，支持提交、差异查看、日志浏览与文件级回滚；同时提供 Markdown / Word / PDF 导出与文档导入。",
      "接入 Codex App Server，支持 AI 对话、上下文附件、Skill、图稿协作与文件修改预览；白板/脑图模块可与管理 Markdown 文档并存。",
      "新增应用内更新检查、下载与安装能力（minisign 验签），支持 macOS Apple Silicon、macOS Intel 与 Windows x64。",
    ],
  },
];
