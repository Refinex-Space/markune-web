import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LinkSimple } from "@phosphor-icons/react/dist/ssr";
import { ArticleContents } from "@/components/blog/ArticleContents";
import { CodeExample } from "@/components/blog/CodeExample";
import { GuideImage } from "@/components/blog/GuideImage";
import { blogPosts, getBlogPost, getGuideReadTime, legacyBlogSlugs } from "@/content/blog";
import { siteConfig } from "@/content/site";
import styles from "@/components/blog/guides.module.css";

function TitleText({ text }: { text: string }) {
  return text.split(/(?<=[，：])/).map((part, index) => <span className={styles.titlePhrase} key={index}>{part}</span>);
}

export function generateStaticParams() {
  return [...blogPosts.map(({ slug }) => ({ slug })), ...Object.keys(legacyBlogSlugs).map((slug) => ({ slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: siteUrl ? { canonical: new URL(`/blog/${post.slug}/`, siteUrl) } : undefined,
    openGraph: { title: post.title, description: post.excerpt, type: "article", modifiedTime: post.date, authors: [post.author] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const related = post.related.map(getBlogPost).filter((item) => item !== undefined);
  const date = new Intl.DateTimeFormat("zh-CN", { timeZone: "Asia/Shanghai", year: "numeric", month: "long", day: "numeric" }).format(new Date(post.date));

  return (
    <article className={styles.articlePage} id="article-top">
      <div className={styles.shell}>
        <nav aria-label="面包屑导航" className={styles.breadcrumb}><Link href="/blog/">全部使用指南</Link><span aria-hidden>/</span><span>{post.category}</span></nav>
        <header className={styles.articleHeader}>
          <p className={styles.eyebrow}>{post.category}</p><h1><TitleText text={post.title} /></h1><p className={styles.articleExcerpt}>{post.excerpt}</p>
          <div className={styles.articleMeta}><span><Image alt="" aria-hidden height={32} src="/assets/about/refinex-avatar.png" width={32} />{post.author}</span><time dateTime={post.date}>更新于 {date}</time><span>约 {getGuideReadTime(post)} 分钟</span><span>适用版本 {post.version}</span></div>
        </header>
        <div className={styles.articleLayout}>
          <ArticleContents key={post.slug} sections={post.blocks.map(({ id, heading }) => ({ id, heading }))} />
          <div className={styles.body}>
            <div id="guide-body">
              <div className={styles.overview}><div><h2>读完这篇，你可以</h2><p>{post.outcome}</p></div><div><h2>开始之前</h2><p>{post.prerequisites}</p></div></div>
              {post.blocks.map((block) => (
                <section className={styles.block} id={block.id} key={block.id}>
                  <h2 aria-label={block.heading}><span><TitleText text={block.heading} /></span><a aria-label={`链接到：${block.heading}`} className={styles.headingLink} href={`#${block.id}`}><LinkSimple aria-hidden size={17} /></a></h2>
                  {block.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {block.steps ? <ol className={styles.steps}>{block.steps.map((step, index) => <li key={step.title}><span aria-hidden className={styles.stepNumber}>{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol> : null}
                  {block.bullets ? <ul className={styles.bullets}>{block.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
                  {block.table ? <><div aria-label={block.table.caption} className={styles.tableScroll} role="region" tabIndex={0}><table className={styles.table}><caption>{block.table.caption}</caption><thead><tr>{block.table.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{block.table.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={index} scope="row">{cell}</th> : <td key={index}>{cell}</td>)}</tr>)}</tbody></table></div><span className={styles.tableHint}>表格可左右滑动查看</span></> : null}
                  {block.code ? <CodeExample {...block.code} /> : null}
                  {block.image ? <GuideImage {...block.image} /> : null}
                  {block.note ? <aside className={styles.note} data-tone={block.note.tone ?? "tip"}><h3>{block.note.title}</h3><p>{block.note.text}</p></aside> : null}
                </section>
              ))}
            </div>
            <nav aria-label="继续阅读" className={styles.continue}><p>接下来，继续完善你的工作方式。</p><div className={styles.continueLinks}>{related.map((item) => <Link href={`/blog/${item.slug}/`} key={item.slug}><span>{item.category} →</span><strong>{item.title}</strong></Link>)}</div></nav>
            <div className={styles.articleEnd}><Link href="/blog/">← 返回全部使用指南</Link><a href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(`Markune 使用指南反馈：${post.title}`)}`}>步骤有疑问？联系开发者</a></div>
          </div>
        </div>
      </div>
    </article>
  );
}
