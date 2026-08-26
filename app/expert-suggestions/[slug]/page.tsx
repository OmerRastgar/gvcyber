import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { expertSuggestions, getExpertSuggestion } from "../../data/expertSuggestions";

type ExpertSuggestionPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return expertSuggestions.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: ExpertSuggestionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getExpertSuggestion(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Golden Valley Cyber Expert Suggestions`,
    description: post.summary,
    keywords: [post.category, "Golden Valley Cyber", "security implementation", "application security", "ISO audit", "vulnerability scanning", "penetration testing"],
    alternates: { canonical: `/expert-suggestions/${post.slug}` },
    openGraph: {
      title: `${post.title} | Golden Valley Cyber Expert Suggestions`,
      description: post.summary,
      url: post.externalUrl ?? `https://gvcyber.com/expert-suggestions/${post.slug}`,
      siteName: "Golden Valley Cyber",
      locale: "en_GB",
      type: "article",
      images: [{ url: "/og.png", width: 1672, height: 941, alt: `${post.title} | Golden Valley Cyber` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Golden Valley Cyber Expert Suggestions`,
      description: post.summary,
      images: ["/og.png"],
    },
  };
}

export default async function ExpertSuggestionDetailPage({ params }: ExpertSuggestionPageProps) {
  const { slug } = await params;
  const post = getExpertSuggestion(slug);
  if (!post) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    author: { "@type": "Organization", name: "Golden Valley Cyber" },
    publisher: { "@type": "Organization", name: "Golden Valley Cyber", url: "https://gvcyber.com" },
    mainEntityOfPage: post.externalUrl ?? `https://gvcyber.com/expert-suggestions/${post.slug}`,
  };

  return (
    <main className="inner-page expert-detail-page" id="top">
      <SiteHeader />
      <section className="service-detail-hero expert-detail-hero">
        <div className="service-breadcrumbs">
          <a href="/expert-suggestions">Expert suggestions</a><span>/</span><span>{post.category}</span>
        </div>
        <div className="service-detail-title">
          <p className="eyebrow"><span /> {post.category.toUpperCase()}</p>
          <h1>{post.title}</h1>
        </div>
        <div className="service-detail-summary">
          <p>READING TIME</p>
          <h2>{post.summary}</h2>
          <span>{post.readingTime}</span>
        </div>
      </section>
      <section className="expert-detail-body">
        <div>
          <p className="eyebrow"><span /> SUGGESTION</p>
          <h2>What to focus on first</h2>
        </div>
        <ol>
          {post.points.map((point, index) => (
            <li key={point}><span>{String(index + 1).padStart(2, "0")}</span><p>{point}</p></li>
          ))}
        </ol>
      </section>
      <section className="catalog-note">
        <p>Related Golden Valley Cyber services for this suggestion.</p>
        <div className="expert-related-links">
          {post.relatedServices.map((service) => <a href={service.href} key={service.href}>{service.label} <span aria-hidden="true">⟶</span></a>)}
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteFooter />
    </main>
  );
}
