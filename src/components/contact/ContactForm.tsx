"use client";

import { CaretDown, Check, CircleNotch } from "@phosphor-icons/react";
import { Checkbox, Select } from "radix-ui";
import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "success";

const subjects = ["General inquiry", "Pricing & plans", "Technical support", "Partnership", "Other"];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [subject, setSubject] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors: Record<string, string> = {};
    for (const field of ["firstName", "lastName", "email", "message"] as const) {
      if (!String(form.get(field) ?? "").trim()) nextErrors[field] = "This field is required.";
    }
    const email = String(form.get("email") ?? "");
    if (email && !/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!subject) nextErrors.subject = "Please select a subject.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStatus("sending");
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="contact-success" role="status">
        <span><Check aria-hidden size={30} weight="bold" /></span>
        <h2>Request received!</h2>
        <p>We&apos;ll review your request and get back to you shortly.</p>
        <button className="button button--secondary" onClick={() => setStatus("idle")} type="button">Send another message</button>
      </div>
    );
  }

  return (
    <form className="contact-form" noValidate onSubmit={onSubmit}>
      <div className="form-row">
        <FormField error={errors.firstName} label="First name*" name="firstName" />
        <FormField error={errors.lastName} label="Last name*" name="lastName" />
      </div>
      <FormField error={errors.email} label="Email*" name="email" type="email" />
      <div className="field-group">
        <label id="subject-label">Subject*</label>
        <Select.Root onValueChange={setSubject} value={subject}>
          <Select.Trigger aria-labelledby="subject-label" className={`select-trigger ${errors.subject ? "field-error" : ""}`}>
            <Select.Value placeholder="Select…" />
            <Select.Icon><CaretDown aria-hidden size={18} /></Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="select-content" position="popper" sideOffset={5}>
              <Select.Viewport>{subjects.map((item) => <Select.Item className="select-item" key={item} value={item}><Select.ItemText>{item}</Select.ItemText><Select.ItemIndicator><Check aria-hidden size={16} /></Select.ItemIndicator></Select.Item>)}</Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        {errors.subject ? <span className="error-message">{errors.subject}</span> : null}
      </div>
      <div className="field-group">
        <label htmlFor="message">Your message*</label>
        <textarea aria-invalid={Boolean(errors.message)} className={errors.message ? "field-error" : ""} id="message" name="message" rows={6} />
        {errors.message ? <span className="error-message">{errors.message}</span> : null}
      </div>
      <label className="checkbox-label">
        <Checkbox.Root className="checkbox-root" name="newsletter" value="yes"><Checkbox.Indicator><Check aria-hidden size={15} weight="bold" /></Checkbox.Indicator></Checkbox.Root>
        <span>I&apos;d like to receive updates and news via email.</span>
      </label>
      <button className="button button--primary contact-submit" disabled={status === "sending"} type="submit">
        {status === "sending" ? <><CircleNotch aria-hidden className="spinner" size={19} />Sending…</> : "Send message"}
      </button>
      <p className="form-legal">By submitting, you agree to our <a href="/legal/terms-of-service/">Terms of Service</a> and <a href="/legal/privacy-policy/">Privacy Policy</a>.</p>
    </form>
  );
}

function FormField({ error, label, name, type = "text" }: { error?: string; label: string; name: string; type?: string }) {
  const placeholders: Record<string, string> = { firstName: "Jane", lastName: "Smith", email: "jane@example.com" };
  return (
    <div className="field-group">
      <label htmlFor={name}>{label}</label>
      <input aria-invalid={Boolean(error)} className={error ? "field-error" : ""} id={name} name={name} placeholder={placeholders[name]} type={type} />
      {error ? <span className="error-message">{error}</span> : null}
    </div>
  );
}
