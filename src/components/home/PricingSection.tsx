"use client";

import { ArrowRight, Check, Circle, Hexagon, Shield } from "@phosphor-icons/react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { pricingFootnote, pricingIntro, pricingPlans } from "@/content/pricing";
import { siteConfig } from "@/content/site";

export function PricingSection() {
  const planIcons = [Circle, Hexagon, Shield];

  return (
    <section className="pricing-section" id="pricing">
      <div className="container pricing-heading scroll-reveal">
        <div>
          <p className="eyebrow"><Hexagon aria-hidden size={12} />透明定价</p>
          <h2>开源免费，按需选择能力。</h2>
          <p>{pricingIntro}</p>
        </div>
      </div>
      <div className="container pricing-grid scroll-reveal">
        {pricingPlans.map((plan, index) => {
          const PlanIcon = planIcons[index];
          const priceLabel = plan.priceWas ? `原价 ${plan.priceWas}，现价 ${plan.price}` : plan.price;
          return (
          <article className={`pricing-card ${plan.popular ? "pricing-card--popular" : ""}`} key={plan.name}>
            <div className="pricing-card-icon"><PlanIcon aria-hidden size={22} />{plan.popular ? <span className="popular-label">开源免费</span> : null}</div>
            <div className="pricing-card-body">
              <div className="pricing-tier">
              <h3>{plan.name}</h3>
              <p className="pricing-description">{plan.description}</p>
              <div className="price-row" aria-label={priceLabel}>
                {plan.priceWas ? <span aria-hidden className="price-was">{plan.priceWas}</span> : null}
                <span className="price" data-testid={`price-${["starter", "pro", "custom"][index]}`}>{plan.price}</span>
                <span>{plan.priceUnit}</span>
              </div>
              </div>
              <div className="pricing-action">
                {plan.disabled ? <button className="button pricing-action-disabled" disabled type="button">{plan.actionLabel}</button> : <ButtonLink href={siteConfig.downloadHref}>{plan.actionLabel} <ArrowRight aria-hidden size={15} /></ButtonLink>}
              <p className="annual-note">{plan.note}</p>
              </div>
              <div className="pricing-features">
              <p className="features-label">包含功能：</p>
              <ul>
                {plan.features.map((feature) => <li key={feature}><Check aria-hidden size={18} weight="bold" />{feature}</li>)}
              </ul>
              </div>
            </div>
          </article>
          );
        })}
      </div>
      <p className="pricing-footnote">{pricingFootnote}</p>
    </section>
  );
}
