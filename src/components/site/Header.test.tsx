import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  it("toggles the mobile navigation and closes with Escape", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const button = screen.getByRole("button", { name: "打开导航菜单" });
    expect(screen.getByRole("link", { name: /下载/ })).toHaveAttribute("href", "/download");
    expect(screen.getByRole("link", { name: "在 GitHub 上查看 Markune" })).toHaveAttribute("href", "https://github.com/Refinex-Space/markune");
    await user.click(button);
    const mobileNav = screen.getByRole("navigation", { name: "移动端导航" });
    expect(mobileNav).toBeInTheDocument();
    expect(within(mobileNav).getByRole("link", { name: "下载" })).toHaveAttribute("href", "/download");
    expect(within(mobileNav).getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/Refinex-Space/markune");
    expect(screen.getByRole("button", { name: "关闭导航菜单" })).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("navigation", { name: "移动端导航" })).not.toBeInTheDocument();
  });
});
