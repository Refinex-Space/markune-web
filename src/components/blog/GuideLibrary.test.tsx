import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { GuideLibrary } from "./GuideLibrary";
import { blogPosts, toGuideSummary } from "@/content/blog";

describe("GuideLibrary", () => {
  it("filters, reports an empty result and restores the full library", async () => {
    const user = userEvent.setup();
    render(<GuideLibrary guides={blogPosts.map(toGuideSummary)} />);
    await user.click(screen.getByRole("button", { name: "进阶能力" }));
    expect(screen.getByRole("status")).toHaveTextContent("找到 3 篇指南");
    const search = screen.getByRole("searchbox", { name: "搜索使用指南" });
    await user.type(search, "Git");
    expect(screen.getByRole("link", { name: "用 Git 同步工作区，保留独立备份" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("找到 1 篇指南");
    await user.clear(search);
    await user.type(search, "不存在的主题");
    expect(screen.getByText("暂时没有匹配的指南")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "重置筛选" }));
    expect(search).toHaveValue("");
    expect(screen.getByRole("status")).toHaveTextContent("找到 8 篇指南");
  });
});
