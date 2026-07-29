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
  title: { absolute: `${siteConfig.name} — 组织工作，协同团队，高效交付` },
  description: "Madora 将任务、时间线与团队沟通集中到一个专注的工作区中。",
};

const capabilities = [
  {
    eyebrow: "团队协作与沟通",
    title: "无需无休止的状态会议，也能让整个团队保持一致。",
    features: ["直接在任意任务中评论", "使用 @mentions 提及团队成员", "从桌面或云端添加附件"],
    image: "/assets/capability-comments-render.avif",
    icons: [ChatCircleDots, At, Paperclip],
  },
  {
    eyebrow: "洞察与绩效",
    title: "尽早发现瓶颈，让每个项目始终按计划推进。",
    features: ["按团队或成员跟踪完成率", "在成员不堪重负前发现工作量问题", "一键为相关方导出报告"],
    image: "/assets/capability-analytics-render.avif",
    icons: [ListDashes, Fire, DownloadSimple],
  },
  {
    eyebrow: "连接与同步",
    title: "告别频繁切换应用，在一个地方完成工作。",
    features: ["从 Google Drive 或 Dropbox 自动同步文件", "将任务更新发送到 Slack 频道", "连接 Zapier 构建自定义工作流"],
    image: "/assets/capability-integrations-render.avif",
    icons: [HardDrive, SlackLogo, Plug],
  },
];

