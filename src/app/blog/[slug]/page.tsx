import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Hexagon } from "@phosphor-icons/react/dist/ssr";
import { BlogCard } from "@/components/blog/BlogCard";
import { CallToAction } from "@/components/site/CallToAction";
import { blogPosts, getBlogPost } from "@/content/blog";

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: siteUrl ? [new URL(post.image, siteUrl)] : undefined, type: "article" },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const hasCompactRelatedSection = [
    "how-to-run-a-project-review-that-people-actually-find-useful",
    "the-async-first-playbook-for-distributed-teams",
    "why-your-team-keeps-missing-deadlines",
  ].includes(post.slug);
  const hasAutomationRelatedSection = post.slug === "workflow-automation-start-with-these-5-rules";

  return (
    <>
      <article className="article-page">
        <header className="container article-header">
          <p className="eyebrow">{post.category}</p>
          <h1>{post.title}</h1>
          <p className="article-excerpt">{post.excerpt}</p>
        </header>
        <div className="container article-image">
          <picture>
            <source media="(max-width: 809px)" srcSet={post.cardImage} />
            <source media="(max-width: 1199px)" srcSet={post.tabletImage} />
            <Image alt="" fill priority sizes="100vw" src={post.image} />
          </picture>
        </div>
        <div className="article-content-layout">
          <div className="article-meta"><span>作者：<strong>{post.author}</strong></span><span>{post.date}</span><span>{post.readTime}</span></div>
          <div className="article-body">
            {post.blocks.map((block) => (
              <section className="scroll-reveal" key={block.heading}>
                <h2>{block.heading}</h2>
                {block.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
          </div>
        </div>
      </article>
      <section className={`section related-section${hasCompactRelatedSection ? " related-section--compact" : ""}${hasAutomationRelatedSection ? " related-section--automation" : ""}`}>
        <div className="container section-heading scroll-reveal"><p className="eyebrow"><Hexagon aria-hidden size={12} />更多文章</p><h2>让团队协作更高效的思考。</h2></div>
        <div className="container blog-grid scroll-reveal">{related.map((item) => <BlogCard key={item.slug} post={item} />)}</div>
      </section>
      <CallToAction />
    </>
  );
}
