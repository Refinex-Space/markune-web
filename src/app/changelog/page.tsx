import type { Metadata } from "next";
import Image from "next/image";
import { CallToAction } from "@/components/site/CallToAction";
import { PageHero } from "@/components/site/PageHero";
import { changelogEntries } from "@/content/changelog";

export const metadata: Metadata = { title: "Changelog", description: "Every improvement, update, and new feature — as it ships." };

export default function ChangelogPage() {
  return (
    <>
      <PageHero title="What's new in Flowline." description="Every improvement, update, and new feature — as it ships." variant="changelog">
        <a className="button button--primary" href="/contact/">Subscribe to updates</a>
      </PageHero>
      <section className="changelog-section">
        <div className="container changelog-list">
          {changelogEntries.map((entry) => <article className="changelog-entry" key={entry.title}><aside><span className={`status-badge status-badge--${entry.status.toLowerCase()}`}>{entry.status}</span><time>{entry.date}</time></aside><div className="changelog-content"><div className="changelog-image"><picture><source media="(max-width: 809px)" srcSet={entry.mobileImage} /><source media="(max-width: 1199px)" srcSet={entry.tabletImage} /><Image alt="" fill sizes="(max-width: 809px) 100vw, 700px" src={entry.image} /></picture></div><h2>{entry.title}</h2>{entry.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article>)}
        </div>
      </section>
      <CallToAction />
    </>
  );
}
