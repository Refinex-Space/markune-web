export interface ChangelogEntry {
  version: string;
  status: "改进" | "修复";
  publishedAt: string;
  title: string;
  summary: string;
  changes: { title: string; description: string }[];
  releaseHref: string;
  notice?: string;
}

export const releaseGuidance = {
  platforms: ["macOS Apple Silicon", "macOS Intel", "Windows x64"],
  upgrade: "安装前请保存当前工作。Markune 不会静默下载或强制安装更新。",
  releasesHref: "https://github.com/Refinex-Space/markune/releases",
};

export const changelogEntries: ChangelogEntry[] = [
  {
    "version": "0.3.0",
    "status": "改进",
    "title": "智能体连接本机程序，文档树可以排序和移动。",
    "summary": "智能体改为连接本机独立程序，文档树支持排序和移动，视图只保留文档与附件。",
    "changes": [
      {
        "title": "本地智能体",
        "description": "可安装 Claude、Codex、Cursor、GitHub Copilot、GLM、Grok、Kimi、MiniMax、OpenCode、Codebuddy、Qoder，或使用本机已有程序。在 Markune 中登录、对话、批准工具并查看历史。新会话从这里开始；原来的 Codex 会话仍留在 Codex 中。模型请求由各智能体自己发出。"
      },
      {
        "title": "文档树排序与移动",
        "description": "可按名称或时间排序，文件夹可单独设置；可移动文档和文件夹，并撤销这次移动。"
      },
      {
        "title": "视图只保留文档和附件",
        "description": "去掉任务和研究页签。"
      },
      {
        "title": "全宽页面不再挡住侧栏",
        "description": "全宽内容只覆盖主区域，侧栏保持可操作。"
      }
    ],
    "releaseHref": "https://github.com/Refinex-Space/markune/releases/tag/v0.3.0",
    "notice": "macOS 安装包使用 ad-hoc 签名，Windows 安装包暂未使用 Authenticode，首次安装时系统可能显示安全确认提示；自动更新包仍使用独立 minisign 签名校验。智能体以本机权限运行，可访问工作区并执行本地命令，请只安装信任的程序。",
    "publishedAt": "2026-10-07T12:00:00Z"
  },
  {
    "version": "0.2.9",
    "status": "改进",
    "title": "终端退出更明确，更新可走代理。",
    "summary": "改进终端退出提示与会话清理，检查更新可走系统代理，并升级编辑器、整理工作区界面。",
    "changes": [
      {
        "title": "终端退出状态更明确",
        "description": "进程退出后保留最后一屏并显示退出码，可直接新建标签。折叠面板不结束正在运行的命令；关闭最后一个标签不会立刻自动再建；切换工作区会结束旧终端。输出按完整字符显示，启动时不继承密钥型环境变量。"
      },
      {
        "title": "检查更新支持代理",
        "description": "更新检查和下载读取系统 HTTP(S) 代理，也支持进程中的 SOCKS 代理。切换系统代理后再次检查即可生效。"
      },
      {
        "title": "编辑器升级到 Markweave 0.10.8",
        "description": "改进本地 Markdown 链接解析。目录树按文件名显示并保留编号前缀；编辑器中的文档链接先打开预览。"
      },
      {
        "title": "界面滚动与设置更稳",
        "description": "页面根节点不再跟着引用浮层滚动。设置切换分类时内容回到顶部，可用 Escape 清空搜索。文档元信息面板和 Inbox 菜单的对齐与操作更整齐。"
      }
    ],
    "releaseHref": "https://github.com/Refinex-Space/markune/releases/tag/v0.2.9",
    "notice": "macOS 安装包使用 ad-hoc 签名，Windows 安装包暂未使用 Authenticode，首次安装时系统可能显示安全确认提示；自动更新包仍使用独立 minisign 签名校验。",
    "publishedAt": "2026-10-06T14:53:57Z"
  },
  {
    "version": "0.2.8",
    "status": "修复",
    "title": "搜索跳转保持 Live，AI 画图不再被浏览器自动化干扰。",
    "summary": "修复全局搜索打开文档时误切源码，并避免 AI 画图被捆绑浏览器自动化干扰。",
    "changes": [
      {
        "title": "全局搜索打开文档保持 Live",
        "description": "从搜索结果跳转文档时不再自动切换到源码模式，并滚动到匹配位置；命中 YAML 标题时定位到对应标题。同时去掉搜索框下的语法示例提示。"
      },
      {
        "title": "修复 AI 画图被浏览器自动化干扰",
        "description": "桌面端关闭 Codex 捆绑的 Chrome / Browser Use，避免图稿任务卡住；sidecar 缺少配套程序时给出明确提示。"
      }
    ],
    "releaseHref": "https://github.com/Refinex-Space/markune/releases/tag/v0.2.8",
    "notice": "macOS 安装包使用 ad-hoc 签名，Windows 安装包暂未使用 Authenticode，首次安装时系统可能显示安全确认提示；自动更新包仍使用独立 minisign 签名校验。",
    "publishedAt": "2026-09-15T09:48:14Z"
  },
  {
    "version": "0.2.7",
    "status": "改进",
    "title": "工作区入口更集中，可用系统打开 Markdown。",
    "summary": "改进工作区导航与界面，支持从系统打开 Markdown 文件，并修复视图页与编辑器拖拽条问题。",
    "changes": [
      {
        "title": "支持系统打开 Markdown",
        "description": "安装后可在「打开方式」中选择 Markune 打开 .md / .mdx，不会抢占默认应用。从文件打开会进入对应工作区并选中该文档；应用已在运行时转到同一窗口。"
      },
      {
        "title": "搜索与工作区切换并入侧栏",
        "description": "将搜索和工作区切换放到侧栏系统入口和底栏，减少顶部入口分散。"
      },
      {
        "title": "界面更贴齐窗口",
        "description": "分栏卡片改为贴齐窗口的连续外壳，Git 面板和日志入口标明 Beta。"
      },
      {
        "title": "修复视图页与编辑器拖拽",
        "description": "统一视图页下拉并对齐分组表格；文档编辑器不再盖住左侧宽度拖拽条。"
      }
    ],
    "releaseHref": "https://github.com/Refinex-Space/markune/releases/tag/v0.2.7",
    "notice": "macOS 安装包使用 ad-hoc 签名，Windows 安装包暂未使用 Authenticode，首次安装时系统可能显示安全确认提示；自动更新包仍使用独立 minisign 签名校验。",
    "publishedAt": "2026-09-13T06:53:43Z"
  },
  {
    "version": "0.2.6",
    "status": "改进",
    "title": "资源浏览更清晰，关联笔记更易辨认。",
    "summary": "改进文档资源浏览、图片预览与下载，重新整理关联面板的信息层级和交互。",
    "changes": [
      {
        "title": "资源列表更清晰",
        "description": "集中展示缩略图、文件名、格式、分辨率和大小，精简搜索区与行内操作，改善菜单换行、缩略图底色和窄侧栏排版。"
      },
      {
        "title": "图片预览与下载更方便",
        "description": "支持大图预览、方向键切换、原始尺寸与适应窗口，并可保存本地原图；关闭预览后恢复键盘焦点。"
      },
      {
        "title": "关联笔记更易辨认",
        "description": "入链、出链和未链接提及优先显示笔记标题，同名时补充文件夹；摘录转为纯文本，隐藏编码地址和完整路径，修复长文字溢出。"
      },
      {
        "title": "关联切换更稳定",
        "description": "精简关系页签和说明文字，移除造成布局抖动的刷新图标；支持键盘切换、查询失败重试，并避免重复查询和旧文档结果干扰。"
      }
    ],
    "releaseHref": "https://github.com/Refinex-Space/markune/releases/tag/v0.2.6",
    "notice": "macOS 安装包使用 ad-hoc 签名，Windows 安装包暂未使用 Authenticode，首次安装时系统可能显示安全确认提示；自动更新包仍使用独立 minisign 签名校验。",
    "publishedAt": "2026-09-11T06:04:11Z"
  },
  {
    "version": "0.2.5",
    "status": "改进",
    "publishedAt": "2026-09-09T16:04:21Z",
    "title": "文档同步与存储更灵活，Codex 问答和编辑更直接。",
    "summary": "改进工作区同步、附件存储和文档保真，完善图谱与知识整理，并简化 Codex 问答和编辑体验。",
    "changes": [
      {
        "title": "外部修改自动同步",
        "description": "改进工作区文件监听与刷新，支持刷新目录及其子目录；在文件树空白处可刷新或新建根目录文档、目录，外部修改与未保存草稿冲突时提供明确提示。"
      },
      {
        "title": "附件保存位置可配置",
        "description": "保留内置资产库作为默认位置，新增当前目录、assets、文档专属资源目录和指定路径；支持本地及网络图片处理规则、相对路径偏好与恢复默认值。"
      },
      {
        "title": "保留文档元数据与链接",
        "description": "改善 YAML 元数据兼容与保存保真，保留自定义字段、注释和原有格式；优化重命名、移动后的文档及附件引用更新。"
      },
      {
        "title": "图谱关系更准确",
        "description": "改进 Markdown、Wiki 链接、别名和锚点解析，减少代码等内容产生的错误关系，并支持外部变更后的图谱更新和未解析链接提示。"
      },
      {
        "title": "新增知识整理与研究入口",
        "description": "支持属性视图、任务视图、文档模板和更细致的搜索筛选，并提供文档关系、来源查看及 PDF 研究阅读入口。"
      },
      {
        "title": "Codex 问答与编辑更直接",
        "description": "统一输入框权限选择，移除独立文档预审流程；支持按请求问答或编辑，改善消息发送、历史任务恢复、工具执行反馈与回答渲染，修复工作区读取工具启动问题。"
      },
      {
        "title": "修复图片列表与表格的编辑问题",
        "description": "升级 Markweave 至 0.10.4，统一 Markdown 加载与更新逻辑，修复图片开头的列表及含图片表格在加载、保存和重开时的结构问题。"
      }
    ],
    "releaseHref": "https://github.com/Refinex-Space/markune/releases/tag/v0.2.5",
    "notice": "macOS 安装包使用 ad-hoc 签名，Windows 安装包暂未使用 Authenticode，首次安装时系统可能显示安全确认提示；自动更新包仍使用独立 minisign 签名校验。"
  },
  {
    version: "0.2.4",
    status: "修复",
    publishedAt: "2026-09-02T13:50:54Z",
    title: "大文档打开更可靠，加载过程更清晰。",
    summary: "修复大型 Markdown 文档在桌面端打开后显示空白的问题，并为加载过程和失败恢复提供更明确的反馈。",
    changes: [
      { title: "修复图片与正文混排时的加载问题", description: "解决块级图片与相邻正文触发严格文档校验失败、影响文档打开的问题。" },
      { title: "修复 macOS 大文档解析等待超时", description: "解决 WKWebView 中 Blob Worker 静默等待超时的问题，改善桌面端的大文档打开体验。" },
      { title: "显示大文档加载进度", description: "文档解析与分步渲染期间展示明确进度，避免长时间停留在没有反馈的空白界面。" },
      { title: "提供加载失败后的恢复入口", description: "加载失败时可以重新加载，或切换到源码模式恢复访问；文档正文仍保留在本地。" },
      { title: "升级编辑器内核", description: "Markweave 编辑器内核升级至 0.10.3。" },
    ],
    releaseHref: "https://github.com/Refinex-Space/markune/releases/tag/v0.2.4",
    notice: "此版本 macOS 安装包使用 ad-hoc 签名，Windows 安装包暂未使用 Authenticode，首次安装时系统可能显示安全确认提示。自动更新包仍使用独立的 minisign 签名校验。",
  },
  {
    version: "0.2.3",
    status: "改进",
    publishedAt: "2026-09-01T12:12:51Z",
    title: "功能改进与问题修复。",
    summary: "本版本包含功能改进、体验优化和问题修复。",
    changes: [],
    releaseHref: "https://github.com/Refinex-Space/markune/releases/tag/v0.2.3",
  },
  {
    version: "0.2.2",
    status: "改进",
    publishedAt: "2026-09-01T10:28:30Z",
    title: "应用更名为 Markune，并加入脑图。",
    summary: "桌面应用由 Madora 更名为 Markune，新增脑图，并改进工作区刷新、Git 同步和 Windows 路径显示。",
    changes: [
      { title: "更名为 Markune", description: "应用名称、安装包和迁移说明由 Madora 改为 Markune。" },
      { title: "新增脑图", description: "可以在工作区使用脑图；绘图界面跟随系统外观。编辑器升级到 Markweave 0.10.1。" },
      { title: "工作区刷新与 Git 同步", description: "目录树按变更增量刷新，右键刷新只作用于对应范围。Git 同步减少漂移，并统一调度。" },
      { title: "修复 Windows 与链接问题", description: "用户可见路径不再带 \\\\?\\ 前缀；脑图工具栏不再与全局按钮重叠。普通点击外链不会误开浏览器。分页加载历史会话时，AI 面板不再崩溃。" },
    ],
    releaseHref: "https://github.com/Refinex-Space/markune/releases/tag/v0.2.2",
  },
  {
    version: "0.2.1",
    status: "改进",
    publishedAt: "2026-08-10T10:49:48Z",
    title: "Codex 可使用自定义接口，macOS 菜单可检查更新。",
    summary: "Codex 支持自定义 Responses API，发送和恢复最近会话更稳，macOS 可从系统菜单打开设置并检查更新。",
    changes: [
      { title: "自定义 Responses API", description: "可在设置中配置自定义 Responses API 提供方。" },
      { title: "发送与恢复更稳", description: "加固 Codex 发送流程，并可恢复最近一次会话。" },
      { title: "macOS 系统菜单", description: "可从原生菜单打开设置和检查更新。" },
      { title: "Windows 侧栏焦点", description: "去掉置顶项和文件夹上多余的焦点环。" },
    ],
    releaseHref: "https://github.com/Refinex-Space/markune/releases/tag/v0.2.1",
  },
  {
    version: "0.2.0",
    status: "改进",
    publishedAt: "2026-08-09T09:34:20Z",
    title: "目录总览、每日笔记和窗口外观。",
    summary: "新增文件夹总览与目录网格，完善每日笔记和文档树，并支持窗口透明度与字数统计。",
    changes: [
      { title: "文件夹总览与目录网格", description: "工作区文件夹提供总览，目录页改为网格浏览，并可固定总览。" },
      { title: "每日笔记", description: "每日笔记支持快速编辑；日历可展开，并可设置一周从哪一天开始。" },
      { title: "文档树", description: "文件夹标题可快速新建，支持根级折叠，并可自定义树图标和外观。" },
      { title: "窗口与文档信息", description: "桌面端可调节窗口透明度并记住设置。文档显示字数，并可控制 Git 入口是否显示。" },
    ],
    releaseHref: "https://github.com/Refinex-Space/markune/releases/tag/v0.2.0",
  },
];

export function formatReleaseDate(publishedAt: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(publishedAt));
}
