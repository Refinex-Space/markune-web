import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { assets, siteConfig } from "@/content/site";

export function CallToAction() {
  return (
    <section className="cta-section">
      <div className="container cta-card scroll-reveal">
        <div className="cta-copy">
          <h2>让工作回到你的文件里。</h2>
          <p>写作、日程、图谱、画板与 Codex 协作，都围绕本地 Markdown 自然连接。</p>
          <ButtonLink href={siteConfig.downloadHref}>下载 <ArrowRight aria-hidden size={15} /></ButtonLink>
        </div>
        <Image
          alt="Madora 本地 Markdown 工作区预览"
          className="cta-workspace-preview"
          height={2694}
          src={assets.hero}
          width={5100}
        />
        <div aria-hidden className="cta-background"><Image alt="" fill sizes="(max-width: 809px) 358px, 1200px" src={assets.pricingBackground} /></div>
      </div>
    </section>
  );
}
