import type { Metadata } from "next";
import { Hexagon } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "联系我们",
  description: "无论是咨询问题、预约演示还是进一步了解 Markune，我们都期待收到你的消息。",
};

export default function ContactPage() {
  return (
    <section className="contact-page">
      <div className="container contact-heading">
        <p className="eyebrow"><Hexagon aria-hidden size={12} />联系我们</p>
        <h1>与我们联系</h1>
        <p>无论是咨询问题、预约演示还是进一步了解 Markune，我们都期待收到你的消息。</p>
      </div>
      <div className="container contact-shell">
        <div className="contact-panel"><ContactForm /></div>
      </div>
    </section>
  );
}
