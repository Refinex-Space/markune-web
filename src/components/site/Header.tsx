"use client";

import { ArrowRight, List, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { navItems, siteConfig } from "@/content/site";

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
        <Link aria-label="Flowline home" className="brand" href="/" onClick={() => setOpen(false)}>
          <Image alt="Flowline" height={33} priority src="/assets/flowline-logo.svg" width={130} />
        </Link>
        <nav aria-label="Primary navigation" className="desktop-nav">
          {navItems.map((item) => (
            <Link href={item.href} key={item.label}>{item.label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link className="login-link" href={siteConfig.loginHref}>Login</Link>
          <ButtonLink className="header-trial" href={siteConfig.trialHref}>Free Trial <ArrowRight aria-hidden size={15} /></ButtonLink>
          <button
            aria-expanded={open}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="menu-toggle"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            {open ? <X aria-hidden size={24} weight="regular" /> : <List aria-hidden size={24} weight="regular" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav aria-label="Mobile navigation" className="mobile-nav">
          <div className="container mobile-nav-inner">
            {navItems.map((item) => (
              <Link href={item.href} key={item.label} onClick={() => setOpen(false)}>{item.label}</Link>
            ))}
            <Link className="button button--primary" href={siteConfig.trialHref} onClick={() => setOpen(false)}>Start Free Trial</Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
