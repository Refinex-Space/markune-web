"use client";

import { ArrowRight, List, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { assets, navItems, siteConfig } from "@/content/site";

function GithubMark({ size }: { size: number }) {
  return (
    <svg aria-hidden fill="currentColor" height={size} viewBox="0 0 16 16" width={size}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className={`site-header ${open ? "site-header--open" : ""}`}>
      <div className="container header-inner">
        <Link aria-label={`${siteConfig.name} 首页`} className="brand" href="/" onClick={() => setOpen(false)}>
          <Image alt="" aria-hidden height={28} priority src={assets.logo} width={28} />
          <span>{siteConfig.name}</span>
        </Link>
        <nav aria-label="主导航" className="desktop-nav">
          {navItems.map((item) => (
            <Link href={item.href} key={item.label}>{item.label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <a
            aria-label="在 GitHub 上查看 Markune"
            className="header-github"
            href={siteConfig.githubHref}
            rel="noreferrer"
            target="_blank"
          >
            <GithubMark size={20} />
          </a>
          <ButtonLink className="header-trial" href={siteConfig.downloadHref}>下载 <ArrowRight aria-hidden size={15} /></ButtonLink>
          <button
            aria-expanded={open}
            aria-label={open ? "关闭导航菜单" : "打开导航菜单"}
            className="menu-toggle"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            {open ? <X aria-hidden size={24} weight="regular" /> : <List aria-hidden size={24} weight="regular" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav aria-label="移动端导航" className="mobile-nav">
          <div className="container mobile-nav-inner">
            {navItems.map((item) => (
              <Link href={item.href} key={item.label} onClick={() => setOpen(false)}>{item.label}</Link>
            ))}
            <a className="mobile-nav-github" href={siteConfig.githubHref} onClick={() => setOpen(false)} rel="noreferrer" target="_blank">
              <GithubMark size={18} />GitHub
            </a>
            <Link className="button button--primary" href={siteConfig.downloadHref} onClick={() => setOpen(false)}>下载</Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
