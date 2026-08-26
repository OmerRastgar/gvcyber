import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import ServiceCard from "./ServiceCard";
import { categoryContent, getServicesByCategory, type ServiceCategory } from "../data/services";

export default function CategoryPage({ category }: { category: ServiceCategory }) {
  const content = categoryContent[category];
  const items = getServicesByCategory(category);

  return (
    <main className="inner-page" id="top">
      <SiteHeader />
      <section className="inner-hero">
        <div>
          <p className="eyebrow"><span /> {content.label.toUpperCase()}</p>
          <h1>{content.title}</h1>
        </div>
        <p>{content.description}</p>
      </section>
      <section className="catalog-section">
        <div className="catalog-heading">
          <p>{items.length} SERVICES</p>
          <h2>Choose the assessment that fits your environment.</h2>
        </div>
        <div className="catalog-grid">
          {items.map((service, index) => <ServiceCard service={service} index={index} key={service.slug} />)}
        </div>
      </section>
      <section className="catalog-note">
        <p>Pricing shown on individual service pages changes by selected site: USD for Global and GBP for United Kingdom. Final scope and pricing depend on people, business complexity, technology footprint, evidence quality and any independent assessor requirements.</p>
        <a href="mailto:hello@gvcyber.com">Discuss your scope <span aria-hidden="true">⟶</span></a>
      </section>
      <SiteFooter />
    </main>
  );
}
