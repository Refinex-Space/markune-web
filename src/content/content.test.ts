import { describe, expect, it } from "vitest";
import { assets } from "@/content/site";
import { blogPosts, getBlogPost } from "@/content/blog";

describe("typed content mapping", () => {
  it("maps all six article slugs", () => {
    expect(blogPosts).toHaveLength(6);
    expect(new Set(blogPosts.map((post) => post.slug)).size).toBe(6);
    for (const post of blogPosts) expect(getBlogPost(post.slug)).toEqual(post);
    expect(getBlogPost("missing")).toBeUndefined();
  });

  it("keeps every declared asset rooted", () => {
    for (const path of Object.values(assets)) expect(path).toMatch(/^\/assets\//);
  });
});
