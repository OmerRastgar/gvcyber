import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { getIndustry, industries, type Industry } from "../../data/industries";
import { getService } from "../../data/services";

type IndustryPageProps = { params: Promise<{ slug: string }> };

const groups: Array<{ key: keyof Pick<Industry, "auditSlugs" | "scanSlugs" | "pentestSlugs">; label: string; copy: string }> = [
  { key: "auditSlugs", label: "Applicable audits", copy: "Framework readiness, certification preparation and compliance evidence work that commonly applies to this sector." },
  { key: "scanSlugs", label: "Applicable vulnerability scans", copy: "Technical discovery work to find exposed, misconfigured or unpatched systems before they become incidents." },
  { key: "pentestSlugs", label: "Applicable penetration tests", copy: "Human-led testing that validates real-world exposure across applications, networks, cloud and people/process controls." },
];

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return {
    title: `${industry.title} Cyber Security Services | Golden Valley Cyber`,
    description: `${industry.summary} View applicable audits, vulnerability scanning and penetration testing services for ${industry.title.toLowerCase()}.`,
    keywords: [industry.title, "security audits", "vulnerability scanning", "penetration testing", "application security", "ISO 27001", "Golden Valley Cyber"],
    alternates: { canonical: `/industries/${industry.slug}` },
  };
}

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${industry.title} cyber security services`,
    provider: { "@type": "Organization", name: "Golden Valley Cyber", url: "https://gvcyber.com" },
    areaServed: industry.title,
    description: industry.summary,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${industry.title} applicable services`,
      itemListElement: groups.flatMap((group) =>
        industry[group.key].map((serviceSlug) => {
          const service = getService(serviceSlug);
          return service ? { "@type": "Offer", itemOffered: { "@type": "Service", name: service.name, url: `https://gvcyber.com/services/${service.slug}` } } : null;
        }).filter(Boolean),
      ),
    },
  };

  return (
    <main className="inner-page industry-detail-page" id="top">
      <SiteHeader />
      <section className="inner-hero industry-detail-hero">
        <div>
          <p className="eyebrow"><span /> INDUSTRY</p>
          <h1>{industry.title}</h1>
        </div>
        <p>{industry.detail}</p>
      </section>

      <section className="industry-service-map">
        <div className="catalog-heading">
          <p>APPLICABLE SERVICES</p>
          <h2>Start with the audits, scans and tests most relevant to {industry.title.toLowerCase()}.</h2>
        </div>
        {groups.map((group) => (
          <article className="industry-service-group" key={group.key}>
            <div>
              <p>{group.label.toUpperCase()}</p>
              <h2>{group.label}</h2>
              <span>{group.copy}</span>
            </div>
            <div className="industry-service-links">
              {industry[group.key].map((serviceSlug) => {
                const service = getService(serviceSlug);
                if (!service) return null;
                return (
                  <a href={`/services/${service.slug}`} key={service.slug}>
                    <span>{service.region}</span>
                    <b>{service.shortName ?? service.name}</b>
                    <small>{service.appliesTo}</small>
                  </a>
                );
              })}
            </div>
          </article>
        ))}
      </section>

      <section className="catalog-note">
        <p>These recommendations are a starting point. Final scope depends on people, business complexity, technology footprint, regulatory obligations and the systems that matter most to the sector.</p>
        <a href="/services">Explore all services <span aria-hidden="true">⟶</span></a>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteFooter />
    </main>
  );
}
