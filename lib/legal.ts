/**
 * Legal / governance documents carried over from the existing website.
 * Each document is a flat list of blocks rendered top-to-bottom; the text of
 * each language lives in lib/i18n/legal/{lang}.ts.
 */
export type LegalBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "definitions"; items: { term: string; text: string }[] };

export type LegalDocument = {
  slug: string;
  title: string;
  company: string;
  blocks: LegalBlock[];
};

/** The documents, in footer order. Each is a page at /{lang}/{slug}. */
export const legalSlugs = [
  "ethics-charter",
  "internal-regulations",
  "general-policy",
  "privacy-policy",
] as const;

export type LegalSlug = (typeof legalSlugs)[number];
