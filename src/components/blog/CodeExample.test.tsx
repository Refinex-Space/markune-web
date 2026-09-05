import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CodeExample } from "./CodeExample";

describe("CodeExample", () => {
  afterEach(() => vi.restoreAllMocks());
  it("copies multiline source without changing whitespace", async () => {
    const user = userEvent.setup();
    const write = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
    const content = "# 示例\n\n- [ ] 一项任务";
    render(<CodeExample content={content} label="Markdown 示例" language="Markdown" />);
    await user.click(screen.getByRole("button", { name: "复制Markdown 示例" }));
    expect(write).toHaveBeenCalledWith(content);
    expect(screen.getByRole("status")).toHaveTextContent("已复制");
  });
  it("offers a manual fallback when clipboard access is denied", async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new Error("denied"));
    render(<CodeExample content="git status" label="Git 示例" language="Shell" />);
    await user.click(screen.getByRole("button", { name: "复制Git 示例" }));
    expect(screen.getByRole("status")).toHaveTextContent("无法复制，请选中示例手动复制。");
  });
});
