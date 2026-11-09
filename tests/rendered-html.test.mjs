import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the Golden Valley Cyber homepage and primary navigation", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Golden Valley Cyber, Cheltenham UK \| ISO 27001 &amp; Pentesting<\/title>/i);
  assert.match(html, /Sovereign digital resilience/);
  assert.match(html, /STANDARDS &amp; BODIES WE REFERENCE/);
  for (const name of ["CyNam", "Security BSides", "PECB", "ISACA", "ISC2", "CQI &amp; IRCA", "IASME Consortium", "UK Cyber Security Council", "OWASP"]) {
    assert.match(html, new RegExp(name));
  }
  // Names that implied an endorsement or relationship we cannot evidence.
  for (const name of ["University of Oxford", "National Cyber Security Centre", "Saudi Central Bank", "Dubai Electronic Security Center", "National Cybersecurity Authority"]) {
    assert.doesNotMatch(html, new RegExp(name));
  }
  assert.match(html, /href="\/msp"/);
  assert.match(html, /href="\/industries"/);
  assert.match(html, /href="\/solutions"/);
  assert.match(html, /href="\/expert-suggestions"/);
  assert.match(html, /href="\/product-studio"/);
  assert.match(html, /href="\/global-standards"/);
  assert.match(html, /href="\/services\/cyber-essentials"/);
  assert.match(html, /href="\/case-studies"/);
  assert.match(html, /href="\/contact"/);
});

test("renders a complete service detail route", async () => {
  const response = await render("/services/cyber-essentials");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Cyber Essentials/);
  assert.match(html, /WHY IT MATTERS/);
  assert.match(html, /Audit pricing view/);
  assert.match(html, /Internal/);
  assert.match(html, /External/);
  assert.match(html, /people, business complexity and technology footprint/);
  assert.match(html, /Scope this service/);
});

test("keeps the complete 31-service catalogue in one data source", async () => {
  const source = await readFile(new URL("../app/data/services.ts", import.meta.url), "utf8");
  assert.equal((source.match(/^    slug:/gm) ?? []).length, 31);
  assert.match(source, /category: "audits"/);
  assert.match(source, /category: "vulnerability-scanning"/);
  assert.match(source, /category: "penetration-testing"/);
});

test("renders contact, careers, editable case-study, industry and expert routes", async () => {
  const [contact, careers, zeroTrustCaseStudy, ciscoCaseStudy, aiGovernanceCaseStudy, ransomwareCaseStudy, oldCaseStudy, industries, financialServices, solutions, expertSuggestions, expertPost] = await Promise.all([
    render("/contact"),
    render("/careers"),
    render("/case-studies/cloudflare-zero-trust-shared-access"),
    render("/case-studies/cisco-router-network-hardening"),
    render("/case-studies/iso-42001-ai-governance-saas"),
    render("/case-studies/factory-ransomware-digital-forensics"),
    render("/case-studies/fintech-enterprise-readiness"),
    render("/industries"),
    render("/industries/financial-services"),
    render("/solutions"),
    render("/expert-suggestions"),
    render("/expert-suggestions/iso-27001-readiness-before-certification"),
  ]);
  assert.equal(contact.status, 200);
  const contactHtml = await contact.text();
  assert.match(contactHtml, /action="https:\/\/formspree\.io\/f\/xzzdgkly"/);
  assert.match(contactHtml, /name="subject"/);
  assert.match(contactHtml, /Submit/);
  assert.equal(careers.status, 200);
  assert.match(await careers.text(), /No open careers right now/);
  assert.equal(zeroTrustCaseStudy.status, 200);
  const zeroTrustHtml = await zeroTrustCaseStudy.text();
  assert.match(zeroTrustHtml, /Zero Trust controls for shared customer access/);
  assert.match(zeroTrustHtml, /Identity-Aware Proxying/);
  assert.match(zeroTrustHtml, /TECHNICAL HURDLES &amp; MITIGATIONS/);
  assert.equal(ciscoCaseStudy.status, 200);
  assert.match(await ciscoCaseStudy.text(), /Auditing Cisco routers for misconfiguration/);
  assert.equal(aiGovernanceCaseStudy.status, 200);
  assert.match(await aiGovernanceCaseStudy.text(), /AI governance for a SaaS provider using ISO 42001/);
  assert.equal(ransomwareCaseStudy.status, 200);
  const ransomwareHtml = await ransomwareCaseStudy.text();
  assert.match(ransomwareHtml, /Digital forensics after ransomware in a factory environment/);
  assert.match(ransomwareHtml, /SAP/);
  assert.match(ransomwareHtml, /HMI/);
  assert.match(ransomwareHtml, /ransomware-factory-forensics\.webp/);
  assert.equal(oldCaseStudy.status, 404);
  assert.equal(industries.status, 200);
  const industriesHtml = await industries.text();
  assert.match(industriesHtml, /Financial services/);
  assert.match(industriesHtml, /href="\/industries\/financial-services"/);
  assert.doesNotMatch(industriesHtml, /Discuss this sector/);
  assert.equal(financialServices.status, 200);
  const financialServicesHtml = await financialServices.text();
  assert.match(financialServicesHtml, /Applicable audits/);
  assert.match(financialServicesHtml, /PCI DSS/);
  assert.match(financialServicesHtml, /Web Application Penetration Testing/);
  assert.match(financialServicesHtml, /Cloud-Native Vulnerability Scanning/);
  assert.equal(solutions.status, 200);
  const solutionsHtml = await solutions.text();
  assert.match(solutionsHtml, /Product Studio/);
  assert.match(solutionsHtml, /Expert suggestions/);
  assert.equal(expertSuggestions.status, 200);
  const expertSuggestionsHtml = await expertSuggestions.text();
  assert.match(expertSuggestionsHtml, /Practical guidance before you scope security work/);
  assert.match(expertSuggestionsHtml, /How to make vulnerability scanning useful/);
  assert.equal(expertPost.status, 200);
  assert.match(await expertPost.text(), /What to prepare before an ISO 27001 certification audit/);
});

