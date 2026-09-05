import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { legalUpdatedAt, privacySections, privacySummary } from "@/content/legal";

export const metadata: Metadata = {
  title: "隐私政策",
  description: "了解 Markune 的本地数据存储、AI 与 Git 等联网功能、第三方数据处理，以及你对文件和个人信息的选择。",
};

export default function PrivacyPolicyPage() {
  return <LegalPage date={legalUpdatedAt} related={{ label: "服务条款", href: "/legal/terms-of-service/" }} sections={privacySections} summary={privacySummary} title="隐私政策" />;
}
