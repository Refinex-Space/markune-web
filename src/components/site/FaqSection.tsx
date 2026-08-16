"use client";

import { Accordion } from "radix-ui";
import { ArrowRight, Hexagon, Plus } from "@phosphor-icons/react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { faqs } from "@/content/faqs";

export function FaqSection() {
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-layout">
        <div className="faq-intro scroll-reveal">
          <div><p className="eyebrow"><Hexagon aria-hidden size={12} />常见问题</p><h2>常见问题解答</h2></div>
          <div className="faq-support">
            <div className="faq-avatars"><Image alt="Markune 支持团队" height={44} src="/assets/markune-support-avatar.png" width={44} /></div>
            <p><strong>还有其他问题？</strong><span>欢迎联系我们的支持团队。</span></p>
            <ButtonLink href="mailto:refinexcn@gmail.com">联系我们 <ArrowRight aria-hidden size={16} /></ButtonLink>
          </div>
        </div>
        <Accordion.Root className="faq-list scroll-reveal" collapsible type="single">
          {faqs.map((item) => (
            <Accordion.Item className="faq-item" key={item.question} value={item.question}>
              <Accordion.Header>
                <Accordion.Trigger className="faq-trigger">
                  <span>{item.question}</span>
                  <Plus aria-hidden className="faq-icon" size={24} weight="regular" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="faq-content"><p>{item.answer}</p></Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
