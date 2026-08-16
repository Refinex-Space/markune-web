import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacySections } from "@/content/legal";

export const metadata: Metadata = { title: "隐私政策", description: "Markune 如何收集、使用和保护个人信息。" };

export default function PrivacyPolicyPage() { return <LegalPage date="2026年4月22日" sections={privacySections} title="隐私政策" />; }
