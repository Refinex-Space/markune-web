import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { ScrollRevealObserver } from "@/components/site/ScrollRevealObserver";
import { siteConfig } from "@/content/site";
import "./globals.css";

const manrope = localFont({
  src: [
    { path: "../../public/assets/fonts/manrope-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/assets/fonts/manrope-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/assets/fonts/manrope-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/assets/fonts/manrope-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: `${siteConfig.name} — Organize work. Align your team. Ship faster.`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/assets/madora-logo-dark.svg", media: "(prefers-color-scheme: light)" },
      { url: "/assets/madora-logo-light.svg", media: "(prefers-color-scheme: dark)" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: `${siteConfig.name} — Organize work. Align your team. Ship faster.`,
    description: siteConfig.description,
    images: siteUrl ? [new URL("/assets/hero-task-board.webp", siteUrl)] : undefined,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable} data-scroll-behavior="smooth">
      <body>
        <ScrollRevealObserver />
        <Header />
        <main>{children}</main>
        <Footer />
        <div aria-hidden="true" className="progressive-blur">
          {Array.from({ length: 8 }, (_, index) => <span key={index} />)}
        </div>
      </body>
    </html>
  );
}
