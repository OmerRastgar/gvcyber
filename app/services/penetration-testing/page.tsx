import type { Metadata } from "next";
import CategoryPage from "../../components/CategoryPage";

export const metadata: Metadata = {
  title: "Penetration Testing Services | Golden Valley Cyber",
  description: "Golden Valley Cyber penetration testing for web applications, APIs, networks, mobile apps, cloud infrastructure, wireless environments, social engineering and IoT systems.",
  keywords: ["penetration testing", "web application penetration testing", "API penetration testing", "network penetration testing", "mobile app penetration testing", "cloud penetration testing", "application security"],
  alternates: { canonical: "/services/penetration-testing" },
  openGraph: {
    title: "Penetration Testing Services | Golden Valley Cyber",
    description: "Golden Valley Cyber penetration testing for web applications, APIs, networks, mobile apps, cloud infrastructure, wireless environments, social engineering and IoT systems.",
    url: "/services/penetration-testing",
    siteName: "Golden Valley Cyber",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "Penetration Testing | Golden Valley Cyber" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Penetration Testing | Golden Valley Cyber",
    description: "Human-led security testing.",
    images: ["/og.png"],
  },
};

export default function PenetrationTestingPage() {
  return <CategoryPage category="penetration-testing" />;
}
