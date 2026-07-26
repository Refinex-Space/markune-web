import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { assets } from "@/content/site";

export function CallToAction() {
  return (
    <section className="cta-section">
      <div className="container cta-card scroll-reveal">
        <div className="cta-copy">
          <h2>Ready to get your team on the same page?</h2>
          <p>Join 4,000+ teams already using Flowline to ship work faster, together.</p>
          <ButtonLink href="/contact/">Start Free Trial <ArrowRight aria-hidden size={15} /></ButtonLink>
        </div>
        <picture>
          <source media="(max-width: 809px)" srcSet={assets.ctaDashboardMobile} />
          <Image alt="Flowline task board" className="cta-dashboard" height={391} src={assets.ctaDashboard} width={660} />
        </picture>
        <div aria-hidden className="cta-background"><Image alt="" fill sizes="(max-width: 809px) 358px, 1200px" src={assets.pricingBackground} /></div>
      </div>
    </section>
  );
}
