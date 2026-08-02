import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PricingSection } from "./PricingSection";

describe("PricingSection", () => {
  it("renders the free, perpetual, and disabled custom plans", () => {
    render(<PricingSection />);
    expect(screen.getByTestId("price-starter")).toHaveTextContent("¥0");
    expect(screen.getByTestId("price-pro")).toHaveTextContent("¥89");
    expect(screen.getByTestId("price-custom")).toHaveTextContent("—");
    const downloadLinks = screen.getAllByRole("link", { name: /下载/ });
    expect(downloadLinks).toHaveLength(2);
    expect(downloadLinks.every((link) => link.getAttribute("href") === "/download")).toBe(true);
    expect(screen.getByRole("button", { name: "暂未开放" })).toBeDisabled();
    expect(screen.getByText("下载后可开启 14 天免费试用")).toBeVisible();
    expect(screen.getByText("画板与图谱")).toBeVisible();
  });
});
