import SiteFooterDe from "./SiteFooterDe";
import SiteHeaderDe from "./SiteHeaderDe";
import { deCategoryContent, getDeServicesByCategory } from "../data/de/services";
import type { ServiceCategory } from "../data/services";

export default function CategoryPageDe({ category }: { category: ServiceCategory }) {
  const content = deCategoryContent[category];
  const items = getDeServicesByCategory(category);

  return (
    <main className="inner-page" id="top">
      <SiteHeaderDe />
      <section className="inner-hero">
        <div>
          <p className="eyebrow"><span /> {content.label.toUpperCase()}</p>
          <h1>{content.title}</h1>
        </div>
        <p>{content.description}</p>
      </section>
      <section className="catalog-section">
        <div className="catalog-heading">
          <p>{items.length} LEISTUNGEN</p>
          <h2>Wählen Sie die Prüfung, die zu Ihrer Umgebung passt.</h2>
        </div>
        <div className="catalog-grid">
          {items.map((service, index) => (
            <article className="catalog-card" key={service.slug}>
              <div className="catalog-card-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{service.twin ? "International" : "Deutschland"}</span>
              </div>
              <h2>{service.name}</h2>
              <p>{service.appliesTo}</p>
              <a href={`/de/services/${service.slug}`}>
                Leistung ansehen <span aria-hidden="true">⟶</span>
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="catalog-note">
        <p>Die Preise auf den Leistungsseiten sind Richtwerte in Euro, netto. Der endgültige Umfang und Preis hängen von Personen, Komplexität des Unternehmens, technischem Umfang, Qualität der Nachweise und gegebenenfalls erforderlichen unabhängigen Prüfern ab.</p>
        <a href="/de/contact">Umfang besprechen <span aria-hidden="true">⟶</span></a>
      </section>
      <SiteFooterDe />
    </main>
  );
}
