import type { Metadata } from "next";
import Image from "next/image";
import {
  AppleLogo,
  ArrowsClockwise,
  FolderSimpleLock,
  ShieldCheck,
  WindowsLogo,
} from "@phosphor-icons/react/dist/ssr";
import { DownloadSelector } from "@/components/download/DownloadSelector";
import { assets } from "@/content/site";

export const metadata: Metadata = {
  title: "下载",
  description: "下载适用于 macOS 或 Windows 的最新 Markune 稳定版本。",
};

const assurances = [
  { icon: FolderSimpleLock, title: "默认保存在本地", text: "Markdown 工作区保留在你的电脑中，始终由你掌控。" },
  { icon: ShieldCheck, title: "经过验证的版本", text: "安装包通过 GitHub Releases 发布；若提供 SHA-256，可在下载页核对。" },
  { icon: ArrowsClockwise, title: "自主决定更新", text: "Markune 会检查签名更新，但不会在后台强制安装。" },
];

export default function DownloadPage() {
  return (
    <div className="download-page">
      <section className="container download-hero page-load-reveal">
        <p className="eyebrow">下载 Markune</p>
        <h1>你的工作区，<br />就在桌面上。</h1>
        <p>在一个 Local-first Markdown 工作区中完成写作、整理、规划，并与 Codex 协同工作。</p>
      </section>

      <section className="container download-stage page-load-reveal">
        <Image alt="" aria-hidden className="download-stage-background" fill priority sizes="(max-width: 809px) calc(100vw - 32px), (max-width: 1199px) calc(100vw - 48px), 1200px" src={assets.pricingBackground} />
        <DownloadSelector />
      </section>

      <section className="container download-assurances scroll-reveal" aria-label="为什么下载 Markune">
        {assurances.map((item) => {
          const Icon = item.icon;
          return <article key={item.title}><span><Icon aria-hidden size={22} /></span><h2>{item.title}</h2><p>{item.text}</p></article>;
        })}
      </section>

      <section className="download-install-section">
        <div className="container download-install-heading scroll-reveal">
          <p className="eyebrow">开始使用</p>
          <h2>几分钟内完成安装。</h2>
          <p>选择你的平台，下载最新稳定版安装包，并将工作区保存在你希望的位置。</p>
        </div>
        <div className="container download-install-grid scroll-reveal">
          <article>
            <span className="download-install-icon"><AppleLogo aria-hidden size={24} weight="fill" /></span>
            <div><p className="eyebrow">macOS</p><h3>打开 DMG，将 Markune 移动到 Applications。</h3><p>M1 或更新机型请选择 Apple Silicon；较早的设备仍可使用 Intel 版本。</p></div>
          </article>
          <article>
            <span className="download-install-icon"><WindowsLogo aria-hidden size={24} weight="fill" /></span>
            <div><p className="eyebrow">Windows</p><h3>运行安装程序并按照指引完成安装。</h3><p>当前 Windows 版本支持 x64 系统，并随附标准 Markune 更新程序。</p></div>
          </article>
        </div>
      </section>
    </div>
  );
}
