/**
 * Trim a meta description to a SERP-safe length. Prefer whole sentences; only
 * fall back to a word-boundary cut with an ellipsis when the first sentence alone is too long.
 */
export function clip(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const sentences = clean.match(/[^.!?]+[.!?]+(?:\s|$)/g)?.map((sentence) => sentence.trim()) ?? [];
  let out = "";
  for (const sentence of sentences) {
    const next = out ? `${out} ${sentence}` : sentence;
    if (next.length > max) break;
    out = next;
  }
  if (out) return out;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\-\s]+$/, "")}…`;
}

/** Lowercase the first letter of a phrase unless the first word is an acronym or mixed-case (UK, SaaS). */
export function lowerFirst(text: string): string {
  const [first = "", ...rest] = text.split(" ");
  const keep = first.length > 1 && first.slice(1) !== first.slice(1).toLowerCase();
  return [keep ? first : first.charAt(0).toLowerCase() + first.slice(1), ...rest].join(" ");
}

const TITLE_SUFFIX = " | Golden Valley Cyber";

/** Build a page title that stays within 60 characters once the site suffix is appended. */
export function pageTitle(name: string, label?: string, shortName?: string): string {
  const fits = (text: string) => text.length + TITLE_SUFFIX.length <= 60;
  const full = label ? `${name} | ${label}` : name;
  if (fits(full)) return full;
  if (fits(name)) return name;
  return shortName && fits(shortName) ? shortName : name;
}
