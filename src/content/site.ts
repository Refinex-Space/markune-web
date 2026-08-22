import type { AssetKey, NavItem, SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  name: "Markune",
  description: "面向高效交付与紧密协作团队的项目管理平台。",
  downloadHref: "/download/",
  githubHref: "https://github.com/Refinex-Space/markune",
  contactEmail: "hello@flowline.com",
  icpNumber: "黔ICP备2026002771号",
  icpHref: "https://beian.miit.gov.cn/",
};

export const navItems: NavItem[] = [
  { label: "功能", href: "/#features" },
  { label: "定价", href: "/#pricing" },
  { label: "更新日志", href: "/changelog/" },
  { label: "关于我们", href: "/about/" },
];

export const assets: Record<AssetKey, string> = {
  logo: "/assets/markune-logo-dark.svg",
  hero: "/assets/markune-workspace-hero.png",
  featureAutomation: "/assets/feature-automation.webp",
  featureBoard: "/assets/feature-task-board.webp",
  capabilityComments: "/assets/capability-comments.webp",
  capabilityAnalytics: "/assets/capability-analytics.webp",
  capabilityIntegrations: "/assets/capability-integrations.webp",
  pricingBackground: "/assets/pricing-background-render.avif",
  ctaDashboard: "/assets/cta-dashboard-render.avif",
  ctaDashboardMobile: "/assets/cta-dashboard-mobile.avif",
  aboutStory: "/assets/about-story.png",
  contactBackground: "/assets/contact-background.png",
  blogQ1: "/assets/blog-q1.webp",
  blogContext: "/assets/blog-context-switching.webp",
  blogAutomation: "/assets/blog-automation.webp",
  blogReview: "/assets/blog-project-review.webp",
  blogAsync: "/assets/blog-async.webp",
  blogDeadlines: "/assets/blog-deadlines.webp",
};
