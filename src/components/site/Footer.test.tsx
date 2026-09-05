import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

describe("Footer navigation", () => {
  it("routes footer links to the requested sections and pages", () => {
    render(<Footer />);
    const footer = within(screen.getByRole("contentinfo"));
    const destinations = {
      功能: "/#benefits",
      定价: "/#pricing",
      下载: "/download",
      更新日志: "/changelog",
      博客: "/blog",
      常见问题: "/#faq",
      关于我: "/about",
      联系开发者: "mailto:refinexcn@gmail.com",
      隐私政策: "/legal/privacy-policy",
      服务条款: "/legal/terms-of-service",
    };
    for (const [name, href] of Object.entries(destinations)) {
      expect(footer.getByRole("link", { name, exact: true })).toHaveAttribute("href", href);
    }
    expect(footer.queryByRole("link", { name: "优势" })).not.toBeInTheDocument();
    expect(footer.queryByRole("link", { name: "关于开发者" })).not.toBeInTheDocument();
  });
});
