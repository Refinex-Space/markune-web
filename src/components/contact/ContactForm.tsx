"use client";

import { CaretDown, Check, CircleNotch } from "@phosphor-icons/react";
import { Checkbox, Select } from "radix-ui";
import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "success";

const subjects = ["一般咨询", "定价与方案", "技术支持", "商务合作", "其他"];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [subject, setSubject] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors: Record<string, string> = {};
    for (const field of ["firstName", "lastName", "email", "message"] as const) {
      if (!String(form.get(field) ?? "").trim()) nextErrors[field] = "此项为必填项。";
    }
    const email = String(form.get("email") ?? "");
    if (email && !/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "请输入有效的电子邮箱地址。";
    if (!subject) nextErrors.subject = "请选择咨询主题。";
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
        <h2>已收到你的请求！</h2>
        <p>我们会尽快查看并回复你的消息。</p>
        <button className="button button--secondary" onClick={() => setStatus("idle")} type="button">再次发送消息</button>
      </div>
    );
  }

  return (
    <form className="contact-form" noValidate onSubmit={onSubmit}>
      <div className="form-row">
        <FormField error={errors.firstName} label="名字*" name="firstName" />
        <FormField error={errors.lastName} label="姓氏*" name="lastName" />
      </div>
      <FormField error={errors.email} label="电子邮箱*" name="email" type="email" />
      <div className="field-group">
        <label id="subject-label">咨询主题*</label>
        <Select.Root onValueChange={setSubject} value={subject}>
          <Select.Trigger aria-labelledby="subject-label" className={`select-trigger ${errors.subject ? "field-error" : ""}`}>
            <Select.Value placeholder="请选择…" />
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
        <label htmlFor="message">留言内容*</label>
        <textarea aria-invalid={Boolean(errors.message)} className={errors.message ? "field-error" : ""} id="message" name="message" rows={6} />
        {errors.message ? <span className="error-message">{errors.message}</span> : null}
      </div>
      <label className="checkbox-label">
        <Checkbox.Root className="checkbox-root" name="newsletter" value="yes"><Checkbox.Indicator><Check aria-hidden size={15} weight="bold" /></Checkbox.Indicator></Checkbox.Root>
        <span>我希望通过电子邮件接收产品更新与资讯。</span>
      </label>
      <button className="button button--primary contact-submit" disabled={status === "sending"} type="submit">
        {status === "sending" ? <><CircleNotch aria-hidden className="spinner" size={19} />发送中…</> : "发送消息"}
      </button>
      <p className="form-legal">提交即表示你同意我们的<a href="/legal/terms-of-service/">服务条款</a>和<a href="/legal/privacy-policy/">隐私政策</a>。</p>
    </form>
  );
}

function FormField({ error, label, name, type = "text" }: { error?: string; label: string; name: string; type?: string }) {
  const placeholders: Record<string, string> = { firstName: "小明", lastName: "张", email: "name@example.com" };
  return (
    <div className="field-group">
      <label htmlFor={name}>{label}</label>
      <input aria-invalid={Boolean(error)} className={error ? "field-error" : ""} id={name} name={name} placeholder={placeholders[name]} type={type} />
      {error ? <span className="error-message">{error}</span> : null}
    </div>
  );
}
