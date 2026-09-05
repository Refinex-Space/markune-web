import type { Metadata } from "next";
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/site/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { changelogEntries, formatReleaseDate, releaseGuidance } from "@/content/changelog";
import styles from "./changelog.module.css";

export const metadata: Metadata = {
  title: "更新日志",
  description: "查看 Markune 0.2.4 与 0.2.3 的正式发布记录、大文档加载修复、编辑器更新与升级说明。",
};

export default function ChangelogPage() {
  return (
    <div className={styles.page}>
      <PageHero title="Markune 有哪些新变化。" description="记录正式发布的改进，让每一次更新都有迹可循。" variant="changelog">
        <a className="button button--primary" href={releaseGuidance.releasesHref} rel="noreferrer" target="_blank">查看 GitHub 发布记录</a>
      </PageHero>
      <div className={styles.list}>
        <section aria-label="版本更新记录">
          {changelogEntries.map((entry) => (
            <article aria-labelledby={`version-${entry.version}`} className={styles.entry} id={`v${entry.version}`} key={entry.version}>
              <div className={styles.meta}>
                <span className={styles.version}>v{entry.version}</span>
                <time dateTime={entry.publishedAt}>{formatReleaseDate(entry.publishedAt)}</time>
                <span className={styles.badge}>{entry.status}</span>
              </div>
              <div className={styles.content}>
                <h2 id={`version-${entry.version}`}>{entry.title}</h2>
                <p className={styles.summary}>{entry.summary}</p>
                {entry.changes.length > 0 ? <ul className={styles.changes}>{entry.changes.map((change) => <li key={change.title}><h3>{change.title}</h3><p>{change.description}</p></li>)}</ul> : null}
                {entry.notice ? <aside aria-label={`v${entry.version} 已知限制`} className={styles.notice}><h3>已知限制</h3><p>{entry.notice}</p></aside> : null}
                <a className={styles.releaseLink} href={entry.releaseHref} rel="noreferrer" target="_blank">查看 v{entry.version} 完整发布说明 <ArrowUpRight aria-hidden size={15} /></a>
              </div>
            </article>
          ))}
        </section>
        <section aria-labelledby="upgrade-title" className={styles.upgrade}>
          <h2 id="upgrade-title">更新前，记得保存当前工作。</h2>
          <p>{releaseGuidance.upgrade}</p>
          <ul aria-label="这两个版本支持的平台" className={styles.platforms}>{releaseGuidance.platforms.map((platform) => <li key={platform}>{platform}</li>)}</ul>
          <div className={styles.actions}>
            <ButtonLink href="/download/">下载 Markune <ArrowRight aria-hidden size={16} /></ButtonLink>
            <a className={styles.releaseLink} href={releaseGuidance.releasesHref} rel="noreferrer" target="_blank">查看所有 GitHub Releases <ArrowUpRight aria-hidden size={15} /></a>
          </div>
        </section>
      </div>
    </div>
  );
}
