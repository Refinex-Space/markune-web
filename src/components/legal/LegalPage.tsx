import { CallToAction } from "@/components/site/CallToAction";
import { PageHero } from "@/components/site/PageHero";

interface LegalSection { heading: string; paragraphs: string[]; bullets?: string[]; trailing?: string }

export function LegalPage({ title, date, sections }: { title: string; date: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero compact title={title}><time>{date}</time></PageHero>
      <article className="container legal-body">
        {sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}{section.trailing ? <p>{section.trailing}</p> : null}</section>)}
      </article>
      <CallToAction />
    </>
  );
}
