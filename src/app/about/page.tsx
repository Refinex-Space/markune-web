import type { Metadata } from "next";
import Image from "next/image";
import { Hexagon, RadioButton, Timer, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { CallToAction } from "@/components/site/CallToAction";
import { ClientLogoStrip } from "@/components/site/ClientLogoStrip";
import { FaqSection } from "@/components/site/FaqSection";

export const metadata: Metadata = {
  title: "About",
  description: "We built Flowline to help teams focus on what matters — getting things done, not fighting their tools.",
};

const values = [
  { title: "Simplicity first", text: "If a feature needs a tutorial, it's not ready. Every part of Flowline should be obvious the first time you use it.", icon: RadioButton },
  { title: "Speed matters", text: "Slow tools don't get used. We obsess over performance so your workspace loads fast and stays fast.", icon: Timer },
  { title: "Teams over features", text: "We don't build for feature checklists. We build for the way real teams actually work.", icon: UsersThree },
];

const team = [
  { name: "Sarah Mitchell", role: "Head of Content", image: "/assets/team-sarah-render.avif" },
  { name: "John Krasinski", role: "Head of Design", image: "/assets/team-john-render.avif" },
  { name: "Ana Moreno", role: "Co-founder & CEO", image: "/assets/team-ana-render.avif" },
  { name: "Daniel Keane", role: "Co-founder & CTO", image: "/assets/team-daniel-render.avif" },
  { name: "David Park", role: "Senior Product Manager", image: "/assets/team-david-render.avif" },
  { name: "James Okoro", role: "Engineering Lead", image: "/assets/team-james-about-render.avif" },
];

const quotes = [
  { quote: "The timeline view alone saved us hours of status meetings every week. Now everyone sees what's due without asking.", name: "Daniel Kim", role: "Engineering Lead, Northbase", image: "/assets/testimonial-daniel.jpg" },
  { quote: "We went from three different tools to just Flowline. Onboarding took a day, and within a week our entire project pipeline was visible to everyone.", name: "Olivia Cheng", role: "Head of Operations, Clearwave", image: "/assets/testimonial-olivia.png" },
  { quote: "Moved our 40-person team over in a weekend. Zero complaints. That never happens.", name: "Martin Vasquez", role: "Director of Ops, Peakform", image: "/assets/testimonial-martin.png" },
];

export default function AboutPage() {
  return (
    <>
      <section className="about-top">
        <div className="container about-hero-copy page-load-reveal">
          <p className="eyebrow"><Hexagon aria-hidden size={12} />ABOUT</p>
          <h1>Built for teams who ship.</h1>
          <p>We built Flowline to help teams focus on what matters — getting things done, not fighting their tools.</p>
        </div>
        <div className="container about-image"><picture><source media="(max-width: 809px)" srcSet="/assets/about-story-mobile.webp" /><source media="(max-width: 1199px)" srcSet="/assets/about-story-tablet.webp" /><Image alt="Flowline team working together" fill priority sizes="100vw" src="/assets/about-story.png" /></picture></div>
      </section>
      <ClientLogoStrip showMetric />
      <section className="about-story-section">
        <div className="container about-story-copy scroll-reveal">
          <p className="eyebrow"><Hexagon aria-hidden size={12} />OUR STORY</p>
          <h2>Every project management tool we used either buried simple tasks under layers of configuration or fell apart past three people. We built Flowline to sit in the middle — powerful enough for real workflows, simple enough that your whole team actually uses it.</h2>
        </div>
      </section>
      <section className="section values-section">
        <div className="container split-heading section-heading scroll-reveal">
          <div><p className="eyebrow"><Hexagon aria-hidden size={12} />VALUES</p><h2>What drives every decision we make.</h2></div>
          <p>Three principles that shape how we build, what we ship, and how we treat every team that trusts us with their work.</p>
        </div>
        <div className="container values-grid scroll-reveal">{values.map((value) => { const ValueIcon = value.icon; return <article key={value.title}><span className="value-icon"><ValueIcon aria-hidden size={20} weight="regular" /></span><div className="value-copy"><h3>{value.title}</h3><p>{value.text}</p></div></article>; })}</div>
      </section>
      <section className="section about-testimonials">
        <div className="container section-heading scroll-reveal"><p className="eyebrow eyebrow--light"><Hexagon aria-hidden size={12} />WHAT TEAMS SAY</p><h2>Trusted by teams like yours.</h2></div>
        <div className="container quote-list scroll-reveal">{quotes.map((item) => <blockquote key={item.name}><div className="quote-copy"><span aria-hidden>“</span><p>{item.quote}</p></div><footer><Image alt="" height={48} src={item.image} width={48} /><div><strong>{item.name}</strong><span>{item.role}</span></div></footer></blockquote>)}</div>
      </section>
      <section className="section team-section">
        <div className="container section-heading scroll-reveal"><p className="eyebrow"><Hexagon aria-hidden size={12} />OUR TEAM</p><h2>The people behind Flowline.</h2></div>
        <div className="container team-grid scroll-reveal">{team.map((person) => <article key={person.name}><div className="team-image"><Image alt={person.name} fill sizes="(max-width: 809px) 50vw, 33vw" src={person.image} /></div><div className="team-info"><h3>{person.name}</h3><p>{person.role}</p></div></article>)}</div>
      </section>
      <FaqSection />
      <CallToAction />
    </>
  );
}
