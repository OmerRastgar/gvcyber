import type { Metadata } from "next";
import InteractiveGlobeExplorer from "../components/InteractiveGlobeExplorer";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { globeCountries } from "../data/globeStandards";

export const metadata: Metadata = {
  title: "Global Cyber Security Standards Explorer | Golden Valley Cyber",
  description: "Explore cyber security standards by region, including ISO 27001, Cyber Essentials, SOC 2, PCI DSS, GDPR, NIST, HIPAA, DORA and NIS2.",
  keywords: [
    "ISO 27001",
    "ISO audit",
    "Cyber Essentials",
    "SOC 2",
    "PCI DSS",
    "NIST CSF",
    "application security",
    "vulnerability scanning",
    "penetration testing",
    "security implementation",
  ],
  alternates: { canonical: "/global-standards" },
  openGraph: {
    title: "Global Cyber Security Standards Explorer | Golden Valley Cyber",
    description: "Explore cyber security standards by region, including ISO 27001, Cyber Essentials, SOC 2, PCI DSS, GDPR, NIST, HIPAA, DORA and NIS2.",
    url: "/global-standards",
    siteName: "Golden Valley Cyber",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "Global Cyber Security Standards Explorer | Golden Valley Cyber" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Cyber Security Standards Explorer | Golden Valley Cyber",
    description: "Explore cyber security standards by region.",
    images: ["/og.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Global Cyber Security Standards Explorer",
  description: "Interactive guide to cyber security standards and related services by country and region.",
  about: globeCountries.map((country) => ({
    "@type": "Thing",
    name: `${country.name} cyber security standards`,
    description: country.standards.join(", "),
  })),
};

export default function GlobalStandardsPage() {
  return (
    <main className="inner-page" id="top">
      <SiteHeader />
      <section className="global-standards-hero">
        <div>
          <p className="eyebrow"><span /> GLOBAL STANDARDS</p>
          <h1>Explore cyber standards by region.</h1>
        </div>
        <p>
          Use the globe to review common security and compliance frameworks, then connect each region to practical work such as ISO audit,
          ISO 27001 implementation, application security testing, vulnerability scanning and penetration testing.
        </p>
      </section>
      <InteractiveGlobeExplorer />
      <section className="sr-only" aria-label="Cyber security standards by country">
        <h2>Cyber security standards by country</h2>
        {globeCountries.map((country) => (
          <article key={country.name}>
            <h3>{country.name} ({country.region})</h3>
            <p>{country.standards.join(", ")}</p>
          </article>
        ))}
      </section>
      <section className="standards-answer-section">
        <div>
          <p>HOW GOLDEN VALLEY CYBER HELPS</p>
          <h2>From framework names to security work your team can plan.</h2>
        </div>
        <div className="standards-answer-grid">
          <article>
            <h3>ISO audit and ISO 27001</h3>
            <p>Gap assessment, ISMS implementation support, control evidence and readiness for an external certification audit.</p>
          </article>
          <article>
            <h3>Application security</h3>
            <p>Web application testing, API testing, secure product delivery review and remediation guidance for development teams.</p>
          </article>
          <article>
            <h3>Vulnerability scanning</h3>
            <p>Network, host, database, cloud and authenticated scanning with validation so teams can focus on real exposure.</p>
          </article>
          <article>
            <h3>Penetration testing</h3>
            <p>Manual security testing across web, mobile, network, cloud, wireless, social engineering and IoT environments.</p>
          </article>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteFooter />
    </main>
  );
}
