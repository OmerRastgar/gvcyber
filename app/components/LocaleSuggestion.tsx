"use client";

import { useEffect, useState } from "react";
import { germanPathFor } from "../i18n/locales";

const LOCALE_STORAGE_KEY = "gvcyber-locale";
const GERMAN_SPEAKING_COUNTRIES = ["DE", "AT", "CH"];

/**
 * Suggests the German site to visitors from Germany, Austria or Switzerland (or with a German browser language).
 * Never redirects: the visitor chooses, and the choice is remembered. Crawlers and English visitors see nothing.
 */
export default function LocaleSuggestion({ enabled = true }: { enabled?: boolean }) {
  const [href, setHref] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const path = window.location.pathname.replace(/\/$/, "") || "/";
    if (path === "/de" || path.startsWith("/de/")) return;
    try {
      if (window.localStorage.getItem(LOCALE_STORAGE_KEY)) return;
    } catch {
      return;
    }

    let cancelled = false;
    const prefersGerman = navigator.languages?.some((language) => language.toLowerCase().startsWith("de")) ?? false;
    fetch("/_geo", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { country?: string | null } | null) => {
        if (cancelled) return;
        const inGermanSpeakingCountry = !!data?.country && GERMAN_SPEAKING_COUNTRIES.includes(data.country.toUpperCase());
        if (inGermanSpeakingCountry || prefersGerman) setHref(germanPathFor(path) ?? "/de");
      })
      .catch(() => {
        if (!cancelled && prefersGerman) setHref(germanPathFor(path) ?? "/de");
      });
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  const choose = (locale: "de" | "en") => {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // Storage unavailable: the choice just will not be remembered.
    }
    if (locale === "en") setHref(null);
  };

  if (!href) return null;

  return (
    <div className="locale-suggestion" role="region" aria-label="Sprachauswahl / Language">
      <p lang="de">Diese Seite ist auch auf Deutsch verfügbar. <span lang="en">(This site is available in German.)</span></p>
      <div>
        <a className="locale-suggestion-primary" href={href} hrefLang="de" onClick={() => choose("de")}>Auf Deutsch ansehen</a>
        <button type="button" onClick={() => choose("en")}>Bei Englisch bleiben</button>
      </div>
    </div>
  );
}
