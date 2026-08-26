import type { Metadata } from "next";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { expertSuggestions } from "../data/expertSuggestions";

export const metadata: Metadata = {
  title: "Expert Suggestions | Cyber Security Guidance | Golden Valley Cyber",
  description: "Practical Golden Valley Cyber expert suggestions for ISO audit readiness, vulnerability scanning, penetration testing, application security and security implementation.",
  keywords: ["cyber security blog", "expert suggestions", "ISO audit", "ISO 27001", "vulnerability scanning", "penetration testing", "application security", "security implementation"],
  alternates: { canonical: "/expert-suggestions" },
  openGraph: {
    title: "Expert Suggestions | Cyber Security Guidance | Golden Valley Cyber",
    description: "Practical Golden Valley Cyber guidance for ISO audit readiness, vulnerability scanning, penetration testing, application security and security implementation.",
    url: "/expert-suggestions",
    siteName: "Golden Valley Cyber",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "Expert Suggestions | Golden Valley Cyber" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Suggestions | Golden Valley Cyber",
    description: "Practical cyber security guidance.",
    images: ["/og.png"],
  },
};

export default function ExpertSuggestionsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Golden Valley Cyber Expert Suggestions",
    description: "Practical guidance for audit readiness, vulnerability scanning and penetration testing.",
    publisher: { "@type": "Organization", name: "Golden Valley Cyber", url: "https://gvcyber.com" },
    blogPost: expertSuggestions.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.summary,
      url: post.externalUrl ?? `https://gvcyber.com/expert-suggestions/${post.slug}`,
    })),
  };

  return (
    <main className="inner-page expert-page" id="top">
      <SiteHeader />
      <section className="inner-hero">
        <div>
          <p className="eyebrow"><span /> EXPERT SUGGESTIONS</p>
          <h1>Practical guidance before you scope security work.</h1>
        </div>
        <p>Short, useful notes from Golden Valley Cyber on ISO audit readiness, vulnerability scanning, penetration testing, application security and implementation decisions.</p>
      </section>
      <section className="expert-list">
        {expertSuggestions.map((post, index) => (
          <article className="expert-card" key={post.slug}>
            <span>{String(index + 1).padStart(2, "0")} · {post.category} · {post.readingTime}</span>
            <h2>{post.title}</h2>
            <p>{post.summary}</p>
            <a href={post.externalUrl ?? `/expert-suggestions/${post.slug}`} target={post.externalUrl ? "_blank" : undefined} rel={post.externalUrl ? "noopener noreferrer" : undefined}>Read suggestion <b aria-hidden="true">⟶</b></a>
          </article>
        ))}
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteFooter />
    </main>
  );
}
