import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacySections } from "@/content/legal";

export const metadata: Metadata = { title: "Privacy Policy", description: "How Flowline collects, uses, and protects personal information." };

export default function PrivacyPolicyPage() { return <LegalPage date="Apr 22, 2026" sections={privacySections} title="Privacy Policy" />; }
