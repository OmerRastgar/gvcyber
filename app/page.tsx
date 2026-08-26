import type { Metadata } from "next";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { caseStudies } from "./data/caseStudies";

export const metadata: Metadata = {
  title: "Golden Valley Cyber | Security Audits, ISO 27001, Pentesting and Vulnerability Scanning",
  description: "Golden Valley Cyber provides ISO audit support, ISO 27001 implementation, security audits, application security testing, penetration testing and vulnerability scanning.",
  keywords: [
    "ISO audit",
    "ISO 27001",
    "ISO 27001 implementation",
    "security audit",
    "application security",
    "vulnerability scanning",
    "penetration testing",
    "Cyber Essentials",
    "PCI DSS readiness",
    "SOC 2 readiness",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Golden Valley Cyber | Security Audits, ISO 27001, Pentesting and Vulnerability Scanning",
    description: "ISO audit support, ISO 27001 implementation, security audits, application security testing, penetration testing and vulnerability scanning.",
    url: "https://gvcyber.com",
    siteName: "Golden Valley Cyber",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "Golden Valley Cyber — Sovereign digital resilience." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Golden Valley Cyber | Security Audits, ISO 27001, Pentesting and Vulnerability Scanning",
    description: "ISO audit support, ISO 27001 implementation, security audits, application security testing, penetration testing and vulnerability scanning.",
    images: ["/og.png"],
  },
};

const offers = [
  {
    id: "industries",
    icon: "◉",
    title: "Industries",
    copy: "Security shaped around your operational reality, regulatory pressure and the systems your organisation depends on.",
    items: ["Financial services", "Healthcare", "Technology & SaaS", "Public sector", "Retail & eCommerce", "Critical infrastructure"],
    href: "/industries",
  },
  {
    id: "services",
    icon: "✣",
    title: "Services",
    copy: "Clear, evidence-led security services that reveal exposure, test resilience and make the next action obvious.",
    items: ["Security audits", "Penetration testing", "Vulnerability scanning", "Cyber Essentials", "ISO 27001", "SOC 2 readiness"],
    href: "/services",
  },
  {
    id: "solutions",
    icon: "⊞",
    title: "Solutions",
    copy: "Practical programmes that turn one-off findings into stronger controls, better visibility and continuous resilience.",
    items: ["Assurance readiness", "Attack surface clarity", "Secure product delivery", "Continuous resilience"],
    href: "/solutions",
  },
];

const trustItems = [
  { name: "Cubercore", href: "https://cubercore.com/" },
  { name: "Sakoon", href: "https://sakoon.com.pk/" },
  { name: "Bluebird Paints", href: "https://bluebirdpaints.com/" },
  { name: "Meraal", href: "https://www.meraal.me/" },
  { name: "Stratagem Ventures", href: "https://stratagemven.com/" },
  { name: "VectraView", href: "https://vectraview.com/" },
  { name: "MarketLytics", href: "https://marketlytics.com/" },
  { name: "Zairen", href: "https://zairen.co/" },
  { name: "ComplyEncrypt", href: "https://complyencrypt.com/" },
  { name: "Risk Associates", href: "https://riskassociates.com/" },
  { name: "Yottabyte", href: "https://www.yottabyte.ltd/" },
  { name: "Socbyte", href: "https://socbyte.ai/" },
  { name: "Cloudflare", href: "https://www.cloudflare.com/" },
  { name: "Google", href: "https://www.google.com/" },
  { name: "Microsoft", href: "https://www.microsoft.com/" },
];

const searchServices = [
  { title: "ISO audit and ISO 27001 implementation", href: "/services/iso-27001", copy: "Gap assessment, ISMS controls, evidence preparation and readiness support for certification." },
  { title: "Application security testing", href: "/services/web-application-penetration-testing", copy: "Web application and API testing for teams that need clear findings and practical remediation." },
  { title: "Vulnerability scanning", href: "/services/vulnerability-scanning", copy: "Network, host, database, cloud and authenticated scanning with validation of real exposure." },
  { title: "Penetration testing", href: "/services/penetration-testing", copy: "Manual testing across web, mobile, network, cloud, wireless and social engineering scenarios." },
  { title: "Cyber Essentials and PCI DSS readiness", href: "/services/audits", copy: "Preparation for common audit and compliance requirements without overstating certification outcomes." },
  { title: "Cloud security review", href: "/services/cloud-infrastructure-penetration-testing", copy: "Review of IAM, storage, exposed services, container images and cloud configuration risks." },
];

const homepageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: "Golden Valley Cyber",
      url: "https://gvcyber.com",
      description: "Security audit, ISO 27001 implementation, application security testing, vulnerability scanning and penetration testing services.",
      areaServed: ["Global", "United Kingdom"],
      serviceType: [
        "ISO audit",
        "ISO 27001 implementation",
        "security audit",
        "application security testing",
        "vulnerability scanning",
        "penetration testing",
        "Cyber Essentials readiness",
        "PCI DSS readiness",
        "SOC 2 readiness",
      ],
    },
    {
      "@type": "ItemList",
      name: "Golden Valley Cyber security services",
      itemListElement: searchServices.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        url: `https://gvcyber.com${service.href}`,
      })),
    },
  ],
};

