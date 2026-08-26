import { socials } from "../data/socials";

export default function SiteFooter() {
  return (
    <footer>
      <div className="footer-main">
        <a className="brand footer-brand" href="/" aria-label="Golden Valley Cyber home">
          <img src="/logo.png" alt="Golden Valley Cyber" width="885" height="133" />
        </a>
        <div className="footer-links">
          <a href="/services/audits">Audits</a>
          <a href="/services/vulnerability-scanning">Vulnerability scanning</a>
          <a href="/services/penetration-testing">Penetration testing</a>
          <a href="/global-standards">Global standards</a>
          <a href="/product-studio">Product Studio</a>
          <a href="/expert-suggestions">Expert suggestions</a>
        </div>
        <div className="footer-links">
          <a href="/industries">Industries</a>
          <a href="/solutions">Solutions</a>
          <a href="/msp">MSP partners</a>
          <a href="/case-studies">Case studies</a>
          <a href="/careers">Careers</a>
          <a href="/contact">Contact</a>
          <div className="social-links" aria-label="Golden Valley Cyber social links">
            {socials.map((social) => (
              <a href={social.href} target="_blank" rel="noreferrer" key={social.label}>{social.label}</a>
            ))}
          </div>
        </div>
        <div className="footer-legal">
          <div className="footer-legal-address">
            <strong>Soft Innovators UK Ltd</strong>
            <span>Frogmore House, 6 Ormond Place, Cheltenham, GL50 1JD, UK</span>
            <span>Registered in England &amp; Wales · Company Number 06890751</span>
          </div>
          <a className="footer-privacy-link" href="/privacy-policy">Privacy Policy <span aria-hidden="true">⟶</span></a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Golden Valley Cyber. All rights reserved.</span>
        <span>
          A brand of{" "}
          <a href="https://www.softinnovators.com/" target="_blank" rel="noreferrer">
            Soft Innovators
          </a>
        </span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
