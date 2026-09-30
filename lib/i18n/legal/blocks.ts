import type { LegalBlock, LegalDocument, LegalSlug } from "@/lib/legal";

// Shorthands for writing the translated legal documents, one block per line.

export const h2 = (text: string): LegalBlock => ({ type: "h2", text });
export const h3 = (text: string): LegalBlock => ({ type: "h3", text });
export const p = (text: string): LegalBlock => ({ type: "p", text });
export const list = (...items: string[]): LegalBlock => ({ type: "list", items });
export const defs = (...items: [term: string, text: string][]): LegalBlock => ({
  type: "definitions",
  items: items.map(([term, text]) => ({ term, text })),
});

export const COMPANY = "GENERAL CONSULTING GROUP LTD";

export function doc(slug: LegalSlug, title: string, blocks: LegalBlock[]): LegalDocument {
  return { slug, title, company: COMPANY, blocks };
}
