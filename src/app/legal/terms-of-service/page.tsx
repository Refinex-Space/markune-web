import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { termsSections } from "@/content/legal";

export const metadata: Metadata = { title: "Terms of Service", description: "The terms that govern use of Flowline." };

export default function TermsPage() { return <LegalPage date="Apr 14, 2026" sections={termsSections} title="Terms of Service" />; }
