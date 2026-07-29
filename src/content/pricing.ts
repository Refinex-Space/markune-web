import type { PricingPlan } from "@/types/site";

export const pricingPlans: PricingPlan[] = [
  {
    name: "入门版",
    description: "适合刚开始建立工作秩序的小型团队。",
    monthlyPrice: 9,
    yearlyPrice: 7,
    features: ["最多 10 名团队成员", "无限任务", "看板与列表视图", "基础集成", "5 GB 文件存储空间"],
  },
  {
    name: "Pro",
    description: "适合需要更强能力的成长型团队。",
    monthlyPrice: 15,
    yearlyPrice: 12,
    popular: true,
    features: ["无限团队成员", "时间线与日历视图", "自动化工作流", "高级集成", "50 GB 文件存储空间"],
  },
  {
    name: "Business",
    description: "适合需要规模化全面管控的团队。",
    monthlyPrice: 35,
    yearlyPrice: 28,
    features: ["包含 Pro 的全部功能", "自定义自动化规则", "团队工作负载管理", "高级分析与报告", "SSO 与管理员控制"],
  },
];