test("renders the global standards globe page without loading it into the homepage", async () => {
  const [home, globe] = await Promise.all([render("/"), render("/global-standards")]);
  const homeHtml = await home.text();
  const globeHtml = await globe.text();

  assert.doesNotMatch(homeHtml, /GLOBAL STANDARDS EXPLORER/);
  assert.match(homeHtml, /Explore global standards/);
  assert.equal(globe.status, 200);
  assert.match(globeHtml, /Explore cyber standards by region/);
  assert.match(globeHtml, /GLOBAL STANDARDS EXPLORER/);
  assert.match(globeHtml, /ISO 27001 implementation/);
  assert.match(globeHtml, /Choose country/);
  assert.match(globeHtml, /Play rotation/);
  assert.match(globeHtml, /crisp labels are rendered as page text/);
  assert.match(globeHtml, /Interactive coordinate-based globe/);
  assert.match(globeHtml, /Selected country/);
  assert.doesNotMatch(globeHtml, /globe-country-list/);
});

test("serves search-engine discovery files", async () => {
  const [robots, sitemap] = await Promise.all([render("/robots.txt"), render("/sitemap.xml")]);
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap: https:\/\/gvcyber\.com\/sitemap\.xml/);
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  assert.match(xml, /https:\/\/gvcyber\.com\/contact/);
  assert.match(xml, /https:\/\/gvcyber\.com\/industries/);
  assert.match(xml, /https:\/\/gvcyber\.com\/industries\/financial-services/);
  assert.match(xml, /https:\/\/gvcyber\.com\/expert-suggestions/);
  assert.match(xml, /https:\/\/gvcyber\.com\/expert-suggestions\/iso-27001-readiness-before-certification/);
  assert.match(xml, /https:\/\/gvcyber\.com\/solutions/);
  assert.match(xml, /https:\/\/gvcyber\.com\/global-standards/);
  assert.match(xml, /https:\/\/gvcyber\.com\/case-studies\/cloudflare-zero-trust-shared-access/);
  assert.match(xml, /https:\/\/gvcyber\.com\/case-studies\/cisco-router-network-hardening/);
  assert.match(xml, /https:\/\/gvcyber\.com\/case-studies\/iso-42001-ai-governance-saas/);
  assert.match(xml, /https:\/\/gvcyber\.com\/case-studies\/factory-ransomware-digital-forensics/);
  assert.doesNotMatch(xml, /https:\/\/gvcyber\.com\/case-studies\/fintech-enterprise-readiness/);
});

