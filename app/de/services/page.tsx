import SiteFooterDe from "../../components/SiteFooterDe";
import SiteHeaderDe from "../../components/SiteHeaderDe";
import { deCategoryContent, getDeServicesByCategory } from "../../data/de/services";
import type { ServiceCategory } from "../../data/services";
import { deMetadata, deWebPage } from "../../i18n/locales";

export const metadata = deMetadata({
  title: "Audit, Scans und Pentests",
  description: "Leistungen für Deutschland: Audit und Compliance, Schwachstellenscans und Penetrationstests mit Fokus auf ISO 27001, NIS2, KRITIS und DSGVO.",
  path: "/de/services",
});

const categories: ServiceCategory[] = ["audits", "vulnerability-scanning", "penetration-testing"];

export default function DeServicesPage() {
  const pageData = { "@context": "https://schema.org", "@graph": [deWebPage("/de/services", "Leistungen", "Audit und Compliance, Schwachstellenscans und Penetrationstests.")] };
  return (
    <main className="inner-page" id="top">
      <SiteHeaderDe />
      <section className="inner-hero services-overview-hero">
        <div>
          <p className="eyebrow"><span /> UNSERE LEISTUNGEN</p>
          <h1>IT-Sicherheitsleistungen.<br />Klare Nachweise, sichere Entscheidungen.</h1>
        </div>
        <div>
          <p>Von der Compliance-Vorbereitung bis zum technischen Test: Wir zeigen, was zählt, belegen, was funktioniert, und beheben, was nicht funktioniert.</p>
          <a className="hero-cta" href="/de/contact">Erstgespräch vereinbaren <span aria-hidden="true">⟶</span></a>
        </div>
      </section>
      <section className="service-category-list">
        {categories.map((category, index) => {
          const content = deCategoryContent[category];
          const items = getDeServicesByCategory(category);
          return (
            <article className="service-category-row" key={category}>
              <div className="category-number">0{index + 1}</div>
              <div className="category-copy">
                <p>{content.label.toUpperCase()} · {items.length} LEISTUNGEN</p>
                <h2>{content.title}</h2>
                <span>{content.description}</span>
                <a href={content.hubHref}>{content.label} ansehen <b aria-hidden="true">⟶</b></a>
              </div>
              <div className="category-tags">
                {items.slice(0, 6).map((item) => <a href={`/de/services/${item.slug}`} key={item.slug}>{item.shortName ?? item.name}</a>)}
              </div>
            </article>
          );
        })}
      </section>
      <section className="catalog-note">
        <p>Weitere internationale Leistungen und Rahmenwerke (zum Beispiel SOC 2, PCI DSS, HIPAA) finden Sie auf unserer englischsprachigen Website.</p>
        <a href="/services" hrefLang="en">English site <span aria-hidden="true">⟶</span></a>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageData) }} />
      <SiteFooterDe />
    </main>
  );
}
