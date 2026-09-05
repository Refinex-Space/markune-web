import type { BlogPost } from "@/types/site";
import { startingGuides } from "./guides/starting";
import { workflowGuides } from "./guides/workflows";
import { advancedGuides } from "./guides/advanced";

export const blogPosts: BlogPost[] = [...startingGuides, ...workflowGuides, ...advancedGuides];

export const legacyBlogSlugs: Record<string, string> = {
  "what-we-shipped-in-q1": "getting-started",
  "the-real-cost-of-context-switching": "organize-and-search",
  "workflow-automation-start-with-these-5-rules": "inbox-and-daily",
  "how-to-run-a-project-review-that-people-actually-find-useful": "markdown-writing",
  "the-async-first-playbook-for-distributed-teams": "git-sync-and-backup",
  "why-your-team-keeps-missing-deadlines": "canvas-and-graph",
};

export function getBlogPost(slug: string) {
  const canonical = Object.hasOwn(legacyBlogSlugs, slug) ? legacyBlogSlugs[slug] : slug;
  return blogPosts.find((post) => post.slug === canonical);
}

export { getGuideReadTime, toGuideSummary, filterGuides } from "./guide-utils";