function Arrow() {
  return <span aria-hidden="true">⟶</span>;
}

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero reference-hero" id="top">
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> CYBER SECURITY CONSULTANCY</p>
          <h1>Sovereign digital<br />resilience.</h1>
          <p className="hero-intro">
            Deterministic, audit-ready security — built on the heritage of the
            UK&apos;s cyber cluster, without generative-AI opacity.
          </p>
          <a className="reference-link" href="/services">Explore what we do <Arrow /></a>
        </div>

        <a className="globe-stage globe-stage-link" href="/global-standards" aria-label="Open interactive global cyber standards explorer">
          <div className="globe-sequence globe-preview">
            <img
              alt="Globe preview with cyber security standards by region"
              draggable="false"
              height="640"
              src="/globe-frames/frame-000.png"
              width="640"
              fetchPriority="high"
              decoding="async"
            />
            <div className="globe-readable-label globe-readable-us" aria-hidden="true">
              <strong>UNITED STATES</strong>
              <span>NIST</span>
              <span>SOC 2</span>
              <span>PCI DSS</span>
            </div>
            <div className="globe-readable-label globe-readable-uk" aria-hidden="true">
              <strong>UNITED KINGDOM</strong>
              <span>Cyber Essentials</span>
              <span>ISO 27001</span>
            </div>
            <div className="globe-readable-label globe-readable-eu" aria-hidden="true">
              <strong>EUROPE</strong>
              <span>GDPR</span>
              <span>DORA</span>
            </div>
          </div>
          <span className="globe-open-link">Explore global standards <Arrow /></span>
        </a>
      </section>

      <section className="trust-strip" aria-label="Trusted by customers and partners">
        <p>TRUSTED BY CUSTOMERS AND PARTNERS</p>
        <div className="trust-window">
          <div className="trust-track">
            {[...trustItems, ...trustItems].map((item, index) => (
              <a href={item.href} target="_blank" rel="noreferrer" key={`${item.name}-${index}`}>{item.name}</a>
            ))}
          </div>
        </div>
      </section>

      <section className="offers" aria-label="Golden Valley Cyber industries, services and solutions">
        {offers.map((offer) => (
          <article className="offer-column" id={offer.id} key={offer.title}>
            <div className="offer-title">
              <span className="offer-icon" aria-hidden="true">{offer.icon}</span>
              <h2>{offer.title}</h2>
            </div>
            <p>{offer.copy}</p>
            <div className="offer-pills">
              {offer.items.map((item) => <a href={offer.href} key={item}>{item}</a>)}
            </div>
            <a className="offer-explore" href={offer.href}>Explore all {offer.title.toLowerCase()} <Arrow /></a>
          </article>
        ))}
      </section>

      <section className="about-statement" id="about">
        <p>Golden Valley Cyber turns technical exposure into verifiable, deterministic security decisions. We look deeper, explain plainly and focus on the risks that can genuinely affect your organisation.</p>
      </section>

      <section className="search-services" aria-label="Common Golden Valley Cyber security services">
        <div className="reference-section-title">
          <h2>Security work people search for</h2>
          <a href="/services">See services <Arrow /></a>
        </div>
        <div className="search-service-grid">
          {searchServices.map((service) => (
            <article key={service.title}>
              <h3><a href={service.href}>{service.title}</a></h3>
              <p>{service.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="stories reference-stories" id="stories">
        <div className="reference-section-title">
          <h2>Client stories</h2>
          <a href="/case-studies">See all client stories <Arrow /></a>
        </div>
        <div className="story-grid">
          {caseStudies.map((story, index) => (
            <article className="story-card" key={story.title}>
              <div className={`story-visual story-visual-${index + 1}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div className="story-grid-lines" aria-hidden="true" />
              </div>
              <div className="story-copy">
                <p className="story-type">{story.sector.toUpperCase()} · REPRESENTATIVE ENGAGEMENT</p>
                <h3>{story.title}</h3>
                <p>{story.summary}</p>
                <a href={`/case-studies/${story.slug}`} aria-label={`Read: ${story.title}`}>Read the story <Arrow /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact reference-contact" id="contact">
        <div>
          <p className="eyebrow"><span /> HOW CAN WE HELP?</p>
          <h2>Let&apos;s make your<br />next move secure.</h2>
        </div>
        <div className="contact-side">
          <p>Tell us what you&apos;re protecting, what&apos;s changing, or where you need certainty. We&apos;ll help you find the right first step.</p>
          <a className="reference-link" href="/contact">Contact Golden Valley Cyber <Arrow /></a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageStructuredData) }} />
      <SiteFooter />
    </main>
  );
}
