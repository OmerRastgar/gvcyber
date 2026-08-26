import type { Metadata } from "next";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Careers | Golden Valley Cyber",
  description: "Careers at Golden Valley Cyber. There are no open roles right now, but this page will list future cyber security, audit, application security and compliance roles.",
  keywords: ["Golden Valley Cyber careers", "cyber security careers", "application security jobs", "security audit jobs", "ISO 27001 jobs"],
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers | Golden Valley Cyber",
    description: "Careers at Golden Valley Cyber. Cyber security, audit, application security and compliance roles.",
    url: "/careers",
    siteName: "Golden Valley Cyber",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "Careers | Golden Valley Cyber" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | Golden Valley Cyber",
    description: "Cyber security careers.",
    images: ["/og.png"],
  },
};

export default function CareersPage() {
  return (
    <main className="inner-page" id="top">
      <SiteHeader />
      <section className="careers-hero">
        <p className="eyebrow"><span /> CAREERS AT GOLDEN VALLEY CYBER</p>
        <h1>Do security work that makes the next action clear.</h1>
      </section>
      <section className="no-openings">
        <p>CURRENT OPPORTUNITIES</p>
        <div><h2>No open careers right now.</h2><span>We are not currently hiring, but this page will be updated when new roles become available.</span></div>
      </section>
      <SiteFooter />
    </main>
  );
}
