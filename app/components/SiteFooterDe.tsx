export default function SiteFooterDe() {
  return (
    <footer>
      <div className="footer-main">
        <a className="brand footer-brand" href="/de" aria-label="Golden Valley Cyber Startseite">
          <img src="/logo.png" alt="Golden Valley Cyber" width="490" height="147" />
        </a>
        <div className="footer-links">
          <a href="/de/services/audits">Audit &amp; Compliance</a>
          <a href="/de/services/kritis-nis2">KRITIS &amp; NIS2</a>
          <a href="/de/services/vulnerability-scanning">Schwachstellenscans</a>
          <a href="/de/services/penetration-testing">Penetrationstests</a>
        </div>
        <div className="footer-links">
          <a href="/de/services">Alle Leistungen</a>
          <a href="/de/contact">Kontakt</a>
          <a href="/">English site</a>
        </div>
        <div className="footer-legal">
          <div className="footer-legal-address">
            <strong>Soft Innovators (UK) Ltd</strong>
            <span>Frogmore House, 6 Ormond Place, Cheltenham, GL50 1JD, Vereinigtes Königreich</span>
            <span>Eingetragen in England &amp; Wales · Company Number 06890751</span>
          </div>
          <a className="footer-privacy-link" href="/de/impressum">Impressum <span aria-hidden="true">⟶</span></a>
          <a className="footer-privacy-link" href="/de/datenschutz">Datenschutz <span aria-hidden="true">⟶</span></a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Golden Valley Cyber. Alle Rechte vorbehalten.</span>
        <span>
          Eine Marke von{" "}
          <a href="https://www.softinnovators.com/" target="_blank" rel="noreferrer">
            Soft Innovators
          </a>
        </span>
        <a href="#top">Nach oben ↑</a>
      </div>
    </footer>
  );
}
