"use client";

import { useEffect, useMemo, useState } from "react";
import type { ServiceCategory } from "../data/services";

type PricingPanelsProps = {
  category: ServiceCategory;
  risk: string;
  price: string;
  priceDetails: string;
  formalPrice?: string;
  formalDetails?: string;
};

type RegionCode = "global" | "uk";

const STORAGE_KEY = "gvcyber-region";
const conversionRates = {
  uk: 0.7412,
};

function normaliseRegion(value: string | null | undefined): RegionCode | null {
  if (value === "uk" || value === "global") return value;
  return null;
}

function readRegionFromPath(pathname: string): RegionCode | null {
  const path = pathname.toLowerCase();
  if (path === "/uk" || path.startsWith("/uk/")) return "uk";
  return null;
}

function inferRegionFromLocale(): RegionCode {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language.toLowerCase();
  if (timeZone === "Europe/London" || language === "en-gb") return "uk";
  return "global";
}

function formatGbp(usd: number) {
  const value = usd >= 1000 ? Math.round((usd * conversionRates.uk) / 50) * 50 : Math.round(usd * conversionRates.uk);
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);
}

function convertDollarPrices(text: string, region: RegionCode) {
  if (region === "global") return text;
  return text.replace(/\$(\d[\d,]*(?:\.\d+)?)/g, (_match, value: string) => {
    const usd = Number(value.replace(/,/g, ""));
    if (!Number.isFinite(usd)) return _match;
    return formatGbp(usd);
  });
}

function getRegionLabel(region: RegionCode) {
  if (region === "uk") return "United Kingdom";
  return "Global";
}

export default function PricingPanels({ category, risk, price, priceDetails, formalPrice, formalDetails }: PricingPanelsProps) {
  const [region, setRegion] = useState<RegionCode>("global");
  const [activeAuditTab, setActiveAuditTab] = useState<"internal" | "external">("internal");

  useEffect(() => {
    const pathRegion = readRegionFromPath(window.location.pathname);
    const storedRegion = normaliseRegion(window.localStorage.getItem(STORAGE_KEY));
    const nextRegion = pathRegion ?? storedRegion ?? inferRegionFromLocale();
    setRegion(nextRegion);
  }, []);

  const converted = useMemo(() => ({
    internalPrice: convertDollarPrices(price, region),
    internalDetails: convertDollarPrices(priceDetails, region),
    externalPrice: formalPrice ? convertDollarPrices(formalPrice, region) : undefined,
    externalDetails: formalDetails ? convertDollarPrices(formalDetails, region) : undefined,
  }), [formalDetails, formalPrice, price, priceDetails, region]);

  const isAudit = category === "audits";
  const exchangeNote = region === "uk"
    ? "Indicative conversion uses 1 USD ≈ £0.74."
    : "Global pricing is shown in USD.";

  return (
    <section className={isAudit ? "service-evidence-grid audit-pricing-layout" : "service-evidence-grid"}>
      <article className="risk-panel">
        <p>WHY IT MATTERS</p>
        <h2>The exposure if this is missed</h2>
        <span>{risk}</span>
      </article>

      {isAudit ? (
        <article className="price-panel audit-switch-panel">
          <div className="audit-switch-head">
            <p>INDICATIVE PRICING · {getRegionLabel(region).toUpperCase()}</p>
            <div className="audit-tabs" role="tablist" aria-label="Audit pricing view">
              <button type="button" role="tab" aria-selected={activeAuditTab === "internal"} className={activeAuditTab === "internal" ? "active-audit-tab" : ""} onClick={() => setActiveAuditTab("internal")}>Internal</button>
              <button type="button" role="tab" aria-selected={activeAuditTab === "external"} className={activeAuditTab === "external" ? "active-audit-tab" : ""} onClick={() => setActiveAuditTab("external")}>External</button>
            </div>
          </div>
          {activeAuditTab === "internal" ? (
            <div className="audit-tab-panel" role="tabpanel">
              <h2>{converted.internalPrice}</h2>
              <h3>Golden Valley Cyber readiness and implementation support</h3>
              <span>{converted.internalDetails}</span>
              <p>Usually covers gap assessment, internal evidence preparation, policy or control improvement, remediation guidance and implementation support before any formal assessment.</p>
            </div>
          ) : (
            <div className="audit-tab-panel" role="tabpanel">
              <h2>{converted.externalPrice ?? "Scoped separately"}</h2>
              <h3>Formal audit, certification or independent assessment</h3>
              <span>{converted.externalDetails ?? "External assessment cost depends on the certification body, assessor, regulatory route and whether an independent auditor is required."}</span>
              <p>External pricing can include assessor fees, certification body fees, audit days, sampling requirements and re-assessment work where gaps remain open.</p>
            </div>
          )}
          <div className="pricing-scope-note">
            <b>Scope changes the price.</b>
            <span>We scope around people, business complexity and technology footprint: headcount, locations, systems, cloud assets, applications, suppliers, evidence quality and whether the work is internal readiness or external assessment.</span>
          </div>
          <small>{exchangeNote} Rates are rounded for planning only.</small>
        </article>
      ) : (
        <>
          <article className="price-panel">
            <p>INDICATIVE GOLDEN VALLEY CYBER READINESS / DELIVERY · {getRegionLabel(region).toUpperCase()}</p>
            <h2>{converted.internalPrice}</h2>
            <span>{converted.internalDetails}</span>
            <div className="pricing-scope-note">
              <b>Scope changes the price.</b>
              <span>Pricing depends on people, business complexity and technology footprint: assets, applications, locations, access, evidence quality and remediation depth.</span>
            </div>
            <small>{exchangeNote} Rates are rounded for planning only.</small>
          </article>
          {formalPrice && (
            <article className="price-panel formal-panel">
              <p>FORMAL AUDIT OR CERTIFICATION</p>
              <h2>{converted.externalPrice}</h2>
              <span>{converted.externalDetails}</span>
            </article>
          )}
        </>
      )}
    </section>
  );
}
