import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  it("shows required errors without sending data", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(screen.getAllByText("This field is required.")).toHaveLength(4);
    expect(screen.getByText("Please select a subject.")).toBeVisible();
  });

  it("submits valid fields into the local success state", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText("First name*"), "Ava");
    await user.type(screen.getByLabelText("Last name*"), "Chen");
    await user.type(screen.getByLabelText("Email*"), "ava@example.com");
    await user.click(screen.getByRole("combobox", { name: "Subject*" }));
    await user.click(screen.getByRole("option", { name: "General inquiry" }));
    await user.type(screen.getByLabelText("Your message*"), "I would like a demo.");
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(await screen.findByRole("status", {}, { timeout: 2_000 })).toHaveTextContent("Request received!");
  });

  it("rejects an invalid email address", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText("First name*"), "Ava");
    await user.type(screen.getByLabelText("Last name*"), "Chen");
    await user.type(screen.getByLabelText("Email*"), "not-an-email");
    await user.click(screen.getByRole("combobox", { name: "Subject*" }));
    await user.click(screen.getByRole("option", { name: "General inquiry" }));
    await user.type(screen.getByLabelText("Your message*"), "I would like a demo.");
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(screen.getByText("Enter a valid email address.")).toBeVisible();
  });
});
