import Image from "next/image";
import Link from "next/link";
import { assets, siteConfig } from "@/content/site";

const columns = [
  { title: "Product", links: [{ label: "Benefits", href: "/#benefits" }, { label: "Features", href: "/#features" }, { label: "Pricing", href: "/#pricing" }] },
  { title: "Resources", links: [{ label: "Changelog", href: "/changelog/" }, { label: "Blog", href: "/blog/" }, { label: "FAQ", href: "/#faq" }] },
  { title: "Company", links: [{ label: "About", href: "/about/" }, { label: "Contact", href: "/contact/" }, { label: "Privacy policy", href: "/legal/privacy-policy/" }, { label: "Terms & Conditions", href: "/legal/terms-of-service/" }] },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo-lockup">
            <Image alt="" aria-hidden className="footer-logo" height={28} src={assets.logo} width={28} />
            <span>{siteConfig.name}</span>
          </div>
          <p>Project management platform built for teams that ship fast and stay aligned.</p>
        </div>
        {columns.map((column) => (
          <div className="footer-column" key={column.title}>
            <p className="footer-title">{column.title}</p>
            {column.links.map((link) => <Link href={link.href} key={link.label}>{link.label}</Link>)}
          </div>
        ))}
        <div className="footer-meta">
          <div className="footer-socials" aria-label="Social links">
            <a aria-label="Instagram" href="#"><InstagramLogo aria-hidden size={19} /></a>
            <a aria-label="LinkedIn" href="#"><LinkedinLogo aria-hidden size={19} /></a>
            <a aria-label="YouTube" href="#"><YoutubeLogo aria-hidden size={19} /></a>
          </div>
          <p className="footer-copyright">© 2026 {siteConfig.name} - All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
import { InstagramLogo, LinkedinLogo, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
