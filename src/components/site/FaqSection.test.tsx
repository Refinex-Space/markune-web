import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FaqSection } from "./FaqSection";

describe("FaqSection", () => {
  it("opens the system mail client from the support prompt", () => {
    render(<FaqSection />);

    expect(screen.getByRole("img", { name: "Markune 支持团队" })).toHaveAttribute("src", expect.stringContaining("markune-support-avatar.png"));
    expect(screen.getByRole("link", { name: "联系我们" })).toHaveAttribute("href", "mailto:refinexcn@gmail.com");
  });

  it("opens one answer and can collapse it", async () => {
    const user = userEvent.setup();
    render(<FaqSection />);
    const trigger = screen.getByRole("button", { name: "我的文档保存在哪里？" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/Markune 将文档保存在你选择的本地工作区中/)).toBeVisible();
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
