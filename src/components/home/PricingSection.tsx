"use client";

import { ArrowRight, Check, Circle, Hexagon, Shield } from "@phosphor-icons/react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { pricingPlans } from "@/content/pricing";

export function PricingSection() {
  const [yearly, setYearly] = useState(false);
  const planIcons = [Circle, Hexagon, Shield];

  return (
    <section className="pricing-section" id="pricing">
      <div className="container pricing-heading scroll-reveal">
        <div>
          <p className="eyebrow"><Hexagon aria-hidden size={12} />TRANSPARENT PRICING</p>
          <h2>Pick the plan that fits your team.</h2>
          <p>Start free. Upgrade when you&apos;re ready. No hidden fees, no surprises.</p>
        </div>
      </div>
      <div aria-label="Billing period" className="billing-toggle scroll-reveal" role="group">
          <button aria-pressed={!yearly} className={!yearly ? "active" : ""} onClick={() => setYearly(false)} type="button">Monthly</button>
          <span>/</span>
          <button aria-pressed={yearly} className={yearly ? "active" : ""} onClick={() => setYearly(true)} type="button">Yearly</button>
      </div>
      <div className="container pricing-grid scroll-reveal">
        {pricingPlans.map((plan, index) => {
          const PlanIcon = planIcons[index];
          return (
          <article className={`pricing-card ${plan.popular ? "pricing-card--popular" : ""}`} key={plan.name}>
            <div className="pricing-card-icon"><PlanIcon aria-hidden size={22} />{plan.popular ? <span className="popular-label">Most popular</span> : null}</div>
            <div className="pricing-card-body">
              <div className="pricing-tier">
              <h3>{plan.name}</h3>
              <p className="pricing-description">{plan.description}</p>
              <div className="price-row">
                <span className="price" data-testid={`price-${plan.name.toLowerCase()}`}>${yearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                <span>/user</span>
              </div>
              </div>
              <div className="pricing-action">
                <ButtonLink href="/contact/">Start Free Trial <ArrowRight aria-hidden size={15} /></ButtonLink>
              <p className="annual-note">{yearly ? "Billed annually (save 20%)" : "Save with Annual Billing (20% Off)"}</p>
              </div>
              <div className="pricing-features">
              <p className="features-label">Features included:</p>
              <ul>
                {plan.features.map((feature) => <li key={feature}><Check aria-hidden size={18} weight="bold" />{feature}</li>)}
              </ul>
              </div>
            </div>
          </article>
          );
        })}
      </div>
      <p className="pricing-footnote">14-day free trial on all paid plans. No credit card required.</p>
    </section>
  );
}
