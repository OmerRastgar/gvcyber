import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Home from "../page";

const regionContent: Record<string, { name: string; description: string }> = {
  uk: {
    name: "United Kingdom",
    description: "ISO 27001 implementation, Cyber Essentials readiness, ISO audit support, application security testing, vulnerability scanning and penetration testing for United Kingdom organisations from Golden Valley Cyber.",
  },
};

type RegionPageProps = { params: Promise<{ region: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ region: "uk" }];
}

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const { region } = await params;
  const content = regionContent[region];
  if (!content) return {};
  return {
    title: `Golden Valley Cyber | Security Audits, ISO 27001, Pentesting and Vulnerability Scanning | ${content.name}`,
    description: content.description,
    keywords: [
      "ISO audit",
      "ISO 27001",
      "security audit",
      "application security",
      "vulnerability scanning",
      "penetration testing",
      content.name,
    ],
    alternates: { canonical: `/${region}` },
  };
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { region } = await params;
  if (!regionContent[region]) notFound();
  return <Home />;
}
