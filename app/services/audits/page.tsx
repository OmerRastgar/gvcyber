import type { Metadata } from "next";
import CategoryPage from "../../components/CategoryPage";

export const metadata: Metadata = {
  title: "Security Audits, ISO Audit and Compliance Readiness | Golden Valley Cyber",
  description: "Golden Valley Cyber audit and compliance readiness services for ISO 27001, ISO audit support, Cyber Essentials, SOC 2, PCI DSS, GDPR, NIST, DORA, NIS2 and related frameworks.",
  keywords: ["security audit", "ISO audit", "ISO 27001", "ISO 27001 implementation", "Cyber Essentials", "SOC 2", "PCI DSS", "GDPR compliance", "NIST CSF", "DORA", "NIS2"],
  alternates: { canonical: "/services/audits" },
  openGraph: {
    title: "Security Audits, ISO Audit and Compliance Readiness | Golden Valley Cyber",
    description: "Golden Valley Cyber audit and compliance readiness services for ISO 27001, ISO audit support, Cyber Essentials, SOC 2, PCI DSS, GDPR, NIST, DORA, NIS2 and related frameworks.",
    url: "/services/audits",
    siteName: "Golden Valley Cyber",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "Security Audits | Golden Valley Cyber" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Security Audits | Golden Valley Cyber",
    description: "ISO audit and compliance readiness.",
    images: ["/og.png"],
  },
};

export default function AuditsPage() {
  return <CategoryPage category="audits" />;
}
