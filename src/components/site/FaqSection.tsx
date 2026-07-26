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
          <div><p className="eyebrow"><Hexagon aria-hidden size={12} />FAQ</p><h2>Answers to the questions that come up most</h2></div>
          <div className="faq-support">
            <div className="faq-avatars"><Image alt="" height={32} src="/assets/testimonial-daniel.jpg" width={32} /><Image alt="" height={32} src="/assets/testimonial-olivia.png" width={32} /></div>
            <p><strong>Have more questions ?</strong><span>Reach out to our support team.</span></p>
            <ButtonLink href="/contact/">Contact us <ArrowRight aria-hidden size={16} /></ButtonLink>
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
