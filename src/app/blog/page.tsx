import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { CallToAction } from "@/components/site/CallToAction";
import { PageHero } from "@/components/site/PageHero";
import { blogPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "让团队协作更高效的思考",
  description: "关于效率、团队协作和构建更好工作流的实用方法。",
};

export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow="博客" title="让团队协作更高效的思考。" description="关于效率、团队协作和构建更好工作流的实用方法。" variant="blog" />
      <section className="blog-list-section">
        <div className="container blog-grid blog-grid--all">{blogPosts.map((post) => <BlogCard key={post.slug} post={post} />)}</div>
      </section>
      <CallToAction />
    </>
  );
}
