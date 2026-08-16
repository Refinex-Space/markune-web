import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { termsSections } from "@/content/legal";

export const metadata: Metadata = { title: "服务条款", description: "使用 Markune 时适用的条款。" };

export default function TermsPage() { return <LegalPage date="2026年4月14日" sections={termsSections} title="服务条款" />; }
