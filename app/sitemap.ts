import type { MetadataRoute } from "next";
import { caseStudies } from "./data/caseStudies";
import { expertSuggestions } from "./data/expertSuggestions";
import { industries } from "./data/industries";
import { services } from "./data/services";
import { deServices } from "./data/de/services";
import { DE_READY } from "./data/de/company";

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

  // German pages are only listed once the Impressum is complete and the legal review is confirmed.
  const germanRoutes = DE_READY
    ? [
        "/de",
        "/de/services",
        "/de/services/audits",
        "/de/services/vulnerability-scanning",
        "/de/services/penetration-testing",
        "/de/contact",
        "/de/impressum",
        "/de/datenschutz",
        ...deServices.map((service) => `/de/services/${service.slug}`),
      ]
    : [];

  return [
    ...germanRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified })),
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified })),
    ...industries.map((industry) => ({ url: `${baseUrl}/industries/${industry.slug}`, lastModified })),
    ...expertSuggestions.map((post) => ({ url: `${baseUrl}/expert-suggestions/${post.slug}`, lastModified: new Date(post.updated) })),
    ...services.map((service) => ({ url: `${baseUrl}/services/${service.slug}`, lastModified })),
    ...caseStudies.map((study) => ({ url: `${baseUrl}/case-studies/${study.slug}`, lastModified })),
  ];
}
