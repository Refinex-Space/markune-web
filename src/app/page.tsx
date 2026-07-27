import { ArrowRight, At, ChartLineUp, ChatCircleDots, CirclesThreePlus, ClipboardText, DownloadSimple, Fire, HardDrive, Hexagon, ListDashes, Paperclip, Plug, SlackLogo } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { PricingSection } from "@/components/home/PricingSection";
import { CallToAction } from "@/components/site/CallToAction";
import { ClientLogoStrip } from "@/components/site/ClientLogoStrip";
import { FaqSection } from "@/components/site/FaqSection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { blogPosts } from "@/content/blog";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — Organize work. Align your team. Ship faster.` },
  description: "Flowline brings your tasks, timelines, and team communication into one focused workspace.",
};

const capabilities = [
  {
    eyebrow: "Teamwork & Communication",
    title: "Keep your whole team aligned without endless status update meetings.",
    features: ["Comment directly on any task", "Tag teammates with @mentions", "Attach files from your desktop or cloud"],
    image: "/assets/capability-comments-render.avif",
    icons: [ChatCircleDots, At, Paperclip],
  },
  {
    eyebrow: "Insights & Performance",
    title: "Spot bottlenecks early and keep every project on track.",
    features: ["Track completion rates by team or member", "Spot overloaded teammates before burnout hits", "Export reports for stakeholders in one click"],
    image: "/assets/capability-analytics-render.avif",
    icons: [ListDashes, Fire, DownloadSimple],
  },
  {
    eyebrow: "Connectivity & Sync",
    title: "Stop switching between apps and work from one place.",
    features: ["Sync files automatically from Google Drive or Dropbox", "Get task updates posted to your Slack channels", "Connect to Zapier for custom workflows"],
    image: "/assets/capability-integrations-render.avif",
    icons: [HardDrive, SlackLogo, Plug],
  },
];

