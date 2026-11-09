import SiteFooterDe from "../../components/SiteFooterDe";
import SiteHeaderDe from "../../components/SiteHeaderDe";
import { IMPRESSUM, DE_READY } from "../../data/de/company";
import { deMetadata, deWebPage } from "../../i18n/locales";

export const metadata = deMetadata({
  title: "Datenschutzerklärung",
  description: "Wie Golden Valley Cyber, eine Marke der Soft Innovators (UK) Ltd, personenbezogene Daten auf dieser Website nach der DSGVO verarbeitet, speichert und schützt.",
  path: "/de/datenschutz",
});

export default function DatenschutzPage() {
  const pageData = { "@context": "https://schema.org", "@graph": [deWebPage("/de/datenschutz", "Datenschutzerklärung", "Informationen nach Art. 13 DSGVO.")] };
  return (
    <main className="inner-page" id="top">
      <SiteHeaderDe />
      <section className="inner-hero">
        <div>
          <p className="eyebrow"><span /> DATENSCHUTZ</p>
          <h1>Datenschutzerklärung</h1>
        </div>
        <p>Informationen nach Art. 13 DSGVO zur Verarbeitung personenbezogener Daten auf dieser Website. Stand: November 2026.</p>
      </section>

      <section className="legal-body">
        {!DE_READY && (
          <article>
            <p><strong>ENTWURF.</strong> Dieser Text ist vor der Veröffentlichung von einer deutschen Rechtsanwältin oder einem deutschen Rechtsanwalt zu prüfen. Mit [PRÜFEN] markierte Stellen sind offene Punkte.</p>
          </article>
        )}

        <article>
          <h2>1. Verantwortlicher</h2>
          <p>
            Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:<br />
            {IMPRESSUM.legalName} (Marke {IMPRESSUM.tradingAs})<br />
            {IMPRESSUM.addressLines.join(", ")}<br />
            Registernummer {IMPRESSUM.companyNumber} (England und Wales)<br />
            E-Mail: <a href={`mailto:${IMPRESSUM.email}`}>{IMPRESSUM.email}</a>
          </p>
          <p>Datenschutzbeauftragter: [PRÜFEN: Ist ein Datenschutzbeauftragter benannt oder besteht keine Pflicht? Angabe ergänzen.]</p>
          <p>Vertreter in der Union nach Art. 27 DSGVO: [PRÜFEN: Ist ein Vertreter in der EU zu benennen? Angabe ergänzen.]</p>
        </article>

        <article>
          <h2>2. Aufruf der Website, Hosting und Server-Logdateien</h2>
          <p>
            Beim Aufruf dieser Website werden technisch bedingt Daten verarbeitet, insbesondere IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browsertyp und Betriebssystem. Die Website wird über die Infrastruktur von Cloudflare ausgeliefert, die in unserem Auftrag Anfragen entgegennimmt und Inhalte bereitstellt. Die Verarbeitung dient dem sicheren und stabilen Betrieb (Art. 6 Abs. 1 lit. f DSGVO, berechtigtes Interesse).
          </p>
          <p>[PRÜFEN: Auftragsverarbeitungsvertrag mit Cloudflare und Grundlage für Übermittlungen in Drittländer bestätigen.]</p>
        </article>

        <article>
          <h2>3. Kontaktaufnahme (Formular und E-Mail)</h2>
          <p>
            Wenn Sie uns über das Kontaktformular oder per E-Mail schreiben, verarbeiten wir Ihren Namen, Ihre E-Mail-Adresse, den Betreff und Ihre Nachricht, um Ihre Anfrage zu beantworten (Art. 6 Abs. 1 lit. b oder lit. f DSGVO). Das Kontaktformular wird über den Dienst Formspree (Formspree, Inc., USA) verarbeitet, der als Auftragsverarbeiter für uns tätig ist.
          </p>
          <p>[PRÜFEN: Rechtsgrundlage der Übermittlung in die USA (z. B. EU-US Data Privacy Framework oder Standardvertragsklauseln) und Auftragsverarbeitungsvertrag mit Formspree bestätigen.]</p>
        </article>

        <article>
          <h2>4. Cookies, lokale Speicherung und Einwilligung</h2>
          <p>
            Wir speichern in Ihrem Browser (Local Storage) Ihre Einwilligungsentscheidung (<code>gvcyber-cookie-consent</code>) sowie Ihre Auswahl von Region und Sprache (<code>gvcyber-region</code>, <code>gvcyber-locale</code>). Diese Speicherung dient dazu, Ihre Entscheidungen beim nächsten Besuch zu berücksichtigen. Nicht erforderliche Technologien, etwa Reichweitenmessung, setzen wir nur nach Ihrer Einwilligung ein (§ 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a DSGVO). Sie können Ihre Einwilligung jederzeit über das Cookie-Banner widerrufen oder ändern.
          </p>
          <p>[PRÜFEN: Einordnung der Speicherung von Region und Sprache als erforderlich nach § 25 Abs. 2 TDDDG. Außerdem prüfen, ob die vom Hosting-Anbieter eingebundene Reichweitenmessung (Cloudflare Web Analytics) ohne vorherige Einwilligung zulässig ist oder erst nach Einwilligung geladen werden muss.]</p>
        </article>

        <article>
          <h2>5. Sprachvorschlag anhand des Standorts</h2>
          <p>
            Damit wir Besucherinnen und Besuchern aus Deutschland, Österreich und der Schweiz die deutsche Version vorschlagen können, ermittelt die Infrastruktur von Cloudflare anhand der IP-Adresse das Land Ihres Zugriffs. Das Ergebnis wird nur für den Sprachvorschlag in Ihrem Browser verwendet, nicht gespeichert und nicht mit anderen Daten verknüpft (Art. 6 Abs. 1 lit. f DSGVO). Wir leiten Sie nicht automatisch weiter.
          </p>
        </article>

        <article>
          <h2>6. Empfänger und Übermittlung in Drittländer</h2>
          <p>
            Empfänger sind die genannten Dienstleister (Cloudflare, Formspree) im Rahmen der Auftragsverarbeitung. Der Verantwortliche hat seinen Sitz im Vereinigten Königreich. Für das Vereinigte Königreich besteht ein Angemessenheitsbeschluss der Europäischen Kommission. [PRÜFEN: Aktuellen Stand und Geltungsdauer des Beschlusses bestätigen.]
          </p>
        </article>

        <article>
          <h2>7. Speicherdauer</h2>
          <p>
            Wir speichern personenbezogene Daten nur so lange, wie es für die genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Anfragen löschen wir, sobald sie abschließend bearbeitet sind und keine gesetzlichen Aufbewahrungsfristen entgegenstehen. [PRÜFEN: konkrete Fristen ergänzen.]
          </p>
        </article>

        <article>
          <h2>8. Ihre Rechte</h2>
          <p>Sie haben nach der DSGVO folgende Rechte:</p>
          <ul>
            <li>Auskunft über Ihre gespeicherten Daten (Art. 15),</li>
            <li>Berichtigung unrichtiger Daten (Art. 16),</li>
            <li>Löschung (Art. 17) und Einschränkung der Verarbeitung (Art. 18),</li>
            <li>Datenübertragbarkeit (Art. 20),</li>
            <li>Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21),</li>
            <li>Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3),</li>
            <li>Beschwerde bei einer Datenschutz-Aufsichtsbehörde (Art. 77), etwa am Ort Ihres Aufenthalts oder Arbeitsplatzes. Eine Übersicht der Behörden finden Sie auf <a href="https://www.bfdi.bund.de" target="_blank" rel="noreferrer">bfdi.bund.de</a>. Zuständig für uns als Verantwortlichen im Vereinigten Königreich ist außerdem der Information Commissioner&apos;s Office (ICO).</li>
          </ul>
          <p>Zur Ausübung Ihrer Rechte schreiben Sie an <a href={`mailto:${IMPRESSUM.email}`}>{IMPRESSUM.email}</a>.</p>
        </article>

        <article>
          <h2>9. Sicherheit</h2>
          <p>Die Übertragung erfolgt verschlüsselt über HTTPS. Wir treffen angemessene technische und organisatorische Maßnahmen, um personenbezogene Daten vor unbefugtem Zugriff, Veränderung, Offenlegung oder Zerstörung zu schützen.</p>
        </article>

        <article>
          <h2>10. Aktualität</h2>
          <p>Wir passen diese Erklärung an, wenn sich unsere Verarbeitung oder die Rechtslage ändert. Es gilt die jeweils hier veröffentlichte Fassung.</p>
        </article>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageData) }} />
      <SiteFooterDe />
    </main>
  );
}
