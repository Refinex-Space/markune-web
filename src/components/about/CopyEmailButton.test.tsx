import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CopyEmailButton } from "./CopyEmailButton";

describe("CopyEmailButton", () => {
  afterEach(() => vi.restoreAllMocks());

  it("copies the email and announces success", async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
    render(<CopyEmailButton email="refinexcn@gmail.com" />);

    await user.click(screen.getByRole("button", { name: "复制邮箱地址" }));

    expect(writeText).toHaveBeenCalledWith("refinexcn@gmail.com");
    expect(screen.getByRole("status")).toHaveTextContent("已复制");
    expect(screen.getByRole("button", { name: "邮箱已复制" })).toBeInTheDocument();
  });

  it("offers manual copying on clipboard failure and allows retry", async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText")
      .mockRejectedValueOnce(new Error("Clipboard access denied"))
      .mockResolvedValue();
    render(<CopyEmailButton email="refinexcn@gmail.com" />);

    await user.click(screen.getByRole("button", { name: "复制邮箱地址" }));
    expect(screen.getByRole("status")).toHaveTextContent("无法复制，请选择邮箱文字手动复制。");

    await user.click(screen.getByRole("button", { name: "复制邮箱地址" }));
    expect(writeText).toHaveBeenCalledTimes(2);
    expect(screen.getByRole("status")).toHaveTextContent("已复制");
  });
});
