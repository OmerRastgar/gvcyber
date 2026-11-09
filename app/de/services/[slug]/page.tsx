import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PricingPanelsDe from "../../../components/PricingPanelsDe";
import SiteFooterDe from "../../../components/SiteFooterDe";
import SiteHeaderDe from "../../../components/SiteHeaderDe";
import { deCategoryContent, deServices, getDeService } from "../../../data/de/services";
import { deMetadata, deWebPage } from "../../../i18n/locales";
import { buildServiceFaqsDe } from "../../../lib/faqDe";
import { clip, pageTitle } from "../../../lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return deServices.map((service) => ({ slug: service.slug }));
}

function describe(service: { name: string; appliesTo: string; risk: string }) {
  const candidates = [
    `${service.name} für ${service.appliesTo}. ${service.risk}`,
    `${service.name} für ${service.appliesTo}.`,
    `${service.name} von Golden Valley Cyber. ${service.risk}`,
    `${service.name} von Golden Valley Cyber, Cheltenham (UK), für Unternehmen in Deutschland.`,
  ];
  return candidates.find((text) => text.length <= 158) ?? clip(candidates[3]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getDeService(slug);
  if (!service) return {};
  return deMetadata({
    title: pageTitle(service.name, undefined, service.shortName),
    description: describe(service),
    path: `/de/services/${service.slug}`,
    keywords: [service.name, service.shortName ?? service.name, deCategoryContent[service.category].label, "Golden Valley Cyber"],
  });
}

export default async function DeServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getDeService(slug);
  if (!service) notFound();
  const category = deCategoryContent[service.category];
  const faqs = buildServiceFaqsDe(service);
  const path = `/de/services/${service.slug}`;
  const priced = service.price !== "Auf Anfrage";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      deWebPage(path, service.name, describe(service)),
      {
        "@type": "Service",
        name: service.name,
        url: `https://gvcyber.com${path}`,
        inLanguage: "de-DE",
        provider: { "@id": "https://gvcyber.com/#organization" },
        serviceType: category.label,
        areaServed: "DE",
        audience: service.appliesTo,
        description: `${service.name} für ${service.appliesTo}. ${service.risk}`,
        ...(priced ? { offers: { "@type": "Offer", priceCurrency: "EUR", description: service.price } } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Leistungen", item: "https://gvcyber.com/de/services" },
          { "@type": "ListItem", position: 2, name: category.label, item: `https://gvcyber.com${category.hubHref}` },
          { "@type": "ListItem", position: 3, name: service.name, item: `https://gvcyber.com${path}` },
        ],
      },
    ],
  };

  return (
    <main className="inner-page service-detail-page" id="top">
      <SiteHeaderDe />
      <section className="service-detail-hero">
        <div className="service-breadcrumbs">
          <a href="/de/services">Leistungen</a><span>/</span>
          <a href={category.hubHref}>{category.label}</a>
        </div>
        <div className="service-detail-title">
          <p className="eyebrow"><span /> {category.label.toUpperCase()}</p>
          <h1>{service.name}</h1>
        </div>
        <div className="service-detail-summary">
          <p>Gedacht für</p>
          <h2>{service.appliesTo}</h2>
          <span>{service.twin ? "International" : "Für den deutschen Markt"}</span>
        </div>
      </section>

      <PricingPanelsDe
        category={service.category}
        risk={service.risk}
        price={service.price}
        priceDetails={service.priceDetails}
        formalPrice={service.formalPrice}
        formalDetails={service.formalDetails}
      />

      {service.deliverables ? (
        <section className="delivery-section">
          <div>
            <p className="eyebrow"><span /> WAS WIR LIEFERN</p>
            <h2>Konkrete Ergebnisse statt allgemeiner Empfehlungen.</h2>
          </div>
          <ol>
            {service.deliverables.map((item, index) => (
              <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><div><p>{item}</p></div></li>
            ))}
          </ol>
        </section>
      ) : null}

      {service.boundary ? (
        <section className="catalog-note" aria-label="Abgrenzung">
          <p><strong>Abgrenzung:</strong> {service.boundary}</p>
        </section>
      ) : null}

      <section className="delivery-section">
        <div>
          <p className="eyebrow"><span /> EIN KLARER ABLAUF</p>
          <h2>Vom Umfang bis zum Nachweis, ohne Rätselraten.</h2>
        </div>
        <ol>
          <li><span>01</span><div><h3>Umfang klären</h3><p>Wir legen Systeme, Standorte, Beteiligte und das gewünschte Ergebnis fest, bevor die Arbeit beginnt.</p></div></li>
          <li><span>02</span><div><h3>Prüfen und validieren</h3><p>Unser Team erhebt Nachweise, testet das Wesentliche und trennt echtes Risiko von Rauschen.</p></div></li>
          <li><span>03</span><div><h3>Handlungsbedarf klar machen</h3><p>Sie erhalten priorisierte Ergebnisse, praxisnahe Hinweise zur Behebung und einen klaren Weg bis zum Abschluss.</p></div></li>
        </ol>
      </section>

      <section className="service-faq" aria-labelledby="service-faq-heading">
        <div>
          <h2 id="service-faq-heading">{service.shortName ?? service.name}: häufige Fragen</h2>
        </div>
        <div className="service-faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="detail-cta">
        <div><p>GESPRÄCH BEGINNEN</p><h2>Bereit, den Umfang für {service.shortName ?? service.name} festzulegen?</h2></div>
        <a href={`/de/contact?service=${service.slug}`}>Leistung besprechen <span aria-hidden="true">⟶</span></a>
      </section>
      <p className="pricing-disclaimer">Unverbindliche Richtwerte zur Planung. Der endgültige Preis hängt vom vereinbarten Umfang ab, insbesondere von Personen, Komplexität des Unternehmens und technischem Umfang. Unterstützung bei der Vorbereitung auf regulatorische Anforderungen ist keine Rechtsberatung.</p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteFooterDe />
    </main>
  );
}
