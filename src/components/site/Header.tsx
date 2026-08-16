"use client";

import { ArrowRight, GithubLogo, List, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { assets, navItems, siteConfig } from "@/content/site";

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
          <Link className="login-link" href={siteConfig.loginHref}>登录</Link>
          <a
            aria-label="在 GitHub 上查看 Markune"
            className="header-github"
            href={siteConfig.githubHref}
            rel="noreferrer"
            target="_blank"
          >
            <GithubLogo aria-hidden size={20} weight="fill" />
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
              <GithubLogo aria-hidden size={18} weight="fill" />GitHub
            </a>
            <Link className="button button--primary" href={siteConfig.downloadHref} onClick={() => setOpen(false)}>下载</Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
