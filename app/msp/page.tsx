import type { Metadata } from "next";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "MSP Security Partner Programme | Golden Valley Cyber",
  description: "MSPs can use Golden Valley Cyber for client security audits, ISO 27001 readiness, vulnerability scanning, penetration testing and compliance automation delivery.",
  keywords: ["MSP security services", "managed service provider security", "ISO 27001 for MSPs", "vulnerability scanning for MSPs", "penetration testing partner", "compliance automation"],
  alternates: { canonical: "/msp" },
  openGraph: {
    title: "MSP Security Partner Programme | Golden Valley Cyber",
    description: "MSPs can use Golden Valley Cyber for client security audits, ISO 27001 readiness, vulnerability scanning, penetration testing and compliance automation delivery.",
    url: "/msp",
    siteName: "Golden Valley Cyber",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "MSP Security Partner Programme | Golden Valley Cyber" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MSP Security Partner Programme | Golden Valley Cyber",
    description: "Security capability for managed service providers.",
    images: ["/og.png"],
  },
};

const capabilities = [
  ["Multi-client delivery", "Run repeatable audit, scanning and testing engagements across your customer portfolio."],
  ["Partner-ready reporting", "Deliver clear, executive-ready outcomes under a consistent service model."],
  ["Specialist capacity", "Add audit and offensive-security expertise without building every capability in-house."],
  ["Product Studio access", "Use compliance automation to organise controls, evidence, remediation and audit progress."],
];

export default function MspPage() {
  return (
    <main className="inner-page" id="top">
      <SiteHeader />
      <section className="partner-hero">
        <p className="eyebrow"><span /> FOR MANAGED SERVICE PROVIDERS</p>
        <h1>Expand your security offer.<br />Keep the client relationship.</h1>
        <p>Golden Valley Cyber helps MSPs add audit, vulnerability and penetration-testing capability through a delivery model built for repeatable client work.</p>
        <a href="mailto:hello@gvcyber.com?subject=MSP%20partnership">Become a partner <span aria-hidden="true">⟶</span></a>
      </section>
      <section className="partner-capabilities">
        <div className="catalog-heading"><p>PARTNER CAPABILITIES</p><h2>Security expertise that fits the way you already serve clients.</h2></div>
        <div className="partner-grid">
          {capabilities.map(([title, copy], index) => (
            <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{copy}</p></article>
          ))}
        </div>
      </section>
      <section className="partner-model">
        <div><p>ONE PARTNER, THREE SERVICE LINES</p><h2>Bring the right capability into every client conversation.</h2></div>
        <div className="category-tags partner-tags">
          <a href="/services/audits">Audit & compliance</a>
          <a href="/services/vulnerability-scanning">Vulnerability scanning</a>
          <a href="/services/penetration-testing">Penetration testing</a>
          <a href="/product-studio">Compliance automation</a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