const testimonials = [
  { quote: "仅时间线视图一项功能，每周就为我们省下了数小时的状态会议。现在每个人都能直接看到截止事项，无需反复询问。", name: "Daniel Kim", role: "Northbase 工程负责人", image: "/assets/testimonial-daniel.jpg" },
  { quote: "我们从同时使用三个工具转为只使用 Madora。团队一天内完成上手，一周后整个项目流程对所有人都清晰可见。", name: "Olivia Cheng", role: "Clearwave 运营负责人", image: "/assets/testimonial-olivia.png" },
  { quote: "我们用一个周末迁移了 40 人团队，没有收到任何抱怨。这种情况以前从未发生过。", name: "Martin Vasquez", role: "Peakform 运营总监", image: "/assets/testimonial-martin.png" },
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="container hero-copy hero-copy--enter">
          <div className="hero-main-copy">
            <h1>组织工作，协同团队，<br />更高效地交付。</h1>
            <p>Madora 将任务、时间线与团队沟通集中到一个专注的工作区中。</p>
          </div>
          <div className="hero-actions">
            <ButtonLink href={siteConfig.downloadHref}>下载 <ArrowRight aria-hidden size={15} /></ButtonLink>
            <ButtonLink href="/contact/" variant="lime">预约演示</ButtonLink>
          </div>
        </div>
        <div className="container hero-visual" aria-label="Madora 产品预览">
          <Image
            alt=""
            aria-hidden="true"
            className="hero-visual-background"
            fill
            priority
            sizes="(max-width: 809px) calc(100vw - 32px), (max-width: 1199px) calc(100vw - 48px), 1200px"
            src="/assets/pricing-background.webp"
          />
          <Image
            alt="集成 Codex 的 Madora 本地 Markdown 工作区"
            className="hero-visual-product"
            height={2676}
            priority
            sizes="(max-width: 809px) calc((100vw - 32px) * .88), (max-width: 1199px) calc((100vw - 48px) * .88), 1032px"
            src="/assets/madora-workspace-hero.png"
            width={5100}
          />
        </div>
      </section>

      <ClientLogoStrip showMetric />

      <section className="section feature-section" id="features">
        <div className="container section-heading split-heading scroll-reveal">
          <div><p className="eyebrow"><Hexagon aria-hidden size={12} />为真实团队打造</p><h2>团队保持同步所需的一切。</h2></div>
          <p>从日常任务管理到跨团队项目规划，Madora 会适应团队真实的工作方式。</p>
        </div>
        <div className="container feature-grid scroll-reveal">
          <div className="feature-visual"><picture><source media="(max-width: 1199px)" srcSet="/assets/feature-automation-mobile.avif" /><Image alt="工作流自动化 UI 片段" fill sizes="(max-width: 809px) 100vw, 50vw" src="/assets/feature-automation-desktop.avif" /></picture></div>
          <div className="feature-visual"><picture><source media="(max-width: 1199px)" srcSet="/assets/feature-task-board-mobile.avif" /><Image alt="带抽象背景的智能任务看板 UI" fill sizes="(max-width: 809px) 100vw, 50vw" src="/assets/feature-task-board-desktop.avif" /></picture></div>
          <article className="feature-card feature-card--text"><span className="feature-icon"><ClipboardText aria-hidden size={18} /></span><h3>智能任务看板</h3><p>以看板、列表或时间线组织项目，并随时切换视图。</p></article>
          <article className="feature-card feature-card--text"><span className="feature-icon"><ChartLineUp aria-hidden size={18} /></span><h3>团队分析</h3><p>跟踪完成率、发现逾期工作，并查看哪些成员负担过重。</p></article>
          <article className="feature-card feature-card--text"><span className="feature-icon"><CirclesThreePlus aria-hidden size={18} /></span><h3>工作流自动化</h3><p>只需设置一次规则，Madora 即可自动分配任务。</p></article>
        </div>
      </section>

      <section className="capabilities-section" id="benefits">
        <div className="container section-heading split-heading capabilities-heading scroll-reveal">
          <div><p className="eyebrow eyebrow--light"><Hexagon aria-hidden size={12} />核心能力</p><h2>为团队真实的工作方式而打造。</h2></div>
          <p>Madora 不会强迫你适应僵化流程，而是灵活配合你的工作流。</p>
        </div>
        <div className="container capability-list scroll-reveal">
          {capabilities.map((item, index) => {
            return (
              <article className={`capability ${index % 2 ? "capability--reverse" : ""}`} key={item.eyebrow}>
                <div className="capability-image"><Image alt="" fill sizes="(max-width: 809px) 100vw, 50vw" src={item.image} /></div>
                <div className="capability-copy">
                  <h3>{item.eyebrow}</h3>
                  <p>{item.title}</p>
                  <ButtonLink href={siteConfig.downloadHref}>下载 <ArrowRight aria-hidden size={15} /></ButtonLink>
                  <ul>{item.features.map((feature, featureIndex) => { const FeatureIcon = item.icons[featureIndex]; return <li key={feature}><FeatureIcon aria-hidden size={20} />{feature}</li>; })}</ul>
                </div>
              </article>
            );
          })}
        </div>
        <div className="container capability-stats scroll-reveal">
          <p>以性能为本，<br />经规模化验证。</p>
          <div><span>稳定运行率</span><strong>98%</strong></div>
          <div><span>已完成任务</span><strong>240 万</strong></div>
          <div><span>用户评分</span><strong>4.8/5</strong></div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container testimonials-heading scroll-reveal"><p className="eyebrow"><Hexagon aria-hidden size={12} />用户评价</p><h2>听听用户怎么说。</h2></div>
        <div className="container testimonial-showcase scroll-reveal">
          <div className="testimonial-metrics">
            <article className="metric-story">
              <picture><source media="(max-width: 809px)" srcSet="/assets/team-james-mobile.avif" /><Image alt="微笑的 Madora 用户" fill sizes="(max-width: 809px) 100vw, 66vw" src="/assets/team-james-render.avif" /></picture>
              <Image alt="ennLabs" className="metric-logo" height={48} src="/assets/customer-northbase.svg" style={{ width: "auto" }} width={162} />
              <div className="metric-copy"><strong>40%</strong><p>45 人工程团队在一周内全面迁移到 Madora 后，项目交付速度提升。</p></div>
            </article>
            <div className="metric-stack">
              <article className="metric-small metric-small--lime"><Image alt="Codecraft" height={48} src="/assets/customer-clearwave.svg" style={{ width: "auto" }} width={202} /><div><strong>3 倍</strong><p>将四个独立工具整合到一个 Madora 工作区后，每季度交付的项目数量提升。</p></div></article>
              <article className="metric-small metric-small--dark"><Image alt="45 Degrees" height={48} src="/assets/customer-peakform.svg" style={{ width: "auto" }} width={188} /><div><strong>12 小时</strong><p>自动化客户交付工作流后，每周从状态会议和手动更新中节省的时间。</p></div></article>
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
        <div className="container home-blog-heading scroll-reveal"><p className="eyebrow"><Hexagon aria-hidden size={12} />博客</p><h2>让团队协作更高效的思考。</h2></div>
        <div className="container blog-grid scroll-reveal">{blogPosts.slice(0, 3).map((post) => <BlogCard key={post.slug} post={post} />)}</div>
        <Link className="button button--lime home-blog-more" href="/blog/">查看更多文章</Link>
      </section>

      <FaqSection />
      <CallToAction />
    </>
  );
}
