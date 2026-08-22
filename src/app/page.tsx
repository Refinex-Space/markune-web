import { ArrowBendUpRight, ArrowRight, ArrowsClockwise, CalendarDots, FileMagnifyingGlass, FileText, GitBranch, GitMerge, Hexagon, ImageSquare, Tray } from "@phosphor-icons/react/dist/ssr";
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
  title: { absolute: `${siteConfig.name} — 写下想法，让工作自然展开` },
  description: "Markune 是以本地 Markdown 为核心的桌面工作区：写作、知识整理、日程、图谱、画板与 Codex 协作，在同一处连续完成。",
};

const capabilities = [
  {
    eyebrow: "本地 Markdown 工作区",
    title: "把笔记、图片与画板留在自己的文件夹中，始终可读、可迁移。",
    features: ["直接打开并编辑现有 Markdown 文件", "全文搜索文档与图稿，快速回到需要的上下文", "在文档中插入并管理本地图片与附件"],
    image: "/assets/pricing-background.webp",
    imageClass: "capability-image--workspace",
    overlayImage: "/assets/capability-local-workspace.png",
    overlayWidth: 724,
    overlayHeight: 984,
    icons: [FileText, FileMagnifyingGlass, ImageSquare],
  },
  {
    eyebrow: "Inbox 与 Daily",
    title: "先捕捉当下，再在合适的时间把零散想法变成清晰的记录。",
    features: ["在 Inbox 收集零散想法、待办与阅读摘录", "一键提升为笔记，或追加到当天的 Daily", "按日期回顾持续积累的工作脉络"],
    image: "/assets/pricing-background.webp",
    imageClass: "capability-image--inbox-daily",
    overlayImage: "/assets/capability-inbox-daily.png",
    overlayWidth: 2186,
    overlayHeight: 1230,
    icons: [Tray, ArrowBendUpRight, CalendarDots],
  },
  {
    eyebrow: "Git Sync",
    title: "用熟悉的 Git 工作流，让本地知识库始终有可追溯的同步。",
    features: ["提交、拉取并推送当前工作区", "按设定频率自动同步，也可随时立即同步", "出现差异时明确选择保留本地或远程版本"],
    image: "/assets/pricing-background.webp",
    imageClass: "capability-image--git-sync",
    overlayImage: "/assets/capability-git-sync-panel.png",
    overlayWidth: 2208,
    overlayHeight: 1496,
    icons: [GitBranch, ArrowsClockwise, GitMerge],
  },
];

