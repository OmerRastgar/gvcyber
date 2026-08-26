import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Contact Golden Valley Cyber | Scope a Security Audit or Test",
  description: "Contact Golden Valley Cyber to discuss ISO audit support, ISO 27001 implementation, application security testing, vulnerability scanning, penetration testing, compliance automation or an MSP partnership.",
  keywords: ["contact Golden Valley Cyber", "scope security audit", "ISO 27001 implementation", "application security testing", "vulnerability scanning quote", "penetration testing quote", "MSP security partner"],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Golden Valley Cyber | Scope a Security Audit or Test",
    description: "Contact Golden Valley Cyber to discuss ISO audit support, ISO 27001 implementation, application security testing, vulnerability scanning, penetration testing, compliance automation or an MSP partnership.",
    url: "/contact",
    siteName: "Golden Valley Cyber",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "Contact Golden Valley Cyber" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Golden Valley Cyber",
    description: "Scope a security audit or test.",
    images: ["/og.png"],
  },
};

export default function ContactPage() {
  return (
    <main className="inner-page" id="top">
      <SiteHeader />
      <section className="contact-page-hero">
        <div>
          <p className="eyebrow"><span /> CONTACT GOLDEN VALLEY CYBER</p>
          <h1>Start with the risk you need to understand.</h1>
          <p>Tell us what you are protecting, what has changed or where you need certainty. We will help identify the right first step.</p>
        </div>
        <aside>
          <p>DIRECT EMAIL</p>
          <a href="mailto:hello@gvcyber.com">hello@gvcyber.com</a>
          <span>We aim to respond within one business day.</span>
        </aside>
      </section>
      <section className="contact-form-section">
        <div><p>YOUR ENQUIRY</p><h2>Give us enough context to make the first conversation useful.</h2></div>
        <ContactForm />
      </section>
      <SiteFooter />
    </main>
  );
}