test("keeps client stories out of the primary navigation and exposes three mobile accordions", async () => {
  const header = await readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.doesNotMatch(header, />Client stories</);
  assert.equal((header.match(/mobile-subnav-open/g) ?? []).length, 3);
  assert.match(header, /MSP partner programme/);
  assert.match(header, /Product Studio/);
  assert.match(header, /flagSrc: "\/flags\/global\.svg"/);
  assert.match(header, /flagSrc: "\/flags\/gb\.svg"/);
  assert.doesNotMatch(header, /flagSrc: "\/flags\/pk\.svg"/);
  assert.match(header, /region-current-label/);
  assert.doesNotMatch(header, /login-link/);
  assert.match(header, /Contact<\/a>\s*<div className="region-picker"/);
  assert.match(css, /region-button:hover/);
  assert.match(header, /gvcyber-region/);
  const pricing = await readFile(new URL("../app/components/PricingPanels.tsx", import.meta.url), "utf8");
  assert.match(pricing, /1 USD ≈ £0\.74/);
  assert.doesNotMatch(pricing, /PKR/);
  assert.match(pricing, /people, business complexity and technology footprint/);
  await Promise.all([
    stat(new URL("../public/flags/global.svg", import.meta.url)),
    stat(new URL("../public/flags/gb.svg", import.meta.url)),
  ]);
  const footer = await readFile(new URL("../app/components/SiteFooter.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(footer, /Clear assurance/);
  assert.doesNotMatch(footer, /Stronger business/);
  assert.match(footer, /A brand of/);
  assert.match(footer, /Soft Innovators/);
  assert.match(footer, /https:\/\/www\.softinnovators\.com\//);
  assert.doesNotMatch(footer, /social-links|huggingface|linkedin|instagram|x\.com/i);
});

const siteRoutes = [
  "/",
  "/uk",
  "/services",
  "/services/pci-dss",
  "/services/iso-27001",
  "/services/crest-penetration-testing",
  "/industries",
  "/industries/healthcare",
  "/case-studies",
  "/case-studies/cloudflare-zero-trust-shared-access",
  "/case-studies/cisco-router-network-hardening",
  "/case-studies/iso-42001-ai-governance-saas",
  "/case-studies/factory-ransomware-digital-forensics",
  "/expert-suggestions",
  "/expert-suggestions/vibe-coder-guide-to-security",
  "/contact",
];

test("rendered pages have no mojibake, placeholder copy or unevidenced claims", async () => {
  for (const route of siteRoutes) {
    const html = await (await render(route)).text();
    assert.doesNotMatch(html, /[âÂÃ]/, `${route} contains mojibake`);
    assert.doesNotMatch(html, /ready for approved client detail/i, `${route} contains placeholder copy`);
    assert.doesNotMatch(html, /REPRESENTATIVE ENGAGEMENT/, `${route} still labels scenarios as engagements`);
    assert.doesNotMatch(html, /accredited, threat-led|need accredited/i, `${route} claims CREST accreditation`);
    assert.doesNotMatch(html, /PKR/, `${route} prices in PKR`);
    assert.doesNotMatch(html, /uk organisations/, `${route} lowercases UK`);
  }
  const source = await readFile(new URL("../app/data/services.ts", import.meta.url), "utf8");
  assert.doesNotMatch(source, /PKR/);
});

test("every sitemap page has a title within 60 characters", async () => {
  const xml = await (await render("/sitemap.xml")).text();
  const paths = [...xml.matchAll(/<loc>https:\/\/gvcyber\.com([^<]*)<\/loc>/g)].map((match) => match[1] || "/");
  assert.ok(paths.length >= 62, `expected the full sitemap, got ${paths.length}`);
  const decode = (text) => text.replaceAll("&amp;", "&").replaceAll("&#x27;", "'").replaceAll("&quot;", '"');
  for (const path of paths) {
    const html = await (await render(path)).text();
    const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
    assert.ok(title.length > 0 && title.length <= 60, `${path} title is ${title.length} chars: ${title}`);
    assert.doesNotMatch(html, /[a-z]K/, `${path} has a lowercase-first UK ("uK")`);
    const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
    assert.ok(description.length <= 160, `${path} description is ${description.length} chars`);
    assert.ok(!description.endsWith("…"), `${path} description is cut mid-sentence: ${description}`);
  }
});

test("structured data uses one organisation id, unique breadcrumbs and article dates", async () => {
  const jsonLd = (html) => [...html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]));
  const nodes = (html) => jsonLd(html).flatMap((block) => block["@graph"] ?? [block]);

  const caseHtml = await (await render("/case-studies/factory-ransomware-digital-forensics")).text();
  const crumbs = nodes(caseHtml).find((node) => node["@type"] === "BreadcrumbList");
  const urls = crumbs.itemListElement.map((item) => item.item);
  assert.equal(new Set(urls).size, urls.length, "breadcrumb URLs must be unique");

  const articleHtml = await (await render("/expert-suggestions/vibe-coder-guide-to-security")).text();
  const post = nodes(articleHtml).find((node) => node["@type"] === "BlogPosting");
  assert.match(post.datePublished, /^\d{4}-\d{2}-\d{2}$/);
  assert.match(post.dateModified, /^\d{4}-\d{2}-\d{2}$/);
  assert.doesNotMatch(JSON.stringify(post.mainEntityOfPage), /medium\.com/);

  const serviceHtml = await (await render("/services/pci-dss")).text();
  assert.ok(nodes(serviceHtml).some((node) => node["@type"] === "BreadcrumbList"));
  const industryHtml = await (await render("/industries/healthcare")).text();
  assert.ok(nodes(industryHtml).some((node) => node["@type"] === "BreadcrumbList"));

  const ids = nodes(await (await render("/")).text()).map((node) => node["@id"]).filter(Boolean);
  assert.equal(new Set(ids).size, ids.length, "@id values must not repeat on one page");
  assert.ok(ids.includes("https://gvcyber.com/#organization"));
});

test("declares hreflang for the global and UK pages", async () => {
  const [home, uk] = await Promise.all([render("/"), render("/uk")]);
  assert.match(await home.text(), /hrefLang="x-default"|hreflang="x-default"/i);
  const ukHtml = await uk.text();
  assert.match(ukHtml, /hreflang="en-GB"|hrefLang="en-GB"/i);
  assert.match(ukHtml, /property="og:url" content="https:\/\/gvcyber\.com\/uk"/);
  // Reciprocal: each page must reference the other.
  assert.match(await (await render("/")).text(), /hreflang="en-GB"[^>]*href="https:\/\/gvcyber\.com\/uk"|href="https:\/\/gvcyber\.com\/uk"[^>]*hrefLang="en-GB"|hrefLang="en-GB"[^>]*href="https:\/\/gvcyber\.com\/uk"/i);
});

test("sends security headers and redirects www to the apex domain", async () => {
  const response = await render("/");
  for (const name of ["strict-transport-security", "content-security-policy", "x-content-type-options", "x-frame-options", "referrer-policy", "permissions-policy"]) {
    assert.ok(response.headers.get(name), `missing ${name}`);
  }

  const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url).href);
  const redirect = await worker.fetch(
    new Request("https://www.gvcyber.com/services?x=1"),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(redirect.status, 301);
  assert.equal(redirect.headers.get("location"), "https://gvcyber.com/services?x=1");
});

