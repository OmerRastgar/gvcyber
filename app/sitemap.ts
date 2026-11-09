import type { MetadataRoute } from "next";
import { caseStudies } from "./data/caseStudies";
import { expertSuggestions } from "./data/expertSuggestions";
import { industries } from "./data/industries";
import { services } from "./data/services";

const baseUrl = "https://gvcyber.com";
// Fixed date: a fresh `new Date()` on every build tells crawlers every page changed daily.
// Bump this when content meaningfully changes.
const lastModified = new Date("2026-11-09");

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
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified })),
    ...industries.map((industry) => ({ url: `${baseUrl}/industries/${industry.slug}`, lastModified })),
    ...expertSuggestions.map((post) => ({ url: `${baseUrl}/expert-suggestions/${post.slug}`, lastModified: new Date(post.updated) })),
    ...services.map((service) => ({ url: `${baseUrl}/services/${service.slug}`, lastModified })),
    ...caseStudies.map((study) => ({ url: `${baseUrl}/case-studies/${study.slug}`, lastModified })),
  ];
}
