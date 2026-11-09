import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import { getService } from "../data/services";

const ukServiceSlugs = [
  "cyber-essentials",
  "cyber-essentials-plus",
  "iso-27001",
  "crest-penetration-testing",
];

const ukServices = ukServiceSlugs
  .map((slug) => getService(slug))
  .filter((service): service is NonNullable<ReturnType<typeof getService>> => Boolean(service));

export const ukStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://gvcyber.com/uk#webpage",
  name: "UK Cyber Security Consultancy, Cheltenham",
  url: "https://gvcyber.com/uk",
  inLanguage: "en-GB",
  description: "Cyber security consultancy in Cheltenham, Gloucestershire, helping UK organisations with Cyber Essentials, ISO 27001, penetration testing and vulnerability scanning.",
  isPartOf: { "@id": "https://gvcyber.com/#website" },
  about: { "@id": "https://gvcyber.com/#organization" },
  spatialCoverage: { "@type": "Country", name: "United Kingdom" },
};

export default function UkLanding() {
  return (
    <main className="inner-page" id="top">
      <SiteHeader />
      <section className="partner-hero">
        <h1>Cyber security for UK organisations, from Cheltenham.</h1>
        <p>
          Golden Valley Cyber is a cyber security consultancy in Cheltenham, Gloucestershire. We help UK organisations prepare for Cyber Essentials,
          ISO 27001 and other assurance schemes, and test their defences with penetration testing and vulnerability scanning.
        </p>
        <a href="/contact">Scope a UK engagement <span aria-hidden="true">⟶</span></a>
      </section>

      <section className="partner-capabilities">
        <div className="catalog-heading">
          <p>UK SCHEMES AND SERVICES</p>
          <h2>The frameworks UK customers and suppliers ask about most.</h2>
        </div>
        <div className="partner-grid">
          {ukServices.map((service) => (
            <article key={service.slug}>
              <h2><a href={`/services/${service.slug}`}>{service.name}</a></h2>
              <p><strong>Built for:</strong> {service.appliesTo}.</p>
              <p>{service.risk}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="partner-model">
        <div>
          <p>WHERE WE ARE</p>
          <h2>Frogmore House, 6 Ormond Place, Cheltenham, GL50 1JD.</h2>
        </div>
        <div className="category-tags partner-tags">
          <a href="/contact">Contact the team</a>
          <a href="/services/audits">Audit &amp; compliance</a>
          <a href="/services/penetration-testing">Penetration testing</a>
          <a href="/services/gdpr-compliance">GDPR compliance</a>
          <a href="/global-standards">Compare UK standards with other regions</a>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ukStructuredData) }} />
      <SiteFooter />
    </main>
  );
}