test("ships discovery and identity files and keeps the sitemap honest", async () => {
  await Promise.all([
    stat(new URL("../public/.well-known/security.txt", import.meta.url)),
    stat(new URL("../public/favicon.ico", import.meta.url)),
    stat(new URL("../public/og-gvcyber.png", import.meta.url)),
  ]);
  const security = await readFile(new URL("../public/.well-known/security.txt", import.meta.url), "utf8");
  assert.match(security, /^Contact: mailto:hello@gvcyber\.com/m);
  assert.match(security, /^Expires: /m);

  const xml = await (await render("/sitemap.xml")).text();
  assert.doesNotMatch(xml, /<changefreq>|<priority>/);
  const llms = await readFile(new URL("../public/llms.txt", import.meta.url), "utf8");
  assert.match(llms, /services\/crest-penetration-testing/);
  assert.match(llms, /case-studies\/factory-ransomware-digital-forensics/);

  const robots = await (await render("/robots.txt")).text();
  assert.match(robots, /Claude-SearchBot/);
  assert.doesNotMatch(robots, /Claude-Web/);
});

test("the content security policy allows every external host the stylesheet loads", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const hosts = new Set([...css.matchAll(/https:\/\/([a-z0-9.-]+)/gi)].map((match) => match[1]));
  const csp = (await render("/")).headers.get("content-security-policy") ?? "";
  assert.ok(hosts.size > 0);
  for (const host of hosts) assert.ok(csp.includes(`https://${host}`), `CSP does not allow ${host}`);
});
