import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FaqSection } from "./FaqSection";

describe("FaqSection", () => {
  it("opens one answer and can collapse it", async () => {
    const user = userEvent.setup();
    render(<FaqSection />);
    const trigger = screen.getByRole("button", { name: "Is there a free trial?" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/Every plan comes with a 14-day free trial/)).toBeVisible();
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
