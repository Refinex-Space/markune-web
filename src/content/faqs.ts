import type { FaqItem } from "@/types/site";

export const faqs: FaqItem[] = [
  {
    question: "是否提供免费试用？",
    answer:
      "是的。每个方案均提供 14 天免费试用，无需信用卡。试用期间可以完整体验全部功能，确认符合需求后再决定是否订阅。",
  },
  {
    question: "完成初始设置需要多久？",
    answer:
      "大多数团队可在 10 分钟内开始使用。创建工作区、邀请团队并添加任务即可。如果从其他工具迁移，导入功能可以处理主要迁移工作。",
  },
  {
    question: "支持哪些集成？",
    answer:
      "Madora 可连接 Slack、GitHub、GitLab、Google Drive、Figma、Notion、Jira 以及其他 50 多种工具。所有方案都包含基础集成，Pro 和 Business 方案还提供高级自动化能力。",
  },
  {
    question: "我的数据安全吗？",
    answer:
      "是的。静态数据采用 AES-256 加密，传输过程采用 TLS 1.3，并使用通过 SOC 2 Type II 认证的基础设施。Business 方案还提供 SSO、SAML 和审计日志，满足完整的合规管控需求。",
  },
  {
    question: "可以随时切换方案或取消订阅吗？",
    answer:
      "大多数项目从策略梳理开始，最终交付完整的品牌系统或网站。项目周期通常为 6 至 12 周，具体取决于范围。开始前，我们会共同明确交付内容、时间安排和里程碑。",
  },
];
