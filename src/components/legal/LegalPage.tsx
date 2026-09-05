import Link from "next/link";
import type { LegalSection } from "@/content/legal";
import styles from "./legal.module.css";

interface LegalPageProps {
  title: string;
  date: string;
  sections: LegalSection[];
  summary: { title: string; text: string };
  related: { label: string; href: string };
}

export function LegalPage({ title, date, sections, summary, related }: LegalPageProps) {
  const [year, month, day] = date.split("-").map(Number);
  const contents = (
    <nav aria-label="本页目录" className={styles.toc}>
      {sections.map((section, index) => <a href={`#${section.id}`} key={section.id}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{section.heading}</a>)}
    </nav>
  );

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header} id="legal-top">
          <p className={styles.kicker}>MARKUNE / 使用与信任</p>
          <h1>{title}</h1>
          <div className={styles.meta}><span>更新日期：<time dateTime={date}>{year}年{month}月{day}日</time></span><Link href={related.href}>{related.label}</Link></div>
        </header>
        <div className={styles.layout}>
          <aside className={styles.sidebar}><p className={styles.sidebarTitle}>本页目录</p>{contents}</aside>
          <article className={styles.article} aria-label={title}>
            <details className={styles.mobileToc}><summary>浏览本页目录</summary>{contents}</details>
            <div className={styles.summary}><h2>{summary.title}</h2><p>{summary.text}</p></div>
            {sections.map((section, index) => (
              <section className={styles.section} id={section.id} key={section.id}>
                <h2><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
                {section.links ? <div className={styles.links}>{section.links.map((link) => <Link href={link.href} key={link.href} rel={link.href.startsWith("https://") ? "noreferrer" : undefined} target={link.href.startsWith("https://") ? "_blank" : undefined}>{link.label}</Link>)}</div> : null}
              </section>
            ))}
            <div className={styles.end}><span>感谢你阅读 Markune 的{title}。</span><a href="#legal-top">回到顶部 ↑</a></div>
          </article>
        </div>
      </div>
    </div>
  );
}
