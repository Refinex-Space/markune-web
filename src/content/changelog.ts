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
