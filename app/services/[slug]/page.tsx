import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import PricingPanels from "../../components/PricingPanels";
import { categoryContent, getService, services } from "../../data/services";
import { clip, lowerFirst, pageTitle } from "../../lib/seo";
import { buildServiceFaqs } from "../../lib/faq";

type ServicePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

const lead: Record<string, (name: string, appliesTo: string) => string> = {
  audits: (name, appliesTo) => `${name} audit and readiness support for ${lowerFirst(appliesTo)}.`,
  "vulnerability-scanning": (name, appliesTo) => `${name} for ${lowerFirst(appliesTo)}, with findings validated so real exposure stands out.`,
  "penetration-testing": (name, appliesTo) => `${name} for ${lowerFirst(appliesTo)}, led by people who show how an attacker would get in.`,
};

function describe(service: { name: string; appliesTo: string; risk: string; category: string }, label: string) {
  const intro = (lead[service.category] ?? ((n: string) => `${n} from Golden Valley Cyber.`))(service.name, service.appliesTo);
  return clip(`${intro} ${service.risk}`) || label;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const category = categoryContent[service.category];
  return {
    title: pageTitle(service.name, category.label, service.shortName),
    description: describe(service, category.label),
    keywords: [
      service.name,
      service.shortName ?? service.name,
      category.label,
      `${service.name} UK`,
      "Golden Valley Cyber",
    ],
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${pageTitle(service.name, category.label, service.shortName)} | Golden Valley Cyber`,
      description: describe(service, category.label),
      url: `https://gvcyber.com/services/${service.slug}`,
      siteName: "Golden Valley Cyber",
      locale: "en_GB",
      type: "website",
      images: [{ url: "/og-gvcyber.png", width: 1672, height: 941, alt: `${service.name} | Golden Valley Cyber` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle(service.name, category.label, service.shortName)} | Golden Valley Cyber`,
      description: `${service.name} support from Golden Valley Cyber for ${lowerFirst(service.appliesTo)}.`,
      images: ["/og-gvcyber.png"],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const category = categoryContent[service.category];
  const faqs = buildServiceFaqs(service);
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.name,
        url: `https://gvcyber.com/services/${service.slug}`,
        provider: { "@id": "https://gvcyber.com/#organization" },
        serviceType: category.label,
        areaServed: service.region,
        audience: service.appliesTo,
        description: `${service.name} support for ${service.appliesTo}. ${service.risk}`,
        offers: { "@type": "Offer", priceCurrency: service.price.startsWith("£") ? "GBP" : "USD", description: service.price },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Services", item: "https://gvcyber.com/services" },
          { "@type": "ListItem", position: 2, name: category.label, item: `https://gvcyber.com/services/${service.category}` },
          { "@type": "ListItem", position: 3, name: service.name, item: `https://gvcyber.com/services/${service.slug}` },
        ],
      },
    ],
  };

  return (
    <main className="inner-page service-detail-page" id="top">
      <SiteHeader />
      <section className="service-detail-hero">
        <div className="service-breadcrumbs">
          <a href="/services">Services</a><span>/</span>
          <a href={`/services/${service.category}`}>{category.label}</a>
        </div>
        <div className="service-detail-title">
          <p className="eyebrow"><span /> {category.label.toUpperCase()}</p>
          <h1>{service.name}</h1>
        </div>
        <div className="service-detail-summary">
          <p>Built for</p>
          <h2>{service.appliesTo}</h2>
          <span>{service.region}</span>
        </div>
      </section>

      <PricingPanels
        category={service.category}
        risk={service.risk}
        price={service.price}
        priceDetails={service.priceDetails}
        formalPrice={service.formalPrice}
        formalDetails={service.formalDetails}
      />

      <section className="delivery-section">
        <div>
          <p className="eyebrow"><span /> A CLEARER ENGAGEMENT</p>
          <h2>From scope to evidence, without the guesswork.</h2>
        </div>
        <ol>
          <li><span>01</span><div><h3>Define the scope</h3><p>We agree the systems, locations, stakeholders and assurance outcome before work begins.</p></div></li>
          <li><span>02</span><div><h3>Assess and validate</h3><p>Our team gathers evidence, tests what matters and separates genuine risk from noise.</p></div></li>
          <li><span>03</span><div><h3>Make action obvious</h3><p>You receive prioritised findings, practical remediation guidance and a clear route to closure.</p></div></li>
        </ol>
      </section>

      <section className="service-faq" aria-labelledby="service-faq-heading">
        <div>
          <h2 id="service-faq-heading">{service.shortName ?? service.name}: common questions</h2>
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
        <div><p>START A CONVERSATION</p><h2>Ready to scope your {service.shortName ?? service.name} engagement?</h2></div>
        <a href={`/contact?service=${service.slug}`}>Scope this service <span aria-hidden="true">⟶</span></a>
      </section>
      <p className="pricing-disclaimer">Indicative planning ranges only. Final pricing depends on the agreed scope, including people, business complexity and technology footprint. Currency conversion notes use rounded planning rates checked on 20 August 2026: 1 USD ≈ £0.74. Regulatory readiness support is not legal advice.</p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }} />
      <SiteFooter />
    </main>
  );
}
