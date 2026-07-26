import type { PricingPlan } from "@/types/site";

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Built for small teams getting organized.",
    monthlyPrice: 9,
    yearlyPrice: 7,
    features: ["Up to 10 team members", "Unlimited tasks", "Board and list views", "Basic integrations", "5 GB file storage"],
  },
  {
    name: "Pro",
    description: "For growing teams that need more power.",
    monthlyPrice: 15,
    yearlyPrice: 12,
    popular: true,
    features: ["Unlimited team members", "Timeline and calendar views", "Automated workflows", "Advanced integrations", "50 GB file storage"],
  },
  {
    name: "Business",
    description: "For teams that need full control at scale.",
    monthlyPrice: 35,
    yearlyPrice: 28,
    features: ["Everything in Pro", "Custom automation rules", "Team workload management", "Advanced analytics & reporting", "SSO and admin controls"],
  },
];
