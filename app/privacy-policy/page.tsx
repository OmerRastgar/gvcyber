import type { Metadata } from "next";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Privacy Policy | Golden Valley Cyber",
  description: "Privacy policy for Golden Valley Cyber, a brand of Soft Innovators UK Ltd. How we collect, use, store and protect personal information under UK GDPR.",
  keywords: ["privacy policy", "data protection", "UK GDPR", "Golden Valley Cyber", "Soft Innovators UK Ltd"],
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | Golden Valley Cyber",
    description: "How Golden Valley Cyber collects, uses, stores and protects personal information under UK GDPR.",
    url: "/privacy-policy",
    siteName: "Golden Valley Cyber",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "Privacy Policy | Golden Valley Cyber" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Golden Valley Cyber",
    description: "How we collect, use, store and protect personal information.",
    images: ["/og.png"],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="inner-page" id="top">
      <SiteHeader />
      <section className="inner-hero">
        <div>
          <p className="eyebrow"><span /> PRIVACY POLICY</p>
          <h1>Privacy Policy</h1>
        </div>
        <p>How Golden Valley Cyber collects, uses, stores and protects personal information. Last updated August 2026.</p>
      </section>

      <section className="legal-body">
        <article>
          <h2>1. Who we are</h2>
          <p>
            Golden Valley Cyber is a trading brand of Soft Innovators UK Ltd. For the purposes of the UK
            General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018, Soft Innovators
            UK Ltd is the data controller responsible for personal information collected through this website.
          </p>
          <p>
            Soft Innovators UK Ltd<br />
            Frogmore House<br />
            6 Ormond Place<br />
            Cheltenham, GL50 1JD, United Kingdom
          </p>
          <p>Registered in England &amp; Wales, company number 06890751.</p>
        </article>

        <article>
          <h2>2. Information we collect</h2>
          <p>
            We collect only the information necessary to respond to enquiries, deliver services and operate
            this website securely. This may include:
          </p>
          <ul>
            <li>Your name and contact details when you use our contact form.</li>
            <li>Your email address when you contact us directly.</li>
            <li>The subject and content of any message you send us.</li>
            <li>Technical information such as IP address, browser type and pages visited, collected through strictly necessary cookies and analytics.</li>
          </ul>
        </article>

        <article>
          <h2>3. How we use your information</h2>
          <p>We use personal information to:</p>
          <ul>
            <li>Respond to enquiries and provide requested services.</li>
            <li>Communicate with you about security audits, ISO 27001 implementation, application security, vulnerability scanning and penetration testing.</li>
            <li>Maintain the security and integrity of this website.</li>
            <li>Meet our legal and regulatory obligations.</li>
          </ul>
          <p>We do not sell personal information to third parties.</p>
        </article>

        <article>
          <h2>4. Legal basis for processing</h2>
          <p>We process personal information on the following legal bases:</p>
          <ul>
            <li><strong>Consent</strong> — where you have given consent for optional cookies or marketing communications.</li>
            <li><strong>Contract</strong> — where processing is necessary to respond to an enquiry or provide a service.</li>
            <li><strong>Legitimate interests</strong> — where processing is necessary to operate and secure our business, and does not override your rights.</li>
            <li><strong>Legal obligation</strong> — where we are required to retain information by law.</li>
          </ul>
        </article>

        <article>
          <h2>5. Cookies</h2>
          <p>
            We use strictly necessary cookies to keep this website secure and functional. With your consent,
            we may also use analytics and customisation cookies. You can manage your preferences at any time
            through the cookie banner and withdraw consent for non-essential cookies.
          </p>
        </article>

        <article>
          <h2>6. Sharing your information</h2>
          <p>
            We do not sell or trade personal information. We may share information with trusted service
            providers who help us operate this website and deliver services, under contracts that require
            them to protect your information and process it only on our instructions.
          </p>
        </article>

        <article>
          <h2>7. Data retention</h2>
          <p>
            We retain personal information only for as long as necessary to fulfil the purposes described in
            this policy, or as required by applicable law.
          </p>
        </article>

        <article>
          <h2>8. Your rights</h2>
          <p>Under UK data protection law, you have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Request erasure of your information.</li>
            <li>Object to or restrict certain processing.</li>
            <li>Withdraw consent at any time.</li>
            <li>Lodge a complaint with the Information Commissioner&apos;s Office (ICO).</li>
          </ul>
        </article>

        <article>
          <h2>9. Security</h2>
          <p>
            We apply appropriate technical and organisational measures to protect personal information
            against unauthorised access, alteration, disclosure or destruction.
          </p>
        </article>

        <article>
          <h2>10. Contact</h2>
          <p>
            To exercise your rights or ask about this policy, contact us at{" "}
            <a href="mailto:hello@gvcyber.com">hello@gvcyber.com</a> or write to the registered address above.
          </p>
        </article>
      </section>

      <SiteFooter />
    </main>
  );
}
