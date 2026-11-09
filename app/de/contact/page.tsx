import ContactFormDe from "../../components/ContactFormDe";
import SiteFooterDe from "../../components/SiteFooterDe";
import SiteHeaderDe from "../../components/SiteHeaderDe";
import { deMetadata, deWebPage } from "../../i18n/locales";

export const metadata = deMetadata({
  title: "Kontakt: Audit-Umfang besprechen",
  description: "Sprechen Sie mit Golden Valley Cyber über ISO 27001, NIS2, KRITIS, TISAX, DSGVO oder Penetrationstests. Antwort in der Regel binnen eines Werktags.",
  path: "/de/contact",
});

export default function DeContactPage() {
  const pageData = { "@context": "https://schema.org", "@graph": [deWebPage("/de/contact", "Kontakt", "Kontaktieren Sie Golden Valley Cyber.")] };
  return (
    <main className="inner-page" id="top">
      <SiteHeaderDe />
      <section className="contact-page-hero">
        <div>
          <p className="eyebrow"><span /> KONTAKT GOLDEN VALLEY CYBER</p>
          <h1>Beginnen Sie mit dem Risiko, das Sie verstehen möchten.</h1>
          <p>Sagen Sie uns, was Sie schützen, was sich geändert hat oder wo Sie Gewissheit brauchen. Wir helfen Ihnen, den richtigen ersten Schritt zu finden.</p>
        </div>
        <aside>
          <p>DIREKT PER E-MAIL</p>
          <a href="mailto:hello@gvcyber.com">hello@gvcyber.com</a>
          <span>Wir antworten in der Regel innerhalb eines Werktags.</span>
        </aside>
      </section>
      <section className="contact-form-section">
        <div><p>IHRE ANFRAGE</p><h2>Geben Sie uns genug Kontext, damit das erste Gespräch nützlich wird.</h2></div>
        <ContactFormDe />
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageData) }} />
      <SiteFooterDe />
    </main>
  );
}
