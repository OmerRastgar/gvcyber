import SiteFooterDe from "../components/SiteFooterDe";
import SiteHeaderDe from "../components/SiteHeaderDe";
import { deMetadata, deWebPage } from "../i18n/locales";

export const metadata = deMetadata({
  title: "Golden Valley Cyber | ISO 27001, NIS2 und Pentests",
  absoluteTitle: true,
  description: "IT-Sicherheitsberatung für Deutschland: ISO 27001 und IT-Grundschutz, NIS2 und KRITIS, TISAX, BSI C5, DSGVO, Penetrationstests und Schwachstellenscans.",
  path: "/de",
  keywords: ["IT-Sicherheit", "ISO 27001", "IT-Grundschutz", "NIS2", "KRITIS", "TISAX", "BSI C5", "DSGVO", "Penetrationstest", "Schwachstellenscan"],
});

const offers = [
  {
    id: "audit",
    icon: "◉",
    title: "Audit & Compliance",
    copy: "Wir zeigen, welche Maßnahmen Sie haben, welche Nachweise fehlen und was bis zur Prüfungsreife zu tun ist.",
    items: [
      { label: "ISO 27001", href: "/de/services/iso-27001" },
      { label: "NIS2", href: "/de/services/nis2" },
      { label: "DSGVO", href: "/de/services/gdpr-compliance" },
      { label: "SOC 2", href: "/de/services/soc-2" },
      { label: "DORA", href: "/de/services/dora" },
    ],
    href: "/de/services/audits",
    cta: "Alle Audits ansehen",
  },
  {
    id: "deutschland",
    icon: "✣",
    title: "Für den deutschen Markt",
    copy: "Rahmenwerke und Nachweise, die Kunden, Aufsicht und Ausschreibungen in Deutschland tatsächlich verlangen.",
    items: [
      { label: "IT-Grundschutz", href: "/de/services/it-grundschutz" },
      { label: "KRITIS & NIS2", href: "/de/services/kritis-nis2" },
      { label: "TISAX", href: "/de/services/tisax" },
      { label: "BSI C5", href: "/de/services/bsi-c5" },
    ],
    href: "/de/services",
    cta: "Alle Leistungen ansehen",
  },
  {
    id: "tests",
    icon: "⊞",
    title: "Tests & Scans",
    copy: "Manuelle Penetrationstests und validierte Schwachstellenscans, mit Ergebnissen, die Ihr Team direkt umsetzen kann.",
    items: [
      { label: "Netzwerk-Pentest", href: "/de/services/network-penetration-testing" },
      { label: "Web-Pentest", href: "/de/services/web-application-penetration-testing" },
      { label: "Cloud-Pentest", href: "/de/services/cloud-infrastructure-penetration-testing" },
      { label: "Netzwerk-Scan", href: "/de/services/network-vulnerability-scanning" },
      { label: "Cloud-Scan", href: "/de/services/cloud-native-vulnerability-scanning" },
    ],
    href: "/de/services/penetration-testing",
    cta: "Alle Tests ansehen",
  },
];

// Frameworks we work with. Names only: no logos and no claim of endorsement or affiliation.
const frameworks = [
  { name: "ISO/IEC 27001", href: "/de/services/iso-27001" },
  { name: "BSI IT-Grundschutz", href: "/de/services/it-grundschutz" },
  { name: "NIS2", href: "/de/services/nis2" },
  { name: "KRITIS", href: "/de/services/kritis-nis2" },
  { name: "TISAX · VDA ISA", href: "/de/services/tisax" },
  { name: "BSI C5", href: "/de/services/bsi-c5" },
  { name: "DSGVO", href: "/de/services/gdpr-compliance" },
  { name: "DORA", href: "/de/services/dora" },
  { name: "SOC 2", href: "/de/services/soc-2" },
  { name: "OWASP", href: "/de/services/web-application-penetration-testing" },
];

const searched = [
  { title: "ISO 27001 auf Basis von IT-Grundschutz", href: "/de/services/it-grundschutz", copy: "Strukturanalyse, Schutzbedarf, Modellierung, IT-Grundschutz-Check und Risikoanalyse für Ihr ISMS." },
  { title: "KRITIS und NIS2-Umsetzung", href: "/de/services/kritis-nis2", copy: "Gap-Analyse, Maßnahmenplan und Vorbereitung auf Nachweise für Betreiber kritischer Infrastrukturen." },
  { title: "TISAX-Vorbereitung", href: "/de/services/tisax", copy: "Gap-Analyse gegen VDA ISA und Umsetzungsbegleitung für Zulieferer der Automobilindustrie." },
  { title: "BSI C5 für Cloud-Anbieter", href: "/de/services/bsi-c5", copy: "Abbildung Ihrer Kontrollen auf den C5-Kriterienkatalog und Vorbereitung auf die Prüfung." },
  { title: "DSGVO-Compliance", href: "/de/services/gdpr-compliance", copy: "VVT, technische und organisatorische Maßnahmen, AVV-Prüfung und Unterstützung bei Datenschutz-Folgenabschätzungen." },
  { title: "Penetrationstests", href: "/de/services/penetration-testing", copy: "Manuelle Tests für Netzwerke, Webanwendungen, Cloud und mobile Apps mit klaren Handlungsempfehlungen." },
];

const pageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    deWebPage("/de", "IT-Sicherheitsberatung für Unternehmen in Deutschland", "ISO 27001, IT-Grundschutz, NIS2, KRITIS, TISAX, BSI C5, DSGVO, Penetrationstests und Schwachstellenscans."),
    {
      "@type": "ItemList",
      name: "Leistungen von Golden Valley Cyber für den deutschen Markt",
      provider: { "@id": "https://gvcyber.com/#organization" },
      itemListElement: searched.map((service, index) => ({ "@type": "ListItem", position: index + 1, name: service.title, url: `https://gvcyber.com${service.href}` })),
    },
  ],
};

function Arrow() {
  return <span aria-hidden="true">⟶</span>;
}

export default function DeHome() {
  return (
    <main>
      <SiteHeaderDe />

      <section className="hero reference-hero" id="top">
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> IT-SICHERHEITSBERATUNG</p>
          <h1>Informations&shy;sicherheit, die Prüfungen standhält.</h1>
          <p className="hero-intro">
            Cybersicherheitsberatung aus Cheltenham, UK, für Unternehmen in Deutschland: ISO 27001 und IT-Grundschutz, NIS2 und KRITIS, TISAX, BSI C5, DSGVO, Penetrationstests und Schwachstellenscans, mit Nachweisen, die Sie prüfen können.
          </p>
          <div className="hero-actions">
            <a className="reference-link reference-link-primary" href="/de/contact">Erstgespräch vereinbaren <Arrow /></a>
            <a className="reference-link" href="/de/services">Leistungen ansehen <Arrow /></a>
          </div>
        </div>

        <div className="globe-stage">
          <div className="globe-sequence globe-preview">
            <img
              alt="Globus mit Cybersicherheits-Standards nach Region"
              draggable="false"
              height="640"
              src="/globe-frames/frame-000.webp"
              width="640"
              fetchPriority="high"
              decoding="async"
            />
            <div className="globe-readable-label globe-readable-us" aria-hidden="true">
              <strong>USA</strong>
              <span>NIST</span>
              <span>SOC 2</span>
              <span>PCI DSS</span>
            </div>
            <div className="globe-readable-label globe-readable-uk" aria-hidden="true">
              <strong>VEREINIGTES KÖNIGREICH</strong>
              <span>Cyber Essentials</span>
              <span>ISO 27001</span>
            </div>
            <div className="globe-readable-label globe-readable-eu" aria-hidden="true">
              <strong>DEUTSCHLAND</strong>
              <span>IT-Grundschutz</span>
              <span>NIS2</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Rahmenwerke, mit denen wir arbeiten">
        <p>RAHMENWERKE, MIT DENEN WIR ARBEITEN</p>
        <div className="trust-window">
          <div className="trust-track">
            {[...frameworks, ...frameworks].map((item, index) => (
              <a href={item.href} key={`${item.name}-${index}`}>{item.name}</a>
            ))}
          </div>
        </div>
      </section>

      <section className="offers" aria-label="Leistungen von Golden Valley Cyber">
        {offers.map((offer) => (
          <article className="offer-column" id={offer.id} key={offer.title}>
            <div className="offer-title">
              <span className="offer-icon" aria-hidden="true">{offer.icon}</span>
              <h2>{offer.title}</h2>
            </div>
            <p>{offer.copy}</p>
            <div className="offer-pills">
              {offer.items.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}
            </div>
            <a className="offer-explore" href={offer.href}>{offer.cta} <Arrow /></a>
          </article>
        ))}
      </section>

      <section className="about-statement" id="about">
        <p>
          Was wir sind und was nicht: Golden Valley Cyber ist eine Marke der Soft Innovators (UK) Ltd mit Sitz in Cheltenham, Vereinigtes Königreich. Wir bereiten Sie auf Audits, Zertifizierungen und Nachweise vor und schließen technische Lücken. Wir sind keine Zertifizierungs- oder Prüfstelle, kein vom BSI zugelassener Prüfdienstleister und stellen weder Zertifikate noch Testate aus.
        </p>
      </section>

      <section className="search-services" aria-label="Häufig gesuchte Leistungen in Deutschland">
        <div className="reference-section-title">
          <h2>Was Unternehmen in Deutschland suchen</h2>
          <a href="/de/services">Alle Leistungen <Arrow /></a>
        </div>
        <div className="search-service-grid">
          {searched.map((service) => (
            <article key={service.title}>
              <h3><a href={service.href}>{service.title}</a></h3>
              <p>{service.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact reference-contact" id="contact">
        <div>
          <p className="eyebrow"><span /> WIE KÖNNEN WIR HELFEN?</p>
          <h2>Lassen Sie uns Ihren<br />nächsten Schritt absichern.</h2>
        </div>
        <div className="contact-side">
          <p>Sagen Sie uns, was Sie schützen, was sich ändert oder wo Sie Gewissheit brauchen. Wir helfen Ihnen, den richtigen ersten Schritt zu finden.</p>
          <a className="reference-link" href="/de/contact">Golden Valley Cyber kontaktieren <Arrow /></a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageStructuredData) }} />
      <SiteFooterDe />
    </main>
  );
}
