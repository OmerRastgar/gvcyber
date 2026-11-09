"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "gvcyber-cookie-consent";

type Consent = {
  necessary: boolean;
  analytics: boolean;
  customisation: boolean;
};

const DEFAULT_CONSENT: Consent = {
  necessary: true,
  analytics: false,
  customisation: false,
};

function readStoredConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    if (typeof parsed !== "object" || parsed === null) return null;
    return {
      necessary: parsed.necessary !== false,
      analytics: parsed.analytics === true,
      customisation: parsed.customisation === true,
    };
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<Consent | null>(null);
  const [manageOpen, setManageOpen] = useState(false);
  const [draft, setDraft] = useState<Consent>(DEFAULT_CONSENT);

  useEffect(() => {
    setConsent(readStoredConsent());
    setMounted(true);
  }, []);

  const visible = mounted && consent === null;

  // Reserve space at the bottom of the page while the banner is up so it never covers content.
  useEffect(() => {
    document.documentElement.classList.toggle("has-cookie-banner", visible);
    return () => document.documentElement.classList.remove("has-cookie-banner");
  }, [visible]);

  if (!visible) return null;

  const openManage = () => {
    setDraft(readStoredConsent() ?? DEFAULT_CONSENT);
    setManageOpen(true);
  };

  const savePreferences = () => {
    const next: Consent = {
      necessary: true,
      analytics: draft.analytics,
      customisation: draft.customisation,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setConsent(next);
  };

  const acceptAll = () => {
    const next: Consent = { necessary: true, analytics: true, customisation: true };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setConsent(next);
  };

  const rejectAll = () => {
    const next: Consent = { necessary: true, analytics: false, customisation: false };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setConsent(next);
  };

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent" aria-live="polite">
      <div className="cookie-banner-inner">
        <p className="cookie-banner-copy">
          We use cookies for security, analytics and to remember your preferences.
          Choose &ldquo;Accept all&rdquo;, or &ldquo;Manage cookies&rdquo; to opt out.
        </p>

        {manageOpen ? (
          <div className="cookie-preferences">
            <div className="cookie-preference">
              <div className="cookie-preference-copy">
                <strong>Strictly necessary</strong>
                <span>Required for the site to function securely.</span>
              </div>
              <span className="cookie-always-on">Always on</span>
            </div>

            <div className="cookie-preference">
              <div className="cookie-preference-copy">
                <strong>Analytics</strong>
                <span>Help us understand how the site is used so we can improve it.</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={draft.analytics}
                className={`cookie-toggle ${draft.analytics ? "cookie-toggle-on" : ""}`}
                onClick={() => setDraft((prev) => ({ ...prev, analytics: !prev.analytics }))}
              >
                <span aria-hidden="true" />
              </button>
            </div>

            <div className="cookie-preference">
              <div className="cookie-preference-copy">
                <strong>Customisation</strong>
                <span>Remember choices such as your preferred region.</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={draft.customisation}
                className={`cookie-toggle ${draft.customisation ? "cookie-toggle-on" : ""}`}
                onClick={() => setDraft((prev) => ({ ...prev, customisation: !prev.customisation }))}
              >
                <span aria-hidden="true" />
              </button>
            </div>

            <div className="cookie-banner-actions">
              <button type="button" className="cookie-button cookie-button-secondary" onClick={rejectAll}>Reject all</button>
              <button type="button" className="cookie-button cookie-button-secondary" onClick={savePreferences}>Save preferences</button>
              <button type="button" className="cookie-button cookie-button-primary" onClick={acceptAll}>Accept all</button>
            </div>
          </div>
        ) : (
          <div className="cookie-banner-actions">
            <button type="button" className="cookie-button cookie-button-secondary" onClick={openManage}>Manage cookies</button>
            <button type="button" className="cookie-button cookie-button-primary" onClick={acceptAll}>Accept all</button>
          </div>
        )}
      </div>
    </div>
  );
}
