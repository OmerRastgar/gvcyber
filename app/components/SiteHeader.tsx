"use client";

import { useEffect, useState } from "react";
import { getServicesByCategory } from "../data/services";

const regions = [
  { code: "global", flagSrc: "/flags/global.svg", label: "Global", href: "/" },
  { code: "uk", flagSrc: "/flags/gb.svg", label: "United Kingdom", href: "/uk" },
];

const REGION_STORAGE_KEY = "gvcyber-region";

const auditLinks = getServicesByCategory("audits").slice(0, 6);
const scanLinks = getServicesByCategory("vulnerability-scanning").slice(0, 4);
const pentestLinks = getServicesByCategory("penetration-testing").slice(0, 4);

const discoveryMenus = {
  industries: {
    title: "Industries",
    copy: "Security decisions grounded in your sector, obligations and operational reality.",
    groups: [
      { title: "Regulated", links: [{ label: "Financial services", href: "/industries/financial-services" }, { label: "Healthcare", href: "/industries/healthcare" }, { label: "Public sector", href: "/industries/public-sector" }] },
      { title: "Digital", links: [{ label: "Technology & SaaS", href: "/industries/technology-saas" }, { label: "Retail & eCommerce", href: "/industries/retail-ecommerce" }, { label: "Digital platforms", href: "/industries/technology-saas" }] },
      { title: "Essential", links: [{ label: "Critical infrastructure", href: "/industries/critical-infrastructure" }, { label: "Energy & utilities", href: "/industries/critical-infrastructure" }, { label: "Professional services", href: "/industries/technology-saas" }] },
    ],
  },
  solutions: {
    title: "Solutions",
    copy: "Use Golden Valley Cyber technology directly or extend your own managed service with our security capability.",
    groups: [
      { title: "Product", links: [{ label: "Product Studio", href: "/product-studio" }, { label: "Open-source compliance automation", href: "/product-studio" }] },
      { title: "Partners", links: [{ label: "MSP partner programme", href: "/msp" }, { label: "Multi-client delivery", href: "/msp" }] },
      { title: "Outcomes", links: [{ label: "Assurance readiness", href: "/services/audits" }, { label: "Continuous resilience", href: "/services/vulnerability-scanning" }, { label: "Expert suggestions", href: "/expert-suggestions" }] },
    ],
  },
} as const;

type ActiveMenu = "services" | keyof typeof discoveryMenus;

function Arrow() {
  return <span aria-hidden="true">⟶</span>;
}

