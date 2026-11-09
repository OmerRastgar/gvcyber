import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CookieConsent from "./components/CookieConsent";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gvcyber.com"),
  title: { default: "Golden Valley Cyber, Cheltenham UK | ISO 27001 & Pentesting", template: "%s | Golden Valley Cyber" },
  description: "Golden Valley Cyber is a Cheltenham, UK cyber security consultancy for ISO 27001, security audits, penetration testing and vulnerability scanning.",
  keywords: ["ISO audit", "ISO 27001", "security audit", "application security", "vulnerability scanning", "penetration testing", "Cyber Essentials", "PCI DSS", "SOC 2"],
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/fav.png", type: "image/png" }],
    shortcut: "/fav.png",
    apple: "/fav.png",
  },
  openGraph: {
    title: "Golden Valley Cyber, Cheltenham UK | ISO 27001 & Pentesting",
    description: "ISO 27001, security audits, application security, penetration testing and vulnerability scanning.",
    url: "https://gvcyber.com",
    siteName: "Golden Valley Cyber",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og-gvcyber.png", width: 1672, height: 941, alt: "Golden Valley Cyber: Sovereign digital resilience." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Golden Valley Cyber, Cheltenham UK | ISO 27001 & Pentesting",
    description: "ISO 27001, application security, penetration testing and vulnerability scanning.",
    images: ["/og-gvcyber.png"],
  },
};

const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://gvcyber.com/#organization",
      name: "Golden Valley Cyber",
      alternateName: "Golden Valley Cyber, Cheltenham UK",
      url: "https://gvcyber.com",
      logo: "https://gvcyber.com/logo.png",
      email: "hello@gvcyber.com",
      description:
        "UK cybersecurity consultancy providing security audits, ISO 27001 implementation, application security testing, vulnerability scanning and penetration testing.",
      areaServed: ["United Kingdom", "Global"],
      serviceType: ["ISO 27001 implementation", "security audit", "application security testing", "vulnerability scanning", "penetration testing", "Cyber Essentials readiness", "PCI DSS readiness", "SOC 2 readiness"],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Frogmore House, 6 Ormond Place",
        addressLocality: "Cheltenham",
        addressRegion: "Gloucestershire",
        postalCode: "GL50 1JD",
        addressCountry: "GB",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "hello@gvcyber.com",
        contactType: "sales",
        availableLanguage: ["en"],
        areaServed: "GB",
      },
      parentOrganization: {
        "@type": "Organization",
        name: "Soft Innovators UK Ltd",
        taxID: "06890751",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Frogmore House, 6 Ormond Place",
          addressLocality: "Cheltenham",
          postalCode: "GL50 1JD",
          addressCountry: "GB",
        },
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://gvcyber.com/#website",
      name: "Golden Valley Cyber",
      url: "https://gvcyber.com",
      description:
        "Security audits, ISO 27001 implementation, application security, vulnerability scanning and penetration testing from a UK cybersecurity consultancy.",
      publisher: { "@id": "https://gvcyber.com/#organization" },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body className={inter.variable}>
        {children}
        <CookieConsent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData) }} />
      </body>
    </html>
  );
}
