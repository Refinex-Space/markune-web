import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { CallToAction } from "@/components/site/CallToAction";
import { PageHero } from "@/components/site/PageHero";
import { blogPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Ideas for better teamwork",
  description: "Practical tips on productivity, teamwork, and building better workflows.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow="BLOG" title="Ideas for better teamwork." description="Practical tips on productivity, teamwork, and building better workflows." variant="blog" />
      <section className="blog-list-section">
        <div className="container blog-grid blog-grid--all">{blogPosts.map((post) => <BlogCard key={post.slug} post={post} />)}</div>
      </section>
      <CallToAction />
    </>
  );
}
