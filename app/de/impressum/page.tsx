import SiteFooterDe from "../../components/SiteFooterDe";
import SiteHeaderDe from "../../components/SiteHeaderDe";
import { IMPRESSUM, DE_READY, impressumMissing, placeholder } from "../../data/de/company";
import { deMetadata, deWebPage } from "../../i18n/locales";

export const metadata = deMetadata({
  title: "Impressum",
  description: "Anbieterkennzeichnung nach § 5 DDG für Golden Valley Cyber, eine Marke der Soft Innovators UK Ltd, Cheltenham, Vereinigtes Königreich.",
  path: "/de/impressum",
});

export default function ImpressumPage() {
  const pageData = { "@context": "https://schema.org", "@graph": [deWebPage("/de/impressum", "Impressum", "Anbieterkennzeichnung nach § 5 DDG.")] };
  return (
    <main className="inner-page" id="top">
      <SiteHeaderDe />
      <section className="inner-hero">
        <div>
          <p className="eyebrow"><span /> IMPRESSUM</p>
          <h1>Impressum</h1>
        </div>
        <p>Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG).</p>
      </section>

      <section className="legal-body">
        {!DE_READY && (
          <article>
            <p><strong>ENTWURF.</strong> Vor der Veröffentlichung fehlen noch: {impressumMissing.join(", ")}. Dieser Text ist von einer deutschen Rechtsanwältin oder einem deutschen Rechtsanwalt zu prüfen.</p>
          </article>
        )}

        <article>
          <h2>Anbieter</h2>
          <p>
            {IMPRESSUM.legalName}<br />
            handelnd unter der Marke {IMPRESSUM.tradingAs}<br />
            {IMPRESSUM.addressLines.map((line) => (<span key={line}>{line}<br /></span>))}
          </p>
          <p>Rechtsform: {IMPRESSUM.legalForm}.</p>
          <p>Registernummer: {IMPRESSUM.companyNumber} (Companies House, England und Wales).</p>
        </article>

        <article>
          <h2>Vertretungsberechtigt</h2>
          <p>{IMPRESSUM.directors || placeholder("Name der vertretungsberechtigten Personen (Directors)")}</p>
        </article>

        <article>
          <h2>Kontakt</h2>
          <p>
            E-Mail: <a href={`mailto:${IMPRESSUM.email}`}>{IMPRESSUM.email}</a><br />
            Telefon: {IMPRESSUM.phone || placeholder("Telefonnummer")}
          </p>
        </article>

        <article>
          <h2>Umsatzsteuer-Identifikationsnummer</h2>
          <p>
            {IMPRESSUM.vatId
              ? `Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: ${IMPRESSUM.vatId}`
              : IMPRESSUM.vatIdNotApplicable
                ? "Eine Umsatzsteuer-Identifikationsnummer nach § 27a Umsatzsteuergesetz liegt nicht vor."
                : placeholder("USt-IdNr. nach § 27a UStG oder Hinweis, dass keine vorhanden ist")}
          </p>
        </article>

        <article>
          <h2>Verantwortlich für den Inhalt</h2>
          <p>Verantwortlich nach § 18 Abs. 2 Medienstaatsvertrag (MStV): {IMPRESSUM.contentResponsible || placeholder("Name und Anschrift der verantwortlichen Person")}</p>
        </article>

        <article>
          <h2>Haftung für Inhalte</h2>
          <p>Wir erstellen die Inhalte dieser Website mit Sorgfalt. Für die Richtigkeit, Vollständigkeit und Aktualität übernehmen wir jedoch keine Gewähr. Die Informationen auf dieser Website stellen keine Rechtsberatung dar.</p>
        </article>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageData) }} />
      <SiteFooterDe />
    </main>
  );
}