const testimonials = [
  { quote: "The timeline view alone saved us hours of status meetings every week. Now everyone sees what's due without asking.", name: "Daniel Kim", role: "Engineering Lead, Northbase", image: "/assets/testimonial-daniel.jpg" },
  { quote: "We went from three different tools to just Flowline. Onboarding took a day, and within a week our entire project pipeline was visible to everyone.", name: "Olivia Cheng", role: "Head of Operations, Clearwave", image: "/assets/testimonial-olivia.png" },
  { quote: "Moved our 40-person team over in a weekend. Zero complaints. That never happens.", name: "Martin Vasquez", role: "Director of Ops, Peakform", image: "/assets/testimonial-martin.png" },
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="container hero-copy hero-copy--enter">
          <div className="hero-main-copy">
            <h1>Organize work. Align<br />your team. Ship faster.</h1>
            <p>Flowline brings your tasks, timelines, and team communication into one focused workspace.</p>
          </div>
          <div className="hero-actions">
            <ButtonLink href="/contact/">Start Free Trial <ArrowRight aria-hidden size={15} /></ButtonLink>
            <ButtonLink href="/contact/" variant="lime">Book a Demo</ButtonLink>
          </div>
        </div>
        <div className="container hero-image-wrap">
          <picture>
            <source media="(max-width: 809px)" srcSet="/assets/hero-task-board-mobile.webp" />
            <source media="(max-width: 1199px)" srcSet="/assets/hero-task-board-tablet.webp" />
            <Image alt="Flowline project task board" className="hero-image" height={711} priority src="/assets/hero-task-board-desktop.webp" width={1200} />
          </picture>
        </div>
      </section>

      <ClientLogoStrip showMetric />

      <section className="section feature-section" id="features">
        <div className="container section-heading split-heading scroll-reveal">
          <div><p className="eyebrow"><Hexagon aria-hidden size={12} />BUILT FOR REAL TEAMS</p><h2>Everything your team needs to stay in sync.</h2></div>
          <p>From daily task management to cross-team project planning — Flowline adapts to how your team actually works.</p>
        </div>
        <div className="container feature-grid scroll-reveal">
          <div className="feature-visual"><picture><source media="(max-width: 1199px)" srcSet="/assets/feature-automation-mobile.avif" /><Image alt="Workflow automation UI snippet" fill sizes="(max-width: 809px) 100vw, 50vw" src="/assets/feature-automation-desktop.avif" /></picture></div>
          <div className="feature-visual"><picture><source media="(max-width: 1199px)" srcSet="/assets/feature-task-board-mobile.avif" /><Image alt="Smart task boards UI with abstract background" fill sizes="(max-width: 809px) 100vw, 50vw" src="/assets/feature-task-board-desktop.avif" /></picture></div>
          <article className="feature-card feature-card--text"><span className="feature-icon"><ClipboardText aria-hidden size={18} /></span><h3>Smart Task Boards Description</h3><p>Organize every project as a board, list, or timeline — and switch between views.</p></article>
          <article className="feature-card feature-card--text"><span className="feature-icon"><ChartLineUp aria-hidden size={18} /></span><h3>Team Analytics</h3><p>Track completion rates, spot overdue work, and see who&apos;s overloaded.</p></article>
          <article className="feature-card feature-card--text"><span className="feature-icon"><CirclesThreePlus aria-hidden size={18} /></span><h3>Workflow Automation</h3><p>Set rules once and let Flowline auto-assign tasks.</p></article>
        </div>
      </section>

      <section className="capabilities-section" id="benefits">
        <div className="container section-heading split-heading capabilities-heading scroll-reveal">
          <div><p className="eyebrow eyebrow--light"><Hexagon aria-hidden size={12} />CORE CAPABILITIES</p><h2>Built to handle how your team really works.</h2></div>
          <p>Not another tool that forces you into a rigid process. Flowline flexes around your workflows, not the other way around.</p>
        </div>
        <div className="container capability-list scroll-reveal">
          {capabilities.map((item, index) => {
            return (
              <article className={`capability ${index % 2 ? "capability--reverse" : ""}`} key={item.eyebrow}>
                <div className="capability-image"><Image alt="" fill sizes="(max-width: 809px) 100vw, 50vw" src={item.image} /></div>
                <div className="capability-copy">
                  <h3>{item.eyebrow}</h3>
                  <p>{item.title}</p>
                  <ButtonLink href="/contact/">Start Free Trial <ArrowRight aria-hidden size={15} /></ButtonLink>
                  <ul>{item.features.map((feature, featureIndex) => { const FeatureIcon = item.icons[featureIndex]; return <li key={feature}><FeatureIcon aria-hidden size={20} />{feature}</li>; })}</ul>
                </div>
              </article>
            );
          })}
        </div>
        <div className="container capability-stats scroll-reveal">
          <p>Built for performance.<br />Proven at scale.</p>
          <div><span>UPTIME RELIABILITY</span><strong>98%</strong></div>
          <div><span>TASKS COMPLETED</span><strong>2.4M</strong></div>
          <div><span>USER RATING</span><strong>4.8/5</strong></div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container testimonials-heading scroll-reveal"><p className="eyebrow"><Hexagon aria-hidden size={12} />TESTIMONIALS</p><h2>Don&apos;t take our word for it.</h2></div>
        <div className="container testimonial-showcase scroll-reveal">
          <div className="testimonial-metrics">
            <article className="metric-story">
              <picture><source media="(max-width: 809px)" srcSet="/assets/team-james-mobile.avif" /><Image alt="Smiling Flowline customer" fill sizes="(max-width: 809px) 100vw, 66vw" src="/assets/team-james-render.avif" /></picture>
              <Image alt="ennLabs" className="metric-logo" height={48} src="/assets/customer-northbase.svg" style={{ width: "auto" }} width={162} />
              <div className="metric-copy"><strong>40%</strong><p>Faster project delivery after switching their entire 45-person engineering team to Flowline in under a week.</p></div>
            </article>
            <div className="metric-stack">
              <article className="metric-small metric-small--lime"><Image alt="Codecraft" height={48} src="/assets/customer-clearwave.svg" style={{ width: "auto" }} width={202} /><div><strong>3x</strong><p>More projects shipped per quarter after consolidating four separate tools into one Flowline workspace.</p></div></article>
              <article className="metric-small metric-small--dark"><Image alt="45 Degrees" height={48} src="/assets/customer-peakform.svg" style={{ width: "auto" }} width={188} /><div><strong>12 hrs</strong><p>Saved every week on status meetings and manual updates after automating their client delivery workflow.</p></div></article>
            </div>
          </div>
          <div className="testimonial-grid">
          {testimonials.map((item) => (
            <blockquote key={item.name}>
              <p>{item.quote}</p>
              <footer><Image alt="" height={48} src={item.image} width={48} /><div><cite>{item.name}</cite><span>{item.role}</span></div></footer>
            </blockquote>
          ))}
          </div>
        </div>
      </section>

      <PricingSection />

      <section className="home-blog-section">
        <div className="container home-blog-heading scroll-reveal"><p className="eyebrow"><Hexagon aria-hidden size={12} />BLOG</p><h2>Ideas for better teamwork.</h2></div>
        <div className="container blog-grid scroll-reveal">{blogPosts.slice(0, 3).map((post) => <BlogCard key={post.slug} post={post} />)}</div>
        <Link className="button button--lime home-blog-more" href="/blog/">View more articles</Link>
      </section>

      <FaqSection />
      <CallToAction />
    </>
  );
}
