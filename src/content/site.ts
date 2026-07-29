import type { AssetKey, NavItem, SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  name: "Madora",
  description: "Project management platform built for teams that ship fast and stay aligned.",
  loginHref: "/contact/",
  downloadHref: "/download/",
  contactEmail: "hello@flowline.com",
};

export const navItems: NavItem[] = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Changelog", href: "/changelog/" },
  { label: "About", href: "/about/" },
];

export const assets: Record<AssetKey, string> = {
  logo: "/assets/madora-logo-dark.svg",
  hero: "/assets/madora-workspace-hero.png",
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
