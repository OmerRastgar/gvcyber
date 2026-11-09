/**
 * Legal provider details for the German Impressum (Paragraph 5 DDG).
 * Fill the empty fields below. While any required field is empty, DE_READY is false:
 * /de pages are noindex, stay out of the sitemap, and the language suggestion banner is not shown.
 */
export const IMPRESSUM = {
  legalName: "Soft Innovators (UK) Ltd",
  tradingAs: "Golden Valley Cyber",
  legalForm: "Private company limited by shares (Ltd), eingetragen in England und Wales",
  companyNumber: "06890751",
  addressLines: ["Frogmore House", "6 Ormond Place", "Cheltenham, GL50 1JD", "Vereinigtes Königreich"],
  email: "hello@gvcyber.com",
  /** Telefonnummer (zweiter schneller Kontaktweg neben der E-Mail). */
  phone: "",
  /** Vertretungsberechtigte (Directors), z. B. "Max Mustermann (Director)". */
  directors: "Muhammad Ehtasham Sarwar (Director)",
  /** Umsatzsteuer-Identifikationsnummer nach Paragraph 27a UStG, falls vorhanden. */
  vatId: "",
  /** Auf true setzen, wenn bewusst keine USt-IdNr. vorhanden ist (dann wird ein entsprechender Hinweis angezeigt). */
  vatIdNotApplicable: false,
  /** Verantwortlich für Inhalte nach Paragraph 18 Abs. 2 MStV (Name und Anschrift). */
  contentResponsible: "Muhammad Ehtasham Sarwar, Frogmore House, 6 Ormond Place, Cheltenham, GL50 1JD, Vereinigtes Königreich",
  /**
   * Auf true setzen, sobald Impressum und Datenschutzerklärung von einer deutschen Rechtsanwältin oder einem
   * deutschen Rechtsanwalt geprüft wurden und alle [PRÜFEN]-Hinweise im Text geklärt sind.
   */
  legalReviewed: false,
} as const;

export const PLACEHOLDER_PREFIX = "[ANGABE ERFORDERLICH";

export const placeholder = (what: string) => `${PLACEHOLDER_PREFIX}: ${what}]`;

export const impressumMissing = [
  IMPRESSUM.phone ? null : "Telefonnummer",
  IMPRESSUM.directors ? null : "Vertretungsberechtigte",
  IMPRESSUM.vatId || IMPRESSUM.vatIdNotApplicable ? null : "USt-IdNr.",
  IMPRESSUM.contentResponsible ? null : "Verantwortlicher für Inhalte",
  IMPRESSUM.legalReviewed ? null : "Rechtliche Prüfung (legalReviewed)",
].filter((item): item is string => item !== null);

/** True once every required Impressum field is filled in and the legal review is confirmed. */
export const DE_READY = impressumMissing.length === 0;
