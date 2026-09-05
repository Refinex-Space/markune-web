"use client";

import { Check, Copy } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/about/about.module.css";

export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (resetTimer.current) clearTimeout(resetTimer.current); }, []);

  async function copyEmail() {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    resetTimer.current = setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <span className={styles.copyControl}>
      <button aria-label={status === "copied" ? "邮箱已复制" : "复制邮箱地址"} className={styles.copyButton} onClick={copyEmail} type="button">
        {status === "copied" ? <Check aria-hidden size={19} /> : <Copy aria-hidden size={19} />}
      </button>
      <span className={styles.copyStatus} role="status">{status === "copied" ? "已复制" : status === "error" ? "无法复制，请选择邮箱文字手动复制。" : ""}</span>
    </span>
  );
}
