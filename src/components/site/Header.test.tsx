import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  it("toggles the mobile navigation and closes with Escape", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const button = screen.getByRole("button", { name: "Open navigation menu" });
    expect(screen.getByRole("link", { name: /Download/ })).toHaveAttribute("href", "/download");
    await user.click(button);
    expect(screen.getByRole("navigation", { name: "Mobile navigation" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Mobile navigation" }).querySelector('a[href="/download"]')).toHaveTextContent("Download");
    expect(screen.getByRole("button", { name: "Close navigation menu" })).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("navigation", { name: "Mobile navigation" })).not.toBeInTheDocument();
  });
});
