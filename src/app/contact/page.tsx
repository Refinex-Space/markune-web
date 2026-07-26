import type { Metadata } from "next";
import { Hexagon } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Have a question, need a demo, or want to learn more? We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <section className="contact-page">
      <div className="container contact-heading">
        <p className="eyebrow"><Hexagon aria-hidden size={12} />CONTACT US</p>
        <h1>Get in touch</h1>
        <p>Have a question, need a demo, or want to learn more? We&apos;d love to hear from you.</p>
      </div>
      <div className="container contact-shell">
        <div className="contact-panel"><ContactForm /></div>
      </div>
    </section>
  );
}
