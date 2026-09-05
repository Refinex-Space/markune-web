import type { BlogPost, GuideSummary } from "@/types/site";

export function getGuideReadTime(post: BlogPost) {
  const content = post.blocks.map((block) => [
    block.heading, ...(block.paragraphs ?? []), ...(block.bullets ?? []),
    ...(block.steps ?? []).flatMap((step) => [step.title, step.text]),
    ...(block.table?.rows.flat() ?? []), block.code?.content ?? "", block.note?.text ?? "",
  ].join(" ")).join(" ");
  return Math.max(3, Math.ceil(content.length / 350));
}

export function toGuideSummary(post: BlogPost): GuideSummary {
  return { slug: post.slug, title: post.title, excerpt: post.excerpt, category: post.category, readTime: getGuideReadTime(post) };
}

export function filterGuides(guides: GuideSummary[], query: string, category: string) {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return guides.filter((guide) => {
    const text = `${guide.title} ${guide.excerpt} ${guide.category}`.toLocaleLowerCase();
    return (category === "全部" || guide.category === category) && words.every((word) => text.includes(word));
  });
}
