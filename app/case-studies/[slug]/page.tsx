import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { caseStudies, getCaseStudy } from "../../data/caseStudies";

type CaseStudyPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  return study ? {
    title: `${study.title} | Security Case Study | Golden Valley Cyber`,
    description: `${study.summary} Representative Golden Valley Cyber work covering security assessment, remediation and business risk reduction.`,
    keywords: [study.sector, "security case study", "cybersecurity case study", "security assessment", "vulnerability scanning", "penetration testing", "security audit", ...(study.tags ?? [])],
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      title: `${study.title} | Security Case Study | Golden Valley Cyber`,
      description: `${study.summary} Representative Golden Valley Cyber work covering security assessment, remediation and business risk reduction.`,
      url: `https://gvcyber.com/case-studies/${study.slug}`,
      siteName: "Golden Valley Cyber",
      locale: "en_GB",
      type: "article",
      images: [{ url: "/og.png", width: 1672, height: 941, alt: `${study.title} | Golden Valley Cyber` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} | Security Case Study | Golden Valley Cyber`,
      description: `${study.summary}`,
      images: ["/og.png"],
    },
  } : {};
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  const caseStudyStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: study.title,
        description: study.summary,
        articleSection: study.sector,
        keywords: study.tags?.join(", "),
        author: { "@type": "Organization", name: "Golden Valley Cyber", url: "https://gvcyber.com" },
        publisher: { "@type": "Organization", name: "Golden Valley Cyber", url: "https://gvcyber.com", logo: { "@type": "ImageObject", url: "https://gvcyber.com/logo.png" } },
        mainEntityOfPage: `https://gvcyber.com/case-studies/${study.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Case studies", item: "https://gvcyber.com/case-studies" },
          { "@type": "ListItem", position: 2, name: study.sector, item: "https://gvcyber.com/case-studies" },
          { "@type": "ListItem", position: 3, name: study.title, item: `https://gvcyber.com/case-studies/${study.slug}` },
        ],
      },
    ],
  };

  return (
    <main className="inner-page" id="top">
      <SiteHeader />
      <section className="case-detail-hero">
        <div className="service-breadcrumbs"><a href="/case-studies">Case studies</a><span>/</span><span>{study.sector}</span></div>
        <p className="eyebrow"><span /> {study.sector.toUpperCase()}</p>
        <h1>{study.title}</h1>
        <p>{study.summary}</p>
        {study.tags?.length ? <div className="case-detail-tags">{study.tags.map((tag) => <span key={tag}>{tag}</span>)}</div> : null}
        {study.image ? <img className="case-detail-image" src={study.image} alt={`${study.title} visual`} loading="eager" /> : null}
      </section>

      {study.metrics?.length ? (
        <section className="case-metric-strip">
          {study.metrics.map((metric) => <article key={`${metric.value}-${metric.label}`}><strong>{metric.value}</strong><span>{metric.label}</span></article>)}
        </section>
      ) : null}

      <section className="case-detail-grid">
        <article><span>01</span><p>THE CHALLENGE</p><h2>What needed to change</h2><div>{study.challenge}</div></article>
        <article><span>02</span><p>THE APPROACH</p><h2>How Golden Valley Cyber responded</h2><div>{study.approach}</div></article>
        <article><span>03</span><p>THE OUTCOME</p><h2>The result</h2><div>{study.outcome}</div></article>
      </section>

      {(study.challengePoints?.length || study.solutionPoints?.length) ? (
        <section className="case-two-column">
          <div>
            <p>THE CHALLENGE</p>
            <h2>What created the risk</h2>
            {study.challengePoints?.map((point) => <article key={point.title}><h3>{point.title}</h3><p>{point.detail}</p></article>)}
          </div>
          <div>
            <p>THE SOLUTION</p>
            <h2>What changed in the architecture</h2>
            {study.solutionPoints?.map((point) => <article key={point.title}><h3>{point.title}</h3><p>{point.detail}</p></article>)}
          </div>
        </section>
      ) : null}

      {study.hurdles?.length ? (
        <section className="case-hurdles">
          <div><p>TECHNICAL HURDLES & MITIGATIONS</p><h2>Issues handled during the engagement</h2></div>
          <div>
            {study.hurdles.map((hurdle) => <article key={hurdle.issue}><h3>Issue</h3><p>{hurdle.issue}</p><h3>Architecture fix</h3><p>{hurdle.fix}</p></article>)}
          </div>
        </section>
      ) : null}

      <section className="case-placeholder-note"><p>STORY STATUS</p><h2>This representative case study is ready for approved client detail, evidence and metrics.</h2><a href="/contact">Discuss a similar challenge <span aria-hidden="true">â†’</span></a></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyStructuredData) }} />
      <SiteFooter />
    </main>
  );
}
