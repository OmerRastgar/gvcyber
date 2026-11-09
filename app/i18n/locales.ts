import type { Metadata } from "next";
import { deServices } from "../data/de/services";
import { DE_READY } from "../data/de/company";

export type Locale = "en" | "de";

const CATEGORY_HUBS = ["audits", "vulnerability-scanning", "penetration-testing"];
const DE_TWIN_SLUGS = new Set(deServices.filter((service) => service.twin).map((service) => service.slug));

/** German counterpart of an English path, or null when no German twin exists. */
export function germanPathFor(englishPath: string): string | null {
  const path = englishPath === "" ? "/" : englishPath;
  if (path === "/") return "/de";
  if (path === "/services" || path === "/contact") return `/de${path}`;
  const match = path.match(/^\/services\/([^/]+)$/);
  if (match && (CATEGORY_HUBS.includes(match[1]) || DE_TWIN_SLUGS.has(match[1]))) return `/de${path}`;
  return null;
}

/** English counterpart of a German path, or null for German-only pages. */
export function englishPathFor(germanPath: string): string | null {
  if (germanPath === "/de") return "/";
  const english = germanPath.replace(/^\/de/, "");
  return germanPathFor(english) === germanPath ? english : null;
}

/** hreflang alternates for an English page that has a German twin (and for the twin itself). */
export function hreflangFor(englishPath: string): NonNullable<Metadata["alternates"]>["languages"] {
  const german = germanPathFor(englishPath);
  if (!german) return undefined;
  const languages: Record<string, string> = { "x-default": englishPath || "/", en: englishPath || "/", de: german };
  if (englishPath === "/" || englishPath === "") languages["en-GB"] = "/uk";
  return languages;
}

/** Metadata block for a German page: canonical, hreflang (when an English twin exists) and locale. */
export function deAlternates(germanPath: string): NonNullable<Metadata["alternates"]> {
  const english = englishPathFor(germanPath);
  return english === null
    ? { canonical: germanPath }
    : { canonical: germanPath, languages: hreflangFor(english) };
}

export const DE_OG_LOCALE = "de_DE";

/** Complete metadata for a German page (title <= 60 incl. site name is enforced by tests). */
export function deMetadata(input: { title: string; description: string; path: string; absoluteTitle?: boolean; keywords?: string[] }): Metadata {
  const fullTitle = input.absoluteTitle ? input.title : `${input.title} | Golden Valley Cyber`;
  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: deAlternates(input.path),
    // Keep /de out of search results until the Impressum is complete.
    robots: DE_READY ? undefined : { index: false, follow: false },
    openGraph: {
      title: fullTitle,
      description: input.description,
      url: `https://gvcyber.com${input.path}`,
      siteName: "Golden Valley Cyber",
      locale: DE_OG_LOCALE,
      type: "website",
      images: [{ url: "/og-gvcyber.png", width: 1672, height: 941, alt: fullTitle }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: input.description, images: ["/og-gvcyber.png"] },
  };
}

/** WebPage JSON-LD node for a German page. */
export function deWebPage(path: string, name: string, description: string) {
  return {
    "@type": "WebPage",
    "@id": `https://gvcyber.com${path}#webpage`,
    name,
    url: `https://gvcyber.com${path}`,
    inLanguage: "de-DE",
    description,
    isPartOf: { "@id": "https://gvcyber.com/#website" },
    about: { "@id": "https://gvcyber.com/#organization" },
  };
}
