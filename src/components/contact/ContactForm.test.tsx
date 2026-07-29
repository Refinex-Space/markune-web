import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  it("shows required errors without sending data", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: "发送消息" }));
    expect(screen.getAllByText("此项为必填项。")).toHaveLength(4);
    expect(screen.getByText("请选择咨询主题。")).toBeVisible();
  });

  it("submits valid fields into the local success state", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText("名字*"), "小明");
    await user.type(screen.getByLabelText("姓氏*"), "张");
    await user.type(screen.getByLabelText("电子邮箱*"), "ava@example.com");
    await user.click(screen.getByRole("combobox", { name: "咨询主题*" }));
    await user.click(screen.getByRole("option", { name: "一般咨询" }));
    await user.type(screen.getByLabelText("留言内容*"), "我想预约一次演示。");
    await user.click(screen.getByRole("button", { name: "发送消息" }));
    expect(await screen.findByRole("status", {}, { timeout: 2_000 })).toHaveTextContent("已收到你的请求！");
  });

  it("rejects an invalid email address", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText("名字*"), "小明");
    await user.type(screen.getByLabelText("姓氏*"), "张");
    await user.type(screen.getByLabelText("电子邮箱*"), "not-an-email");
    await user.click(screen.getByRole("combobox", { name: "咨询主题*" }));
    await user.click(screen.getByRole("option", { name: "一般咨询" }));
    await user.type(screen.getByLabelText("留言内容*"), "我想预约一次演示。");
    await user.click(screen.getByRole("button", { name: "发送消息" }));
    expect(screen.getByText("请输入有效的电子邮箱地址。")).toBeVisible();
  });
});
