import type { Metadata } from "next";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Solutions | Product Studio, MSP Partners and Security Programmes | Golden Valley Cyber",
  description: "Explore Golden Valley Cyber solutions for Product Studio compliance automation, MSP security partnerships, assurance readiness, attack surface clarity and continuous resilience.",
  keywords: ["cyber security solutions", "Product Studio", "compliance automation", "MSP security partner", "assurance readiness", "attack surface management", "continuous vulnerability scanning", "security implementation"],
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Solutions | Product Studio, MSP Partners and Security Programmes | Golden Valley Cyber",
    description: "Product Studio compliance automation, MSP security partnerships, assurance readiness, attack surface clarity and continuous resilience.",
    url: "/solutions",
    siteName: "Golden Valley Cyber",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "Solutions | Golden Valley Cyber" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions | Golden Valley Cyber",
    description: "Tools and programmes for clearer security work.",
    images: ["/og.png"],
  },
};

const solutions = [
  ["Product Studio", "Open-source compliance automation for controls, evidence, gaps, remediation and audit delivery.", "/product-studio"],
  ["MSP partner programme", "A delivery model for managed service providers offering client security audits, scanning and testing.", "/msp"],
  ["Expert suggestions", "Practical guidance on ISO audit readiness, vulnerability scanning, penetration testing and implementation decisions.", "/expert-suggestions"],
  ["Assurance readiness", "Framework readiness for ISO 27001, Cyber Essentials, SOC 2, PCI DSS, GDPR, NIST and related requirements.", "/services/audits"],
  ["Attack surface clarity", "Vulnerability scanning and validation across networks, applications, cloud services, hosts and databases.", "/services/vulnerability-scanning"],
  ["Secure product delivery", "Application security testing, API testing and remediation guidance for SaaS, ecommerce and digital platforms.", "/services/web-application-penetration-testing"],
  ["Continuous resilience", "Repeatable testing, remediation tracking and evidence-led improvement across technical and compliance work.", "/services/penetration-testing"],
];

export default function SolutionsPage() {
  return (
    <main className="inner-page" id="top">
      <SiteHeader />
      <section className="inner-hero">
        <div>
          <p className="eyebrow"><span /> SOLUTIONS</p>
          <h1>Tools and programmes for clearer security work.</h1>
        </div>
        <p>Use Golden Valley Cyber directly for focused security outcomes, or combine services with Product Studio and MSP delivery support.</p>
      </section>
      <section className="solution-list">
        {solutions.map(([title, copy, href], index) => (
          <article className="solution-card" key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
            <a href={href}>Explore <b aria-hidden="true">⟶</b></a>
          </article>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
