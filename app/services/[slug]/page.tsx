import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import PricingPanels from "../../components/PricingPanels";
import { categoryContent, getService, services } from "../../data/services";

type ServicePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const category = categoryContent[service.category];
  return {
    title: `${service.name} | ${category.label} | Golden Valley Cyber`,
    description: `${service.name} support from Golden Valley Cyber for ${service.appliesTo.toLowerCase()}. Includes scoping, assessment, evidence, remediation guidance and clear next steps.`,
    keywords: [
      service.name,
      service.shortName ?? service.name,
      category.label,
      "Golden Valley Cyber",
      "security audit",
      "application security",
      "vulnerability scanning",
      "penetration testing",
      "security implementation",
    ],
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | ${category.label} | Golden Valley Cyber`,
      description: `${service.name} support from Golden Valley Cyber for ${service.appliesTo.toLowerCase()}. Includes scoping, assessment, evidence, remediation guidance and clear next steps.`,
      url: `https://gvcyber.com/services/${service.slug}`,
      siteName: "Golden Valley Cyber",
      locale: "en_GB",
      type: "website",
      images: [{ url: "/og.png", width: 1672, height: 941, alt: `${service.name} | Golden Valley Cyber` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} | ${category.label} | Golden Valley Cyber`,
      description: `${service.name} support from Golden Valley Cyber for ${service.appliesTo.toLowerCase()}.`,
      images: ["/og.png"],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const category = categoryContent[service.category];
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.name,
        provider: { "@type": "Organization", name: "Golden Valley Cyber", url: "https://gvcyber.com" },
        serviceType: category.label,
        areaServed: service.region,
        audience: service.appliesTo,
        description: `${service.name} support for ${service.appliesTo}. ${service.risk}`,
        offers: { "@type": "Offer", priceCurrency: "USD", description: service.price },
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

      <section className="detail-cta">
        <div><p>START A CONVERSATION</p><h2>Ready to scope your {service.shortName ?? service.name} engagement?</h2></div>
        <a href="mailto:hello@gvcyber.com">Talk to Golden Valley Cyber <span aria-hidden="true">âŸ¶</span></a>
      </section>
      <p className="pricing-disclaimer">Indicative planning ranges only. Final pricing depends on the agreed scope, including people, business complexity and technology footprint. Currency conversion notes use rounded planning rates checked on 20 August 2026: 1 USD â‰ˆ Â£0.74. Regulatory readiness support is not legal advice.</p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }} />
      <SiteFooter />
    </main>
  );
}
