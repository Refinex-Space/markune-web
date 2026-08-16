import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PricingSection } from "./PricingSection";

describe("PricingSection", () => {
  it("renders free open-source plans with a struck perpetual list price", () => {
    render(<PricingSection />);
    expect(screen.getByTestId("price-starter")).toHaveTextContent("¥0");
    expect(screen.getByTestId("price-pro")).toHaveTextContent("¥0");
    expect(screen.getByLabelText("原价 ¥89，现价 ¥0")).toBeVisible();
    expect(screen.getByTestId("price-custom")).toHaveTextContent("—");
    expect(screen.getByText("开源免费，按需选择能力。")).toBeVisible();
    expect(screen.getByText(/现开源免费并持续更新/)).toBeVisible();
    const downloadLinks = screen.getAllByRole("link", { name: /下载|免费下载/ });
    expect(downloadLinks).toHaveLength(2);
    expect(downloadLinks.every((link) => link.getAttribute("href") === "/download")).toBe(true);
    expect(screen.getByRole("button", { name: "暂未开放" })).toBeDisabled();
    expect(screen.getByText("Markune 目前开源免费；所有可用方案均从下载页开始。")).toBeVisible();
    expect(screen.getByText("画板与图谱")).toBeVisible();
  });
});
