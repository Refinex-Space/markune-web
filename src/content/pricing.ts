import type { PricingPlan } from "@/types/site";

export const pricingIntro =
  "入门版与永久版当前均可免费使用；永久版原价 ¥89，现开源免费并持续更新。定制方案正在规划，暂未开放。";

export const pricingFootnote = "Markune 目前开源免费；所有可用方案均从下载页开始。";

export const pricingPlans: PricingPlan[] = [
  {
    name: "入门版",
    description: "免费开始，建立属于自己的本地 Markdown 工作区。",
    price: "¥0",
    priceUnit: "免费使用",
    actionLabel: "下载入门版",
    note: "无需订阅或付款信息",
    features: ["本地 Markdown 工作区", "文档树与全文搜索", "Inbox 与 Daily", "本地图片与附件"],
  },
  {
    name: "永久版",
    description: "完整能力现已开源免费；持续更新，为长期使用 Markune 而准备。",
    price: "¥0",
    priceWas: "¥89",
    priceUnit: "开源免费",
    actionLabel: "免费下载",
    note: "无需订阅或付款信息",
    popular: true,
    features: ["包含入门版全部功能", "自定义标题字体与主题", "笔记模板、置顶与笔记类型", "文件夹图标与颜色", "写作助理", "画板与图谱", "Git Sync"],
  },
  {
    name: "定制",
    description: "面向有统一部署、采购或支持需求的组织；当前暂未开放。",
    price: "—",
    priceUnit: "即将推出",
    actionLabel: "暂未开放",
    note: "正在规划中，不承诺上线时间",
    disabled: true,
    features: ["批量授权与组织支持", "迁移与工作区规划", "定制合作方案"],
  },
];
