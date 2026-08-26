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
  title: "Golden Valley Cyber | Sovereign digital resilience",
  description: "Security audits, ISO 27001 implementation, ISO audit support, application security, penetration testing and vulnerability scanning from Golden Valley Cyber.",
  keywords: ["ISO audit", "ISO 27001", "security audit", "application security", "vulnerability scanning", "penetration testing", "Cyber Essentials", "PCI DSS", "SOC 2"],
  icons: {
    icon: "/fav.png",
    shortcut: "/fav.png",
    apple: "/fav.png",
  },
  openGraph: {
    title: "Golden Valley Cyber | Security audits and testing",
    description: "ISO 27001, security audits, application security, penetration testing and vulnerability scanning.",
    url: "https://gvcyber.com",
    siteName: "Golden Valley Cyber",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "Golden Valley Cyber — Sovereign digital resilience." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Golden Valley Cyber | Security audits and testing",
    description: "ISO 27001, application security, penetration testing and vulnerability scanning.",
    images: ["/og.png"],
  },
};

const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Golden Valley Cyber",
      url: "https://gvcyber.com",
      logo: "https://gvcyber.com/logo.png",
      email: "hello@gvcyber.com",
      description:
        "UK cybersecurity consultancy providing security audits, ISO 27001 implementation, application security testing, vulnerability scanning and penetration testing.",
      areaServed: ["United Kingdom", "Global"],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Frogmore House, 6 Ormond Place",
        addressLocality: "Cheltenham",
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
      sameAs: [
        "https://www.linkedin.com/company/gvcyber",
        "https://github.com/gvcyber",
        "https://x.com/gvcyber",
      ],
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
      name: "Golden Valley Cyber",
      url: "https://gvcyber.com",
      description:
        "Security audits, ISO 27001 implementation, application security, vulnerability scanning and penetration testing from a UK cybersecurity consultancy.",
      publisher: { "@type": "Organization", name: "Golden Valley Cyber" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://gvcyber.com/services/{search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {children}
        <CookieConsent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData) }} />
      </body>
    </html>
  );
}
