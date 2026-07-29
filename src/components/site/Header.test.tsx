import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  it("toggles the mobile navigation and closes with Escape", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const button = screen.getByRole("button", { name: "打开导航菜单" });
    expect(screen.getByRole("link", { name: /下载/ })).toHaveAttribute("href", "/download");
    await user.click(button);
    expect(screen.getByRole("navigation", { name: "移动端导航" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "移动端导航" }).querySelector('a[href="/download"]')).toHaveTextContent("下载");
    expect(screen.getByRole("button", { name: "关闭导航菜单" })).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("navigation", { name: "移动端导航" })).not.toBeInTheDocument();
  });
});
