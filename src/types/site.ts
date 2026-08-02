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
  loginHref: string;
  downloadHref: string;
  contactEmail: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface BlogBlock {
  heading: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  cardImage: string;
  tabletImage: string;
  blocks: BlogBlock[];
}

export interface PricingPlan {
  name: string;
  description: string;
  price: string;
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
