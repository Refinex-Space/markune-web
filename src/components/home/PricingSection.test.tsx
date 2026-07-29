import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { PricingSection } from "./PricingSection";

describe("PricingSection", () => {
  it("switches between exact monthly and yearly prices", async () => {
    const user = userEvent.setup();
    render(<PricingSection />);
    expect(screen.getByTestId("price-starter")).toHaveTextContent("$9");
    expect(screen.getByTestId("price-pro")).toHaveTextContent("$15");
    expect(screen.getByTestId("price-business")).toHaveTextContent("$35");
    expect(screen.getAllByRole("link", { name: /下载/ })).toHaveLength(3);
    expect(screen.getAllByRole("link", { name: /下载/ }).every((link) => link.getAttribute("href") === "/download")).toBe(true);
    await user.click(screen.getByRole("button", { name: "年付" }));
    expect(screen.getByTestId("price-starter")).toHaveTextContent("$7");
    expect(screen.getByTestId("price-pro")).toHaveTextContent("$12");
    expect(screen.getByTestId("price-business")).toHaveTextContent("$28");
  });
});
