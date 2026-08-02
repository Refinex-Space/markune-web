import type { Metadata } from "next";
import Image from "next/image";
import { Hexagon, RadioButton, Timer, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { CallToAction } from "@/components/site/CallToAction";
import { ClientLogoStrip } from "@/components/site/ClientLogoStrip";
import { FaqSection } from "@/components/site/FaqSection";

export const metadata: Metadata = {
  title: "关于我们",
  description: "我们打造 Madora，是为了帮助团队专注于真正重要的事情：完成工作，而不是与工具对抗。",
};

const values = [
  { title: "简洁优先", text: "如果一个功能必须配合教程才能使用，它就还没有准备好。Madora 的每个部分都应该在第一次使用时清晰易懂。", icon: RadioButton },
  { title: "速度至关重要", text: "缓慢的工具不会被真正使用。我们持续关注性能，让你的工作区始终快速加载、流畅运行。", icon: Timer },
  { title: "团队重于功能清单", text: "我们不会为了填满功能清单而开发，而是围绕真实团队的工作方式构建产品。", icon: UsersThree },
];

const team = [
  { name: "Sarah Mitchell", role: "内容负责人", image: "/assets/team-sarah-render.avif" },
  { name: "John Krasinski", role: "设计负责人", image: "/assets/team-john-render.avif" },
  { name: "Ana Moreno", role: "联合创始人兼 CEO", image: "/assets/team-ana-render.avif" },
  { name: "Daniel Keane", role: "联合创始人兼 CTO", image: "/assets/team-daniel-render.avif" },
  { name: "David Park", role: "高级产品经理", image: "/assets/team-david-render.avif" },
  { name: "James Okoro", role: "工程负责人", image: "/assets/team-james-about-render.avif" },
];

const quotes = [
  { quote: "仅时间线视图一项功能，每周就为我们省下了数小时的状态会议。现在每个人都能直接看到截止事项，无需反复询问。", name: "Daniel Kim", role: "Northbase 工程负责人", image: "/assets/testimonial-avatar-writer.png" },
  { quote: "我们从同时使用三个工具转为只使用 Madora。团队一天内完成上手，一周后整个项目流程对所有人都清晰可见。", name: "Olivia Cheng", role: "Clearwave 运营负责人", image: "/assets/testimonial-avatar-project-lead.png" },
  { quote: "我们用一个周末迁移了 40 人团队，没有收到任何抱怨。这种情况以前从未发生过。", name: "Martin Vasquez", role: "Peakform 运营总监", image: "/assets/testimonial-avatar-knowledge-worker.png" },
];

export default function AboutPage() {
  return (
    <>
      <section className="about-top">
        <div className="container about-hero-copy page-load-reveal">
          <p className="eyebrow"><Hexagon aria-hidden size={12} />关于我们</p>
          <h1>为持续交付的团队而打造。</h1>
          <p>我们打造 Madora，是为了帮助团队专注于真正重要的事情：完成工作，而不是与工具对抗。</p>
        </div>
        <div className="container about-image"><picture><source media="(max-width: 809px)" srcSet="/assets/about-story-mobile.webp" /><source media="(max-width: 1199px)" srcSet="/assets/about-story-tablet.webp" /><Image alt="Madora 团队共同协作" fill priority sizes="100vw" src="/assets/about-story.png" /></picture></div>
      </section>
      <ClientLogoStrip showMetric />
      <section className="about-story-section">
        <div className="container about-story-copy scroll-reveal">
          <p className="eyebrow"><Hexagon aria-hidden size={12} />我们的故事</p>
          <h2>我们用过的项目管理工具，要么把简单任务埋在层层配置之下，要么在团队超过三人后就难以维系。因此我们打造了 Madora：既有能力承载真实工作流，又足够简单，让整个团队愿意真正使用。</h2>
        </div>
      </section>
      <section className="section values-section">
        <div className="container split-heading section-heading scroll-reveal">
          <div><p className="eyebrow"><Hexagon aria-hidden size={12} />价值观</p><h2>驱动每一个决定的原则。</h2></div>
          <p>这三项原则决定了我们如何构建产品、如何发布功能，以及如何对待每一个将工作托付给我们的团队。</p>
        </div>
        <div className="container values-grid scroll-reveal">{values.map((value) => { const ValueIcon = value.icon; return <article key={value.title}><span className="value-icon"><ValueIcon aria-hidden size={20} weight="regular" /></span><div className="value-copy"><h3>{value.title}</h3><p>{value.text}</p></div></article>; })}</div>
      </section>
      <section className="section about-testimonials">
        <div className="container section-heading scroll-reveal"><p className="eyebrow eyebrow--light"><Hexagon aria-hidden size={12} />团队评价</p><h2>获得众多团队的信任。</h2></div>
        <div className="container quote-list scroll-reveal">{quotes.map((item) => <blockquote key={item.name}><div className="quote-copy"><span aria-hidden>“</span><p>{item.quote}</p></div><footer><Image alt="" height={48} src={item.image} width={48} /><div><strong>{item.name}</strong><span>{item.role}</span></div></footer></blockquote>)}</div>
      </section>
      <section className="section team-section">
        <div className="container section-heading scroll-reveal"><p className="eyebrow"><Hexagon aria-hidden size={12} />我们的团队</p><h2>Madora 背后的团队。</h2></div>
        <div className="container team-grid scroll-reveal">{team.map((person) => <article key={person.name}><div className="team-image"><Image alt={person.name} fill sizes="(max-width: 809px) 50vw, 33vw" src={person.image} /></div><div className="team-info"><h3>{person.name}</h3><p>{person.role}</p></div></article>)}</div>
      </section>
      <FaqSection />
      <CallToAction />
    </>
  );
}
