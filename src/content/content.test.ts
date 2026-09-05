import { describe, expect, it } from "vitest";
import { assets } from "@/content/site";
import { blogPosts, getBlogPost, legacyBlogSlugs, toGuideSummary, filterGuides } from "@/content/blog";

describe("guide content and routing", () => {
  it("resolves all guides and keeps the old article URLs readable", () => {
    expect(blogPosts).toHaveLength(8);
    expect(new Set(blogPosts.map((post) => post.slug)).size).toBe(8);
    for (const post of blogPosts) expect(getBlogPost(post.slug)).toEqual(post);
    for (const [legacy, canonical] of Object.entries(legacyBlogSlugs)) {
      expect(getBlogPost(legacy)?.slug).toBe(canonical);
    }
    expect(getBlogPost("missing")).toBeUndefined();
    expect(getBlogPost("toString")).toBeUndefined();
  });

  it("keeps contents targets, related guides and tables internally consistent", () => {
    for (const post of blogPosts) {
      expect(post.blocks.length).toBeGreaterThanOrEqual(5);
      expect(new Set(post.blocks.map((block) => block.id)).size).toBe(post.blocks.length);
      for (const slug of post.related) {
        expect(getBlogPost(slug)).toBeDefined();
        expect(slug).not.toBe(post.slug);
      }
      for (const block of post.blocks) {
        expect(block.id).toMatch(/^[a-z][a-z0-9-]*$/);
        expect(["guide-body", "article-top"]).not.toContain(block.id);
        for (const row of block.table?.rows ?? []) expect(row).toHaveLength(block.table!.headers.length);
      }
    }
  });

  it("combines keyword search with categories and handles an empty result", () => {
    const summaries = blogPosts.map(toGuideSummary);
    expect(filterGuides(summaries, "  gIt 同步  ", "进阶能力").map((post) => post.slug)).toEqual(["git-sync-and-backup"]);
    expect(filterGuides(summaries, "gIt", "开始使用")).toEqual([]);
    expect(filterGuides(summaries, "没有这个功能", "全部")).toEqual([]);
    expect(filterGuides(summaries, "  ", "全部")).toHaveLength(8);
  });

  it("keeps every declared asset rooted", () => {
    for (const path of Object.values(assets)) expect(path).toMatch(/^\/assets\//);
  });
});
