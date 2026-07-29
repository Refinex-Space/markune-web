import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { assets, siteConfig } from "@/content/site";

export function CallToAction() {
  return (
    <section className="cta-section">
      <div className="container cta-card scroll-reveal">
        <div className="cta-copy">
          <h2>准备好让团队步调一致了吗？</h2>
          <p>与 4,000 多个团队一起使用 Madora，更快地协同交付工作。</p>
          <ButtonLink href={siteConfig.downloadHref}>下载 <ArrowRight aria-hidden size={15} /></ButtonLink>
        </div>
        <picture>
          <source media="(max-width: 809px)" srcSet={assets.ctaDashboardMobile} />
          <Image alt="Madora 任务看板" className="cta-dashboard" height={391} src={assets.ctaDashboard} width={660} />
        </picture>
        <div aria-hidden className="cta-background"><Image alt="" fill sizes="(max-width: 809px) 358px, 1200px" src={assets.pricingBackground} /></div>
      </div>
    </section>
  );
}
