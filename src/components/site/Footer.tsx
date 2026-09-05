import { EnvelopeSimple, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { assets, siteConfig } from "@/content/site";

const columns = [
  { title: "产品", links: [{ label: "功能", href: "/#benefits" }, { label: "定价", href: "/#pricing" }, { label: "下载", href: "/download/" }] },
  { title: "资源", links: [{ label: "更新日志", href: "/changelog/" }, { label: "博客", href: "/blog/" }, { label: "常见问题", href: "/#faq" }] },
  { title: "关于", links: [{ label: "关于我", href: "/about/" }, { label: "联系开发者", href: `mailto:${siteConfig.contactEmail}` }, { label: "隐私政策", href: "/legal/privacy-policy/" }, { label: "服务条款", href: "/legal/terms-of-service/" }] },
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
          <p>{siteConfig.description}</p>
        </div>
        {columns.map((column) => (
          <div className="footer-column" key={column.title}>
            <p className="footer-title">{column.title}</p>
            {column.links.map((link) => link.href.startsWith("/#")
              ? <a href={link.href} key={link.label}>{link.label}</a>
              : <Link href={link.href} key={link.label}>{link.label}</Link>)}
          </div>
        ))}
        <div className="footer-meta">
          <div className="footer-socials" aria-label="社交媒体链接">
            <a aria-label="Refinex 的 GitHub" href="https://github.com/Refinex-Space" rel="noreferrer" target="_blank"><GithubLogo aria-hidden size={19} /></a>
            <a aria-label="给 Refinex 发邮件" href={`mailto:${siteConfig.contactEmail}`}><EnvelopeSimple aria-hidden size={19} /></a>
          </div>
          <div className="footer-legal">
            <p className="footer-copyright">© 2026 {siteConfig.name} - 保留所有权利</p>
            <p className="footer-icp">
              <a href={siteConfig.icpHref} rel="noreferrer" target="_blank">{siteConfig.icpNumber}</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
