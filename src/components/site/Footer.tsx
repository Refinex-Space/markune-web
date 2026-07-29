import { InstagramLogo, LinkedinLogo, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { assets, siteConfig } from "@/content/site";

const columns = [
  { title: "产品", links: [{ label: "优势", href: "/#benefits" }, { label: "功能", href: "/#features" }, { label: "定价", href: "/#pricing" }, { label: "下载", href: "/download/" }] },
  { title: "资源", links: [{ label: "更新日志", href: "/changelog/" }, { label: "博客", href: "/blog/" }, { label: "常见问题", href: "/#faq" }] },
  { title: "公司", links: [{ label: "关于我们", href: "/about/" }, { label: "联系我们", href: "/contact/" }, { label: "隐私政策", href: "/legal/privacy-policy/" }, { label: "服务条款", href: "/legal/terms-of-service/" }] },
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
          <p>面向高效交付与紧密协作团队的项目管理平台。</p>
        </div>
        {columns.map((column) => (
          <div className="footer-column" key={column.title}>
            <p className="footer-title">{column.title}</p>
            {column.links.map((link) => <Link href={link.href} key={link.label}>{link.label}</Link>)}
          </div>
        ))}
        <div className="footer-meta">
          <div className="footer-socials" aria-label="社交媒体链接">
            <a aria-label="Instagram" href="#"><InstagramLogo aria-hidden size={19} /></a>
            <a aria-label="LinkedIn" href="#"><LinkedinLogo aria-hidden size={19} /></a>
            <a aria-label="YouTube" href="#"><YoutubeLogo aria-hidden size={19} /></a>
          </div>
          <p className="footer-copyright">© 2026 {siteConfig.name} - 保留所有权利</p>
        </div>
      </div>
    </footer>
  );
}
