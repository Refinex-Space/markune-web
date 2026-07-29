"use client";

import { ArrowRight, Check, Circle, Hexagon, Shield } from "@phosphor-icons/react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { pricingPlans } from "@/content/pricing";
import { siteConfig } from "@/content/site";

export function PricingSection() {
  const [yearly, setYearly] = useState(false);
  const planIcons = [Circle, Hexagon, Shield];

  return (
    <section className="pricing-section" id="pricing">
      <div className="container pricing-heading scroll-reveal">
        <div>
          <p className="eyebrow"><Hexagon aria-hidden size={12} />透明定价</p>
          <h2>选择适合团队的方案。</h2>
          <p>免费开始，准备好后再升级。没有隐藏费用，也没有意外支出。</p>
        </div>
      </div>
      <div aria-label="计费周期" className="billing-toggle scroll-reveal" role="group">
          <button aria-pressed={!yearly} className={!yearly ? "active" : ""} onClick={() => setYearly(false)} type="button">月付</button>
          <span>/</span>
          <button aria-pressed={yearly} className={yearly ? "active" : ""} onClick={() => setYearly(true)} type="button">年付</button>
      </div>
      <div className="container pricing-grid scroll-reveal">
        {pricingPlans.map((plan, index) => {
          const PlanIcon = planIcons[index];
          return (
          <article className={`pricing-card ${plan.popular ? "pricing-card--popular" : ""}`} key={plan.name}>
            <div className="pricing-card-icon"><PlanIcon aria-hidden size={22} />{plan.popular ? <span className="popular-label">最受欢迎</span> : null}</div>
            <div className="pricing-card-body">
              <div className="pricing-tier">
              <h3>{plan.name}</h3>
              <p className="pricing-description">{plan.description}</p>
              <div className="price-row">
                <span className="price" data-testid={`price-${["starter", "pro", "business"][index]}`}>${yearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                <span>/用户</span>
              </div>
              </div>
              <div className="pricing-action">
                <ButtonLink href={siteConfig.downloadHref}>下载 <ArrowRight aria-hidden size={15} /></ButtonLink>
              <p className="annual-note">{yearly ? "按年计费（节省 20%）" : "选择年付可节省 20%"}</p>
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
      <p className="pricing-footnote">所有付费方案均提供 14 天免费试用，无需信用卡。</p>
    </section>
  );
}
