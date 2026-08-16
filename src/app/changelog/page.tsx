import type { Metadata } from "next";
import Image from "next/image";
import { CallToAction } from "@/components/site/CallToAction";
import { PageHero } from "@/components/site/PageHero";
import { changelogEntries } from "@/content/changelog";

export const metadata: Metadata = { title: "更新日志", description: "记录 Markune 发布的每一项改进、更新与新功能。" };

export default function ChangelogPage() {
  return (
    <>
      <PageHero title="Markune 有哪些新变化。" description="记录每一项改进、更新与新功能的正式发布。" variant="changelog">
        <a className="button button--primary" href="/contact/">订阅更新</a>
      </PageHero>
      <section className="changelog-section">
        <div className="container changelog-list">
          {changelogEntries.map((entry) => <article className="changelog-entry" key={entry.title}><aside><span className={`status-badge status-badge--${entry.tone}`}>{entry.status}</span><time>{entry.date}</time></aside><div className="changelog-content"><div className="changelog-image"><picture><source media="(max-width: 809px)" srcSet={entry.mobileImage} /><source media="(max-width: 1199px)" srcSet={entry.tabletImage} /><Image alt="" fill sizes="(max-width: 809px) 100vw, 700px" src={entry.image} /></picture></div><h2>{entry.title}</h2>{entry.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article>)}
        </div>
      </section>
      <CallToAction />
    </>
  );
}
