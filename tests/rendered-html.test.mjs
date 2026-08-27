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
  assert.match(html, /<title>Golden Valley Cyber \| Security Audits, ISO 27001, Pentesting and Vulnerability Scanning<\/title>/i);
  assert.match(html, /Sovereign digital resilience/);
  assert.match(html, /ALIGNED WITH INDUSTRY BODIES &amp; FRAMEWORKS/);
  assert.match(html, /Google/);
  assert.match(html, /Cloudflare/);
  assert.match(html, /CyNam/);
  assert.match(html, /Security BSides/);
  assert.match(html, /PECB/);
  assert.match(html, /ISACA/);
  assert.match(html, /ISC2/);
  assert.match(html, /CQI &amp; IRCA/);
  assert.match(html, /IASME Consortium/);
  assert.match(html, /UK Cyber Security Council/);
  assert.match(html, /National Cybersecurity Authority/);
  assert.match(html, /Dubai Electronic Security Center/);
  assert.match(html, /Saudi Central Bank/);
  assert.match(html, /OWASP/);
  assert.match(html, /National Cyber Security Centre/);
  assert.match(html, /University of Oxford/);
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
  assert.match(html, /Discuss|Talk to Golden Valley Cyber/);
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
  assert.match(ransomwareHtml, /ransomware-factory-forensics\.png/);
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
  const socials = await readFile(new URL("../app/data/socials.ts", import.meta.url), "utf8");
  const footer = await readFile(new URL("../app/components/SiteFooter.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(footer, /Clear assurance/);
  assert.doesNotMatch(footer, /Stronger business/);
  assert.match(footer, /A brand of/);
  assert.match(footer, /Soft Innovators/);
  assert.match(footer, /https:\/\/www\.softinnovators\.com\//);
  assert.match(socials, /huggingface\.co\/gvcyber\/CyberSecurity/);
  assert.match(socials, /github\.com\/gvcyber/);
  assert.match(socials, /linkedin\.com\/company\/gvcyber/);
  assert.match(socials, /x\.com\/gvcyber/);
  assert.match(socials, /instagram\.com\/gvcyber/);
});
