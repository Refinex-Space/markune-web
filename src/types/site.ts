export type AssetKey =
  | "logo"
  | "hero"
  | "featureAutomation"
  | "featureBoard"
  | "capabilityComments"
  | "capabilityAnalytics"
  | "capabilityIntegrations"
  | "pricingBackground"
  | "ctaDashboard"
  | "ctaDashboardMobile"
  | "aboutStory"
  | "contactBackground"
  | "blogQ1"
  | "blogContext"
  | "blogAutomation"
  | "blogReview"
  | "blogAsync"
  | "blogDeadlines";

export interface SiteConfig {
  name: string;
  description: string;
  downloadHref: string;
  githubHref: string;
  contactEmail: string;
  icpNumber: string;
  icpHref: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export type GuideCategory = "开始使用" | "日常工作流" | "进阶能力";

export interface BlogBlock {
  id: string;
  heading: string;
  paragraphs?: string[];
  steps?: { title: string; text: string }[];
  bullets?: string[];
  code?: { label: string; language: string; content: string };
  table?: { caption: string; headers: string[]; rows: string[][] };
  note?: { title: string; text: string; tone?: "tip" | "important" };
  image?: { src: string; alt: string; caption: string; width: number; height: number };
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: GuideCategory;
  author: string;
  date: string;
  version: string;
  outcome: string;
  prerequisites: string;
  related: string[];
  blocks: BlogBlock[];
}

export type GuideSummary = Pick<BlogPost, "slug" | "title" | "excerpt" | "category"> & { readTime: number };

export interface PricingPlan {
  name: string;
  description: string;
  price: string;
  priceWas?: string;
  priceUnit: string;
  actionLabel: string;
  popular?: boolean;
  disabled?: boolean;
  note: string;
  features: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}
