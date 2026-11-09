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

const germanOffers = [
  { slug: "it-grundschutz", title: "ISO 27001 auf Basis von IT-Grundschutz", copy: "ISMS-Aufbau nach BSI-Standards: Strukturanalyse, Schutzbedarf, Modellierung, IT-Grundschutz-Check und Risikoanalyse." },
  { slug: "kritis-nis2", title: "KRITIS und NIS2-Umsetzung", copy: "Gap-Analyse, Maßnahmenplan und Vorbereitung auf Nachweise für Betreiber kritischer Infrastrukturen und betroffene Einrichtungen." },
  { slug: "tisax", title: "TISAX-Vorbereitung", copy: "Gap-Analyse gegen VDA ISA und Umsetzungsbegleitung für Zulieferer der Automobilindustrie." },
  { slug: "bsi-c5", title: "BSI C5 für Cloud-Anbieter", copy: "Abbildung Ihrer Kontrollen auf den C5-Kriterienkatalog und Vorbereitung auf die Prüfung." },
  { slug: "gdpr-compliance", title: "DSGVO-Compliance", copy: "VVT, technische und organisatorische Maßnahmen, AVV-Prüfung und Unterstützung bei Datenschutz-Folgenabschätzungen." },
  { slug: "network-penetration-testing", title: "Penetrationstests", copy: "Manuelle Tests für Netzwerke, Webanwendungen, Cloud und mobile Apps mit klaren Handlungsempfehlungen." },
];

const pageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    deWebPage("/de", "IT-Sicherheitsberatung für Unternehmen in Deutschland", "ISO 27001, IT-Grundschutz, NIS2, KRITIS, TISAX, BSI C5, DSGVO, Penetrationstests und Schwachstellenscans."),
    {
      "@type": "ItemList",
      name: "Leistungen von Golden Valley Cyber für den deutschen Markt",
      provider: { "@id": "https://gvcyber.com/#organization" },
      itemListElement: germanOffers.map((offer, index) => ({ "@type": "ListItem", position: index + 1, name: offer.title, url: `https://gvcyber.com/de/services/${offer.slug}` })),
    },
  ],
};

export default function DeHome() {
  return (
    <main className="inner-page" id="top">
      <SiteHeaderDe />

      <section className="inner-hero">
        <div>
          <p className="eyebrow"><span /> IT-SICHERHEITSBERATUNG</p>
          <h1>Informationssicherheit, die Prüfungen standhält.</h1>
        </div>
        <div>
          <p>
            Golden Valley Cyber unterstützt Unternehmen in Deutschland bei ISO 27001 und IT-Grundschutz, NIS2 und KRITIS, TISAX, BSI C5 und DSGVO sowie mit Penetrationstests und Schwachstellenscans, mit Nachweisen, die Sie prüfen können.
          </p>
          <a className="hero-cta" href="/de/contact">Erstgespräch vereinbaren <span aria-hidden="true">⟶</span></a>
        </div>
      </section>

      <section className="catalog-section">
        <div className="catalog-heading">
          <p>FÜR DEN DEUTSCHEN MARKT</p>
          <h2>Anforderungen, die in Deutschland tatsächlich gestellt werden.</h2>
        </div>
        <div className="catalog-grid">
          {germanOffers.map((offer, index) => (
            <article className="catalog-card" key={offer.slug}>
              <div className="catalog-card-top"><span>{String(index + 1).padStart(2, "0")}</span></div>
              <h2>{offer.title}</h2>
              <p>{offer.copy}</p>
              <a href={`/de/services/${offer.slug}`}>Mehr erfahren <span aria-hidden="true">⟶</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="delivery-section">
        <div>
          <p className="eyebrow"><span /> SO ARBEITEN WIR</p>
          <h2>Vom Umfang bis zum Nachweis, ohne Rätselraten.</h2>
        </div>
        <ol>
          <li><span>01</span><div><h3>Umfang klären</h3><p>Wir legen Systeme, Standorte, Beteiligte und das gewünschte Ergebnis fest, bevor die Arbeit beginnt.</p></div></li>
          <li><span>02</span><div><h3>Prüfen und validieren</h3><p>Wir erheben Nachweise, testen das Wesentliche und trennen echtes Risiko von Rauschen.</p></div></li>
          <li><span>03</span><div><h3>Handlungsbedarf klar machen</h3><p>Sie erhalten priorisierte Ergebnisse, praxisnahe Maßnahmen und einen klaren Weg bis zum Abschluss.</p></div></li>
        </ol>
      </section>

      <section className="about-statement" id="about">
        <p>
          Was wir sind und was nicht: Golden Valley Cyber ist eine Marke der Soft Innovators (UK) Ltd mit Sitz in Cheltenham, Vereinigtes Königreich. Wir bereiten Sie auf Audits, Zertifizierungen und Nachweise vor und schließen technische Lücken. Wir sind keine Zertifizierungs- oder Prüfstelle, kein vom BSI zugelassener Prüfdienstleister und stellen weder Zertifikate noch Testate aus.
        </p>
      </section>

      <section className="detail-cta">
        <div><p>NÄCHSTER SCHRITT</p><h2>Sprechen Sie mit uns über Ihren Umfang.</h2></div>
        <a href="/de/contact">Kontakt aufnehmen <span aria-hidden="true">⟶</span></a>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageStructuredData) }} />
      <SiteFooterDe />
    </main>
  );
}
