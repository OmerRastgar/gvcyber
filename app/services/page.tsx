import type { Metadata } from "next";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { categoryContent, getServicesByCategory, type ServiceCategory } from "../data/services";

export const metadata: Metadata = {
  title: "Cybersecurity Services | ISO Audit, Pentesting and Scanning | Golden Valley Cyber",
  description: "Explore Golden Valley Cyber services for ISO audit, ISO 27001 implementation, Cyber Essentials, SOC 2, PCI DSS, application security, vulnerability scanning and penetration testing.",
  keywords: ["cybersecurity services", "ISO audit", "ISO 27001 implementation", "Cyber Essentials", "SOC 2 readiness", "PCI DSS readiness", "application security", "vulnerability scanning", "penetration testing"],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Cybersecurity Services | ISO Audit, Pentesting and Scanning | Golden Valley Cyber",
    description: "ISO audit, ISO 27001 implementation, Cyber Essentials, SOC 2, PCI DSS, application security, vulnerability scanning and penetration testing from Golden Valley Cyber.",
    url: "/services",
    siteName: "Golden Valley Cyber",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "Cybersecurity services | Golden Valley Cyber" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity Services | Golden Valley Cyber",
    description: "ISO audit, ISO 27001, application security, vulnerability scanning and penetration testing.",
    images: ["/og.png"],
  },
};

const categories: ServiceCategory[] = ["audits", "vulnerability-scanning", "penetration-testing"];

export default function ServicesPage() {
  return (
    <main className="inner-page" id="top">
      <SiteHeader />
      <section className="inner-hero services-overview-hero">
        <div>
          <p className="eyebrow"><span /> OUR SERVICES</p>
          <h1>Clear evidence.<br />Confident action.</h1>
        </div>
        <p>From compliance readiness to technical testing, we help you see what matters, prove what works and fix what does not.</p>
      </section>
      <section className="service-category-list">
        {categories.map((category, index) => {
          const content = categoryContent[category];
          const items = getServicesByCategory(category);
          return (
            <article className="service-category-row" key={category}>
              <div className="category-number">0{index + 1}</div>
              <div className="category-copy">
                <p>{content.label.toUpperCase()} · {items.length} SERVICES</p>
                <h2>{content.title}</h2>
                <span>{content.description}</span>
                <a href={`/services/${category}`}>Explore {content.label.toLowerCase()} <b aria-hidden="true">⟶</b></a>
              </div>
              <div className="category-tags">
                {items.slice(0, 6).map((item) => <a href={`/services/${item.slug}`} key={item.slug}>{item.shortName ?? item.name}</a>)}
              </div>
            </article>
          );
        })}
      </section>
      <SiteFooter />
    </main>
  );
}