function Chevron() {
  return <span className="chevron" aria-hidden="true">⌄</span>;
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<ActiveMenu | null>(null);
  const [currentRegion, setCurrentRegion] = useState(regions[0]);

  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    if (path === "/uk" || path.startsWith("/uk/")) {
      setCurrentRegion(regions[1]);
      window.localStorage.setItem(REGION_STORAGE_KEY, "uk");
    }
    else {
      const storedRegion = window.localStorage.getItem(REGION_STORAGE_KEY);
      const matchingRegion = regions.find((region) => region.code === storedRegion);
      if (matchingRegion) {
        setCurrentRegion(matchingRegion);
        return;
      }
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const language = navigator.language.toLowerCase();
      if (timeZone === "Europe/London" || language === "en-gb") setCurrentRegion(regions[1]);
    }
  }, []);

  const closeMenus = () => {
    setMenuOpen(false);
    setRegionOpen(false);
    setActiveMenu(null);
  };

  const toggleMobileMenu = () => {
    if (menuOpen) {
      closeMenus();
      return;
    }
    setMenuOpen(true);
  };

  const toggleMenu = (menu: ActiveMenu) => {
    setRegionOpen(false);
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const renderServiceLinks = (items: typeof auditLinks) =>
    items.map((item) => (
      <a href={`/services/${item.slug}`} onClick={closeMenus} key={item.slug}>
        {item.shortName ?? item.name} <span aria-hidden="true">›</span>
      </a>
    ));

  const selectRegion = (region: (typeof regions)[number]) => {
    window.localStorage.setItem(REGION_STORAGE_KEY, region.code);
    closeMenus();
  };

  return (
    <header className="site-header reference-header">
      <a className="brand" href="/" aria-label="Golden Valley Cyber home" onClick={closeMenus}>
        <img src="/logo.png" alt="Golden Valley Cyber" width="885" height="133" />
      </a>

      <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={toggleMobileMenu}>
        <span /><span />
      </button>

      <nav className={menuOpen ? "nav-open" : ""} aria-label="Primary navigation">
        <div className="primary-nav">
          <button type="button" aria-expanded={activeMenu === "services"} aria-controls="mobile-services" onClick={() => toggleMenu("services")}>Services <Chevron /></button>
          <div className={`mobile-subnav ${activeMenu === "services" ? "mobile-subnav-open" : ""}`} id="mobile-services">
            <a href="/services" onClick={closeMenus}>All services</a>
            <a href="/services/audits" onClick={closeMenus}>Audit & compliance</a>
            <a href="/services/cyber-essentials" onClick={closeMenus}>Cyber Essentials</a>
            <a href="/services/vulnerability-scanning" onClick={closeMenus}>Vulnerability scanning</a>
            <a href="/services/penetration-testing" onClick={closeMenus}>Penetration testing</a>
          </div>

          <button type="button" aria-expanded={activeMenu === "industries"} aria-controls="mobile-industries" onClick={() => toggleMenu("industries")}>Industries <Chevron /></button>
          <div className={`mobile-subnav ${activeMenu === "industries" ? "mobile-subnav-open" : ""}`} id="mobile-industries">
            <a href="/industries/financial-services" onClick={closeMenus}>Financial services</a>
            <a href="/industries/healthcare" onClick={closeMenus}>Healthcare</a>
            <a href="/industries/technology-saas" onClick={closeMenus}>Technology & SaaS</a>
            <a href="/industries/critical-infrastructure" onClick={closeMenus}>Critical infrastructure</a>
          </div>

          <button type="button" aria-expanded={activeMenu === "solutions"} aria-controls="mobile-solutions" onClick={() => toggleMenu("solutions")}>Solutions <Chevron /></button>
          <div className={`mobile-subnav ${activeMenu === "solutions" ? "mobile-subnav-open" : ""}`} id="mobile-solutions">
            <a href="/product-studio" onClick={closeMenus}>Product Studio</a>
            <a href="/msp" onClick={closeMenus}>MSP partner programme</a>
            <a href="/solutions" onClick={closeMenus}>All solutions</a>
            <a href="/expert-suggestions" onClick={closeMenus}>Expert suggestions</a>
            <a href="/services/audits" onClick={closeMenus}>Assurance readiness</a>
            <a href="/services/vulnerability-scanning" onClick={closeMenus}>Continuous resilience</a>
          </div>
        </div>

        <div className="secondary-nav">
          <a href="/contact" onClick={closeMenus}>Contact</a>
          <div className="region-picker">
            <button
              type="button"
              className="region-button"
              aria-label={`Select Golden Valley Cyber site. Current site: ${currentRegion.label}`}
              aria-expanded={regionOpen}
              aria-controls="region-menu"
              onClick={() => { setActiveMenu(null); setRegionOpen(!regionOpen); }}
            >
              <img className="region-flag" src={currentRegion.flagSrc} alt="" aria-hidden="true" />
              <span className="region-current-label" aria-hidden="true">{currentRegion.label}</span>
              <span className="sr-only">Current site: {currentRegion.label}</span>
            </button>
            <div className={`region-menu ${regionOpen ? "region-menu-open" : ""}`} id="region-menu">
              <p>Select a Golden Valley Cyber site</p>
              {regions.map((region) => (
                <a className={currentRegion.code === region.code ? "active-region" : ""} href={region.href} key={region.code} onClick={() => selectRegion(region)}>
                  <img className="region-flag" src={region.flagSrc} alt="" aria-hidden="true" />{region.label}
                  {currentRegion.code === region.code && <b aria-label="Current site">✓</b>}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {activeMenu && (
        <>
          <div className="mega-menu" aria-label={`${activeMenu} menu`}>
            {activeMenu === "services" ? (
              <>
                <div className="mega-intro">
                  <p>EXPLORE GOLDEN VALLEY CYBER</p>
                  <h2>Services</h2>
                  <span>Audit, scan and test your environment with evidence-led security services.</span>
                  <a href="/services" onClick={closeMenus}>Explore all services <Arrow /></a>
                </div>
                <div className="mega-groups mega-service-groups">
                  <div className="mega-group">
                    <h3><a href="/services/audits">Audit & compliance</a></h3>
                    {renderServiceLinks(auditLinks)}
                    <a className="mega-all" href="/services/audits" onClick={closeMenus}>View all 16 audits <Arrow /></a>
                  </div>
                  <div className="mega-group">
                    <h3><a href="/services/vulnerability-scanning">Vulnerability scanning</a></h3>
                    {renderServiceLinks(scanLinks)}
                    <a className="mega-all" href="/services/vulnerability-scanning" onClick={closeMenus}>View all 7 scans <Arrow /></a>
                  </div>
                  <div className="mega-group">
                    <h3><a href="/services/penetration-testing">Penetration testing</a></h3>
                    {renderServiceLinks(pentestLinks)}
                    <a className="mega-all" href="/services/penetration-testing" onClick={closeMenus}>View all 7 tests <Arrow /></a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mega-intro">
                  <p>EXPLORE GOLDEN VALLEY CYBER</p>
                  <h2>{discoveryMenus[activeMenu].title}</h2>
                  <span>{discoveryMenus[activeMenu].copy}</span>
                  <a href={activeMenu === "solutions" ? "/solutions" : "/industries"} onClick={closeMenus}>Explore {discoveryMenus[activeMenu].title.toLowerCase()} <Arrow /></a>
                </div>
                <div className="mega-groups">
                  {discoveryMenus[activeMenu].groups.map((group) => (
                    <div className="mega-group" key={group.title}>
                      <h3>{group.title}</h3>
                      {group.links.map((link) => <a href={link.href} onClick={closeMenus} key={link.label}>{link.label} <span aria-hidden="true">›</span></a>)}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <button className="nav-scrim" type="button" aria-label="Close navigation menu" onClick={closeMenus} />
        </>
      )}
    </header>
  );
}
