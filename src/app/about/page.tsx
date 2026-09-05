import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Code, GithubLogo, HardDrives, Leaf, Stack } from "@phosphor-icons/react/dist/ssr";
import { CopyEmailButton } from "@/components/about/CopyEmailButton";
import { assets, siteConfig } from "@/content/site";
import styles from "./about.module.css";

const github = "https://github.com/Refinex-Space";
const description = "认识 Refinex（沉默的老李）：Java 研发工程师、个人开发者，Markune、Markweave 与 AgentArk 的开发者。用代码打磨写作、知识整理与 AI Agent 工具。";

export const metadata: Metadata = {
  title: "关于我 · Refinex",
  description,
  openGraph: { title: "认识 Refinex · Markune 背后的开发者", description, type: "website" },
};

const principles = [
  { number: "01", icon: HardDrives, title: "内容，留在自己手里。", text: "用本地文件和开放格式承载知识。工具可以迭代，记录应该能够被读取、迁移和长期保存。" },
  { number: "02", icon: Code, title: "把有用的能力开放出来。", text: "从完整的应用，到可以独立接入的编辑器。让代码能够被阅读、复用，也让改进有机会发生。" },
  { number: "03", icon: Leaf, title: "让复杂留在实现里。", text: "认真对待底层结构，也认真对待一次输入、一次保存。好的工程，最终应该变成顺手的体验。" },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section aria-labelledby="about-title" className={`${styles.hero} container`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.dot} /> 关于我 <span className={styles.eyebrowEnglish}>THE PERSON BEHIND MARKUNE</span></p>
          <h1 id="about-title">你好，我是<br /><span className={styles.name}>Refinex<span className={styles.period}>.</span></span></h1>
          <p className={styles.identity}>沉默的老李<span aria-hidden="true"> / </span>Java 研发工程师 · 个人开发者</p>
          <p className={styles.intro}>写代码，也打磨自己想用的工具。<br />我在构建关于写作、知识与 AI 的产品，<br className={styles.desktopBreak} />让想法有地方安放，让技术在日常里发挥作用。</p>
          <div className={styles.actions}>
            <a className={styles.primaryLink} href="#projects">看看我在做什么 <ArrowDown aria-hidden size={17} /></a>
            <a className={styles.quietLink} href={github} rel="noreferrer" target="_blank"><GithubLogo aria-hidden size={19} /> GitHub <ArrowUpRight aria-hidden size={15} /></a>
          </div>
        </div>
        <figure className={styles.portrait}>
          <div className={styles.portraitTop}><span>独立构建，持续打磨</span><span>HELLO, WORLD.</span></div>
          <Image alt="Refinex（沉默的老李）的手绘头像" className={styles.avatar} height={1024} loading="eager" priority sizes="(max-width: 809px) 85vw, 420px" src="/assets/about/refinex-avatar.png" width={1024} />
          <figcaption><span className={styles.signature}>Refinex</span><span>代码之外，也是一个创造者。</span></figcaption>
        </figure>
      </section>
      <nav aria-label="本页导航" className={`${styles.index} container`}>
        <span className={styles.indexLabel}>一点关于我</span>
        <a href="#story"><span>01</span> 从想法开始 <ArrowDown aria-hidden size={14} /></a>
        <a href="#projects"><span>02</span> 正在构建 <ArrowDown aria-hidden size={14} /></a>
        <a href="#connect"><span>03</span> 保持联系 <ArrowDown aria-hidden size={14} /></a>
      </nav>
      <section aria-labelledby="story-title" className={`${styles.story} container`} id="story">
        <div><p className={styles.eyebrow}>从想法开始</p><p className={styles.sideNote}>A LITTLE CONTEXT</p></div>
        <div className={styles.storyBody}>
          <h2 id="story-title">从写好一段代码，<br />到做好一个<span className={styles.underline}>日常会用的工具。</span></h2>
          <div className={styles.storyColumns}>
            <p>我是 Refinex，也叫「沉默的老李」。我的专业是 Java 研发，而个人开发让我有机会把关注点延伸到完整的产品：从底层结构，到屏幕上每一次真实的交互。</p>
            <p>写作与知识整理、可复用的编辑体验、AI Agent 的工程化，是我正在投入的三个方向。Markune、Markweave 和 AgentArk，就是这些想法逐渐变成软件的过程。</p>
          </div>
        </div>
      </section>
      <section aria-labelledby="projects-title" className={styles.projects} id="projects">
        <div className="container">
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>正在构建 <span className={styles.eyebrowEnglish}>SELECTED PROJECTS</span></p><h2 id="projects-title">三个项目，各有专注。</h2></div>
            <p>面向使用者的产品，面向开发者的能力。<br />从 Markdown 到 AI，持续探索。</p>
          </div>
          <article className={styles.featuredProject}>
            <div className={styles.featuredCopy}>
              <div className={styles.projectMeta}><span>01 / 桌面应用</span><span className={styles.badge}>你正在访问的产品</span></div>
              <Image alt="" aria-hidden className={styles.projectLogo} height={34} src={assets.logo} width={34} />
              <h3>Markune</h3>
              <p className={styles.projectTagline}>让想法，留在自己的工作区。</p>
              <p className={styles.projectDescription}>本地优先的 Markdown 笔记与知识工作区。把写作、日程、图谱、画板与 AI 协作连接起来，让记录和思考围绕你自己的文件展开。</p>
              <ul aria-label="Markune 特点" className={styles.tags}><li>本地优先</li><li>Markdown</li><li>桌面工作区</li></ul>
              <div className={styles.projectLinks}>
                <Link className={styles.primaryLink} href="/download/">体验 Markune <ArrowRight aria-hidden size={16} /></Link>
                <a className={styles.quietLink} href={`${github}/markune`} rel="noreferrer" target="_blank" aria-label="查看 Markune 源码">查看源码 <ArrowUpRight aria-hidden size={16} /></a>
              </div>
            </div>
            <figure className={styles.productPreview}>
              <Image alt="Markune 桌面工作区，包含本地文件目录、日程与 Codex 协作面板" height={2694} sizes="(max-width: 809px) 92vw, 700px" src={assets.hero} width={5120} />
              <figcaption><span className={styles.dot} /> MARKUNE WORKSPACE <span>你的文件，你的工作方式。</span></figcaption>
            </figure>
          </article>
          <div className={styles.projectGrid}>
            <article className={`${styles.projectCard} ${styles.editorCard}`}>
              <div className={styles.projectMeta}><span>02 / 编辑器</span><Code aria-hidden size={25} weight="light" /></div>
              <h3>Markweave</h3>
              <p className={styles.projectTagline}>好的编辑体验，也可以成为你的起点。</p>
              <p className={styles.projectDescription}>开源、免费的 Markdown-first 所见即所得编辑器，也是 Markune 的底层编辑器。提供 React、Vue 2 与 Vue 3 适配，让开发者在自己的产品里接入完整的编辑能力。</p>
              <ul aria-label="Markweave 特点" className={styles.tags}><li>MIT 开源</li><li>React / Vue</li><li>Markdown-first</li></ul>
              <a className={styles.cardLink} href={`${github}/markweave`} rel="noreferrer" target="_blank">探索 Markweave <ArrowUpRight aria-hidden size={22} /></a>
            </article>
            <article className={styles.projectCard}>
              <div className={styles.projectMeta}><span>03 / AI AGENT 平台</span><Stack aria-hidden size={25} weight="light" /></div>
              <h3>AgentArk <span className={styles.developmentBadge}>开发中</span></h3>
              <p className={styles.projectTagline}>从 Agent 代码，走向可管理的应用。</p>
              <p className={styles.projectDescription}>面向 Java 生态的 AI Agent 应用平台。基于 AgentScope Java，探索 Agent 的构建、版本管理、运行与治理，把后端工程实践带到 AI 应用的完整生命周期。</p>
              <ul aria-label="AgentArk 特点" className={styles.tags}><li>Java</li><li>AgentScope</li><li>应用生命周期</li></ul>
              <a className={styles.cardLink} href={`${github}/agentark`} rel="noreferrer" target="_blank">了解 AgentArk <ArrowUpRight aria-hidden size={22} /></a>
            </article>
          </div>
          <p className={styles.projectFootnote}><GithubLogo aria-hidden size={16} /> 项目介绍、代码与最新进展，都在各自的 GitHub 仓库里。</p>
        </div>
      </section>
      <section aria-labelledby="principles-title" className={styles.principles}>
        <div className="container">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>做工具时，我在意什么 <span className={styles.eyebrowEnglish}>BUILT WITH INTENTION</span></p><h2 id="principles-title">有用，也值得长久使用。</h2></div><p>技术是起点，使用体验是落点。</p></div>
          <div className={styles.principleGrid}>{principles.map(({ number, icon: Icon, title, text }) => (
            <article key={number}><div className={styles.principleTop}><Icon aria-hidden size={28} weight="light" /><span>{number}</span></div><h3>{title}</h3><p>{text}</p></article>
          ))}</div>
        </div>
      </section>
      <section aria-labelledby="connect-title" className={`${styles.connect} container`} id="connect">
        <div className={styles.connectIdentity}><Image alt="" aria-hidden height={64} loading="eager" src="/assets/about/refinex-avatar.png" width={64} /><span>屏幕的另一边，<br />是一个真实的开发者。</span></div>
        <p className={styles.eyebrow}>保持联系 <span className={styles.eyebrowEnglish}>LET’S TALK</span></p>
        <h2 id="connect-title">好想法，值得聊聊。</h2>
        <p className={styles.connectDescription}>关于产品的反馈、开源交流，或一个值得做的想法，<br className={styles.desktopBreak} />都欢迎写信给我。也可以在 GitHub 上，一起把工具打磨得更好。</p>
        <div className={styles.emailRow}><a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}<ArrowUpRight aria-hidden size={26} /></a><CopyEmailButton email={siteConfig.contactEmail} /></div>
        <a className={styles.quietLink} href={github} rel="noreferrer" target="_blank"><GithubLogo aria-hidden size={19} /> 在 GitHub 上找到我 <ArrowUpRight aria-hidden size={15} /></a>
        <div className={styles.signoff}><span>感谢你，愿意了解这些工具背后的人。</span><span className={styles.signature}>Refinex</span></div>
      </section>
    </div>
  );
}
