"use client";

import { useEffect, useState } from "react";
import styles from "./guides.module.css";

export function ArticleContents({ sections }: { sections: { id: string; heading: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const body = document.getElementById("guide-body");
      if (!body) return;
      let current = sections[0]?.id ?? "";
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= 150) current = section.id;
      }
      const bounds = body.getBoundingClientRect();
      const distance = Math.max(1, bounds.height - window.innerHeight + 130);
      setActive(current);
      setProgress(Math.max(0, Math.min(100, Math.round((130 - bounds.top) / distance * 100))));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    const body = document.getElementById("guide-body");
    if (body) observer.observe(body);
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); observer.disconnect(); if (frame) cancelAnimationFrame(frame); };
  }, [sections]);

  const links = sections.map((section, index) => <a aria-current={active === section.id ? "location" : undefined} href={`#${section.id}`} key={section.id} onClick={() => setOpen(false)}><span aria-hidden>{String(index + 1).padStart(2, "0")}</span>{section.heading}</a>);

  return (
    <aside className={styles.contents}>
      <div aria-hidden className={styles.readingProgress} style={{ width: `${progress}%` }} />
      <div className={styles.desktopContents}><p>本页目录 <span>{progress}%</span></p><nav aria-label="文章目录">{links}</nav><a className={styles.backTop} href="#article-top">回到顶部 ↑</a></div>
      <details className={styles.mobileContents} onToggle={(event) => setOpen(event.currentTarget.open)} open={open}><summary>本页目录<span>{progress}%</span></summary><nav aria-label="移动端文章目录">{links}</nav></details>
    </aside>
  );
}