const testimonials = [
  { quote: "不用先把想法整理完美。打开文件夹、写下一句，之后再让它慢慢长成一篇文档。", name: "写作者", role: "从灵感到成文", image: "/assets/testimonial-avatar-writer.png" },
  { quote: "会议结论、参考资料和下一步动作放在一起，项目交接终于有了大家都能找到的上下文。", name: "项目负责人", role: "让协作回到上下文", image: "/assets/testimonial-avatar-project-lead.png" },
  { quote: "从一条随手记录开始，链接、日程和项目会逐渐形成可以持续维护的知识结构。", name: "知识工作者", role: "持续积累的工作系统", image: "/assets/testimonial-avatar-knowledge-worker.png" },
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="container hero-copy hero-copy--enter">
          <div className="hero-main-copy">
            <h1>写下想法，<br />让工作自然展开。</h1>
            <p>Markune 是以本地 Markdown 为核心的桌面工作区：写作、知识整理、日程、图谱、画板与 Codex 协作，在同一处连续完成。</p>
          </div>
          <div className="hero-actions">
            <ButtonLink href={siteConfig.downloadHref}>下载 <ArrowRight aria-hidden size={15} /></ButtonLink>
            <ButtonLink href="/blog/" variant="lime">文档</ButtonLink>
          </div>
        </div>
        <div className="container hero-visual" aria-label="Markune 产品预览">
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
            alt="集成 Codex 的 Markune 本地 Markdown 工作区"
            className="hero-visual-product"
            height={2676}
            priority
            sizes="(max-width: 809px) calc((100vw - 32px) * .88), (max-width: 1199px) calc((100vw - 48px) * .88), 1032px"
            src="/assets/markune-workspace-hero.png"
            width={5100}
          />
        </div>
      </section>

      <ClientLogoStrip showMetric showTechnologyStack />

      <section className="section feature-section" id="features">
        <div className="container section-heading split-heading scroll-reveal">
          <div><p className="eyebrow"><Hexagon aria-hidden size={12} />为真实工作打造</p><h2>让每一份记录，都成为下一步工作的起点。</h2></div>
          <p>Markune 把 Markdown、Inbox、Daily、图稿与 Git Sync 放在同一个本地工作区中；文件保持开放，工作不被网络或专有格式绑住。</p>
        </div>
        <div className="container feature-grid scroll-reveal">
          <div className="feature-visual feature-visual--inbox-flow">
            <Image alt="" aria-hidden fill sizes="(max-width: 809px) 100vw, 50vw" src="/assets/pricing-background.webp" />
            <div className="feature-visual-overlay"><Image alt="从 Inbox 将一条收集内容提升为笔记或追加到 Daily" fill sizes="(max-width: 809px) 52vw, 300px" src="/assets/feature-inbox-daily-flow.png" /></div>
          </div>
          <div className="feature-visual feature-visual--local-workspace">
            <Image alt="" aria-hidden fill sizes="(max-width: 809px) 100vw, 50vw" src="/assets/pricing-background.webp" />
            <div className="feature-visual-overlay"><Image alt="在本地 Markdown 工作区中整理文档与资源" fill sizes="(max-width: 809px) 72vw, 450px" src="/assets/feature-local-workspace.png" /></div>
          </div>
          <article className="feature-card feature-card--text"><span className="feature-icon"><FileText aria-hidden size={18} /></span><h3>本地 Markdown 工作区</h3><p>直接打开已有文件夹，在同一处写作、搜索、管理本地图片与附件。</p></article>
          <article className="feature-card feature-card--text"><span className="feature-icon"><Tray aria-hidden size={18} /></span><h3>Inbox 与 Daily</h3><p>先快速收集，再提升为笔记或追加到当天 Daily，让记录与行动保持连续。</p></article>
          <article className="feature-card feature-card--text"><span className="feature-icon"><GitBranch aria-hidden size={18} /></span><h3>Git Sync</h3><p>提交、拉取或推送当前工作区；出现差异时，明确选择保留本地或远程版本。</p></article>
        </div>
      </section>

      <section className="capabilities-section" id="benefits">
        <div className="container section-heading split-heading capabilities-heading scroll-reveal">
          <div><p className="eyebrow eyebrow--light"><Hexagon aria-hidden size={12} />核心能力</p><h2>把每天的记录，留在自己的工作区里持续生长。</h2></div>
          <p>从收集灵感到日程回顾，再到 Git 同步，Markune 让 Markdown 文件成为一套可长期维护的个人工作系统。</p>
        </div>
        <div className="container capability-list scroll-reveal">
          {capabilities.map((item, index) => {
            return (
              <article className={`capability ${index % 2 ? "capability--reverse" : ""}`} key={item.eyebrow}>
                <div className={`capability-image ${item.imageClass ?? ""}`}>
                  <Image alt="" fill sizes="(max-width: 809px) 100vw, 50vw" src={item.image} />
                  {item.overlayImage ? (
                    <div className="capability-image-overlay-frame">
                      <Image alt="" height={item.overlayHeight} sizes="(max-width: 809px) 52vw, 460px" src={item.overlayImage} width={item.overlayWidth} />
                    </div>
                  ) : null}
                </div>
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
          <p>让记录沉淀在你的目录里，<br />而不是平台的指标里。</p>
          <div><span>本地文件与附件</span><strong>100%</strong></div>
          <div><span>支持的桌面平台</span><strong>2</strong></div>
          <div><span>核心文档格式</span><strong>1</strong></div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container testimonials-heading scroll-reveal"><p className="eyebrow"><Hexagon aria-hidden size={12} />使用场景</p><h2>让每一次记录，都能继续向前。</h2></div>
        <div className="container testimonial-showcase scroll-reveal">
          <div className="testimonial-metrics">
            <article className="metric-story">
              <Image alt="多本笔记本象征可持续积累的本地工作记录" fill sizes="(max-width: 809px) 100vw, 66vw" src="/assets/testimonial-local-notebooks.jpg" />
              <span className="metric-kicker">本地优先</span>
              <div className="metric-copy"><strong>文件始终在你手里</strong><p>用本地 Markdown 记录想法、沉淀资料；目录清晰、格式开放，也能按自己的方式备份与同步。</p></div>
            </article>
            <div className="metric-stack">
              <article className="metric-small metric-small--lime"><span className="metric-kicker">Markdown</span><div><strong>无需迁移</strong><p>已有文件夹可以直接打开；写下的内容不被锁在专有格式里。</p></div></article>
              <article className="metric-small metric-small--dark"><span className="metric-kicker">连续工作</span><div><strong>离线可用</strong><p>写作、整理与规划都在桌面完成；网络不是开始工作的前提。</p></div></article>
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
