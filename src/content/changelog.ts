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
];

export function formatReleaseDate(publishedAt: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(publishedAt));
}
