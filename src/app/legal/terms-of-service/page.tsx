import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { legalUpdatedAt, termsSections, termsSummary } from "@/content/legal";

export const metadata: Metadata = {
  title: "服务条款",
  description: "了解 Markune 的 Apache-2.0 开源许可、内容权利、本地数据责任、第三方服务及软件使用边界。",
};

export default function TermsPage() {
  return <LegalPage date={legalUpdatedAt} related={{ label: "隐私政策", href: "/legal/privacy-policy/" }} sections={termsSections} summary={termsSummary} title="服务条款" />;
}
