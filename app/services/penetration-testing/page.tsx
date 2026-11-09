import type { Metadata } from "next";
import CategoryPage from "../../components/CategoryPage";
import { hreflangFor } from "../../i18n/locales";

export const metadata: Metadata = {
  title: "Penetration Testing Services",
  description: "Penetration testing for web apps, APIs, networks, mobile, cloud and wireless, with clear evidence and remediation guidance from Golden Valley Cyber.",
  keywords: ["penetration testing", "web application penetration testing", "API penetration testing", "network penetration testing", "mobile app penetration testing", "cloud penetration testing", "application security"],
  alternates: { canonical: "/services/penetration-testing", languages: hreflangFor("/services/penetration-testing") },
  openGraph: {
    title: "Penetration Testing Services | Golden Valley Cyber",
    description: "Golden Valley Cyber penetration testing for web applications, APIs, networks, mobile apps, cloud infrastructure, wireless environments, social engineering and IoT systems.",
    url: "/services/penetration-testing",
    siteName: "Golden Valley Cyber",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og-gvcyber.png", width: 1672, height: 941, alt: "Penetration Testing | Golden Valley Cyber" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Penetration Testing | Golden Valley Cyber",
    description: "Human-led security testing.",
    images: ["/og-gvcyber.png"],
  },
};

export default function PenetrationTestingPage() {
  return <CategoryPage category="penetration-testing" />;
}
