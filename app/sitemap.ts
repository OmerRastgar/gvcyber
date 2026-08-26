import type { MetadataRoute } from "next";
import { caseStudies } from "./data/caseStudies";
import { expertSuggestions } from "./data/expertSuggestions";
import { industries } from "./data/industries";
import { services } from "./data/services";

const baseUrl = "https://gvcyber.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/uk",
    "/industries",
    "/services",
    "/services/audits",
    "/services/vulnerability-scanning",
    "/services/penetration-testing",
    "/global-standards",
    "/solutions",
    "/expert-suggestions",
    "/product-studio",
    "/msp",
    "/case-studies",
    "/contact",
    "/careers",
    "/privacy-policy",
  ];

  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: route === "" ? 1 : 0.8 })),
    ...industries.map((industry) => ({ url: `${baseUrl}/industries/${industry.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.75 })),
    ...expertSuggestions.map((post) => ({ url: `${baseUrl}/expert-suggestions/${post.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.72 })),
    ...services.map((service) => ({ url: `${baseUrl}/services/${service.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...caseStudies.map((study) => ({ url: `${baseUrl}/case-studies/${study.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
