import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CallToAction } from "./CallToAction";

describe("CallToAction", () => {
  it("renders the local-first Markune message, download link, and workspace preview", () => {
    render(<CallToAction />);

    expect(screen.getByRole("heading", { name: "让工作回到你的文件里。" })).toBeVisible();
    expect(screen.getByText("写作、日程、图谱、画板与 Codex 协作，都围绕本地 Markdown 自然连接。")).toBeVisible();
    expect(screen.getByRole("link", { name: /下载/ })).toHaveAttribute("href", "/download");
    expect(screen.getByRole("img", { name: "Markune 本地 Markdown 工作区预览" })).toHaveAttribute(
      "src",
      expect.stringContaining("markune-workspace-hero.png"),
    );
  });
});
