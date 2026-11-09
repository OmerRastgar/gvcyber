"use client";

import { useState } from "react";

const LOCALE_STORAGE_KEY = "gvcyber-locale";
const REGION_STORAGE_KEY = "gvcyber-region";

const regions = [
  { code: "global", flagSrc: "/flags/global.svg", label: "Global (English)", href: "/" },
  { code: "uk", flagSrc: "/flags/gb.svg", label: "United Kingdom", href: "/uk" },
  { code: "de", flagSrc: "/flags/de.svg", label: "Deutschland", href: "/de" },
] as const;

export default function SiteHeaderDe() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const current = regions[2];

  const closeMenus = () => {
    setMenuOpen(false);
    setRegionOpen(false);
  };

  const selectRegion = (code: (typeof regions)[number]["code"]) => {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, code === "de" ? "de" : "en");
      if (code !== "de") window.localStorage.setItem(REGION_STORAGE_KEY, code);
    } catch {
      // Storage can be unavailable (private mode); navigation still works.
    }
    closeMenus();
  };

  return (
    <header className="site-header reference-header">
      <a className="brand" href="/de" aria-label="Golden Valley Cyber Startseite" onClick={closeMenus}>
        <img src="/logo.png" alt="Golden Valley Cyber" width="490" height="147" />
      </a>

      <button className="menu-button" type="button" aria-label="Navigation umschalten" aria-expanded={menuOpen} onClick={() => (menuOpen ? closeMenus() : setMenuOpen(true))}>
        <span /><span />
      </button>

      <nav className={menuOpen ? "nav-open" : ""} aria-label="Hauptnavigation">
        <div className="primary-nav">
          <a href="/de/services" onClick={closeMenus}>Leistungen</a>
          <a href="/de/services/kritis-nis2" onClick={closeMenus}>KRITIS &amp; NIS2</a>
          <a href="/de/services/iso-27001" onClick={closeMenus}>ISO 27001</a>
          <a href="/de/services/penetration-testing" onClick={closeMenus}>Penetrationstests</a>
          <a href="/de/services/vulnerability-scanning" onClick={closeMenus}>Schwachstellenscans</a>
        </div>

        <div className="secondary-nav">
          <a className="nav-cta" href="/de/contact" onClick={closeMenus}>Kontakt</a>
          <div className="region-picker">
            <button
              type="button"
              className="region-button"
              aria-label={`Golden Valley Cyber Website auswählen. Aktuell: ${current.label}`}
              aria-expanded={regionOpen}
              aria-controls="region-menu"
              onClick={() => setRegionOpen(!regionOpen)}
            >
              <img className="region-flag" src={current.flagSrc} alt="" aria-hidden="true" width="22" height="16" />
              <span className="region-current-label" aria-hidden="true">{current.label}</span>
              <span className="sr-only">Aktuelle Website: {current.label}</span>
            </button>
            <div className={`region-menu ${regionOpen ? "region-menu-open" : ""}`} id="region-menu">
              <p>Golden Valley Cyber Website auswählen</p>
              {regions.map((region) => (
                <a className={current.code === region.code ? "active-region" : ""} href={region.href} key={region.code} onClick={() => selectRegion(region.code)} hrefLang={region.code === "de" ? "de" : "en"}>
                  <img className="region-flag" src={region.flagSrc} alt="" aria-hidden="true" width="22" height="16" />{region.label}
                  {current.code === region.code && <b aria-label="Aktuelle Website">✓</b>}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
