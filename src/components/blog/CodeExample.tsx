"use client";

import { Check, Copy } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import styles from "./guides.module.css";

export function CodeExample({ label, language, content }: { label: string; language: string; content: string }) {
  const [status, setStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const copy = async () => {
    if (timer.current) clearTimeout(timer.current);
    try { await navigator.clipboard.writeText(content); setStatus("已复制"); }
    catch { setStatus("无法复制，请选中示例手动复制。"); }
    timer.current = setTimeout(() => setStatus(""), 4000);
  };
  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeHeader}><span>{label}<span>{language}</span></span><button aria-label={`复制${label}`} onClick={copy} type="button">{status === "已复制" ? <Check aria-hidden size={15} /> : <Copy aria-hidden size={15} />}<span>复制</span></button></div>
      <pre aria-label={label} tabIndex={0}><code>{content}</code></pre>
      <span className={styles.codeStatus} role="status">{status}</span>
    </div>
  );
}
