import type { Metadata } from "next";
import { notFound } from "next/navigation";
import UkLanding from "../components/UkLanding";
import { clip } from "../lib/seo";

const regionContent: Record<string, { name: string; description: string }> = {
  uk: {
    name: "United Kingdom",
    description: "Cheltenham-based cyber security for UK organisations: Cyber Essentials, ISO 27001, GDPR readiness, penetration testing and vulnerability scanning.",
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
    title: { absolute: "UK Cyber Security Consultancy | Golden Valley Cyber" },
    description: clip(content.description),
    keywords: [
      "ISO audit",
      "ISO 27001",
      "security audit",
      "application security",
      "vulnerability scanning",
      "penetration testing",
      content.name,
    ],
    alternates: { canonical: `/${region}`, languages: { "x-default": "/", en: "/", "en-GB": `/${region}`, de: "/de" } },
    openGraph: {
      title: "UK Cyber Security Consultancy, Cheltenham | Golden Valley Cyber",
      description: clip(content.description),
      url: `https://gvcyber.com/${region}`,
      siteName: "Golden Valley Cyber",
      locale: "en_GB",
      type: "website",
      images: [{ url: "/og-gvcyber.png", width: 1672, height: 941, alt: "Golden Valley Cyber" }],
    },
    twitter: { card: "summary_large_image", title: "UK Cyber Security Consultancy, Cheltenham", description: clip(content.description, 120), images: ["/og-gvcyber.png"] },
  };
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { region } = await params;
  if (!regionContent[region]) notFound();
  return <UkLanding />;
}
