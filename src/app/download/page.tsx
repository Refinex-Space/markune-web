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
  title: "Download",
  description: "Download the latest stable version of Madora for macOS or Windows.",
};

const assurances = [
  { icon: FolderSimpleLock, title: "Local by default", text: "Your Markdown workspace stays on your computer and remains under your control." },
  { icon: ShieldCheck, title: "Verified releases", text: "Every installer includes a published SHA-256 checksum from the stable release channel." },
  { icon: ArrowsClockwise, title: "Updates on your terms", text: "Madora checks for signed updates without silently forcing an installation." },
];

export default function DownloadPage() {
  return (
    <div className="download-page">
      <section className="container download-hero page-load-reveal">
        <p className="eyebrow">DOWNLOAD MADORA</p>
        <h1>Your workspace.<br />On your desktop.</h1>
        <p>Write, organize, plan, and work with Codex from one local-first Markdown workspace.</p>
      </section>

      <section className="container download-stage page-load-reveal">
        <Image alt="" aria-hidden className="download-stage-background" fill priority sizes="(max-width: 809px) calc(100vw - 32px), (max-width: 1199px) calc(100vw - 48px), 1200px" src={assets.pricingBackground} />
        <DownloadSelector />
      </section>

      <section className="container download-assurances scroll-reveal" aria-label="Why download Madora">
        {assurances.map((item) => {
          const Icon = item.icon;
          return <article key={item.title}><span><Icon aria-hidden size={22} /></span><h2>{item.title}</h2><p>{item.text}</p></article>;
        })}
      </section>

      <section className="download-install-section">
        <div className="container download-install-heading scroll-reveal">
          <p className="eyebrow">GET STARTED</p>
          <h2>Install in a few minutes.</h2>
          <p>Choose your platform, download the latest stable installer, and keep your workspace wherever you want it.</p>
        </div>
        <div className="container download-install-grid scroll-reveal">
          <article>
            <span className="download-install-icon"><AppleLogo aria-hidden size={24} weight="fill" /></span>
            <div><p className="eyebrow">macOS</p><h3>Open the DMG and move Madora to Applications.</h3><p>Choose Apple Silicon for M1 or later Macs. Intel builds remain available for earlier hardware.</p></div>
          </article>
          <article>
            <span className="download-install-icon"><WindowsLogo aria-hidden size={24} weight="fill" /></span>
            <div><p className="eyebrow">WINDOWS</p><h3>Run the setup file and follow the installer.</h3><p>The current Windows release supports x64 systems and installs with the standard Madora updater.</p></div>
          </article>
        </div>
      </section>
    </div>
  );
}
