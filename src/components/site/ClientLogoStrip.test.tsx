import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ClientLogoStrip } from "./ClientLogoStrip";

describe("ClientLogoStrip", () => {
  it("renders the Madora technology stack without changing the default customer strip", () => {
    const { container, rerender } = render(<ClientLogoStrip showMetric showTechnologyStack />);

    expect(screen.getByRole("region", { name: "Madora 技术栈" })).toHaveTextContent("Madora 基于以下核心技术栈构建");
    const technologyLabels = Array.from(container.querySelectorAll("[data-technology]"), (item) => item.getAttribute("data-technology"));
    expect(technologyLabels).toEqual([
      "Next.js", "React", "TypeScript", "Tauri", "Rust", "Tailwind CSS", "Markweave", "Codex",
      "Next.js", "React", "TypeScript", "Tauri", "Rust", "Tailwind CSS", "Markweave", "Codex",
    ]);

    rerender(<ClientLogoStrip showMetric />);
    expect(screen.getByRole("region", { name: "信任 Madora 的客户" })).toHaveTextContent("已有 240 万项任务通过 Madora 完成");
  });
});
