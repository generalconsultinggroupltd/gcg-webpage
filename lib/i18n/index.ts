import type en from "./dictionaries/en";
import type { LegalDocument } from "@/lib/legal";
import type { Locale } from "./config";

export * from "./config";
export * from "./format";

/** The shape of every dictionary, taken from the English source. */
export type Dictionary = typeof en;

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((m) => m.default),
  fr: () => import("./dictionaries/fr").then((m) => m.default),
  ar: () => import("./dictionaries/ar").then((m) => m.default),
  sw: () => import("./dictionaries/sw").then((m) => m.default),
  pt: () => import("./dictionaries/pt").then((m) => m.default),
  es: () => import("./dictionaries/es").then((m) => m.default),
  de: () => import("./dictionaries/de").then((m) => m.default),
  it: () => import("./dictionaries/it").then((m) => m.default),
  ru: () => import("./dictionaries/ru").then((m) => m.default),
  zh: () => import("./dictionaries/zh").then((m) => m.default),
  ja: () => import("./dictionaries/ja").then((m) => m.default),
};

/** Loads the dictionary for a language. Server Components call this (via
 * getDict); client components read it from LocaleProvider. */
export function getDictionary(lang: Locale): Promise<Dictionary> {
  return loaders[lang]();
}

/** The legal documents are long and only needed on their own pages, so they
 * live apart from the dictionaries (which every page sends to the browser).
 * Languages missing here show the English documents (see legalPage.englishOnly). */
const legalLoaders: Partial<Record<Locale, () => Promise<LegalDocument[]>>> = {
  en: () => import("./legal/en").then((m) => m.default),
  fr: () => import("./legal/fr").then((m) => m.default),
  ar: () => import("./legal/ar").then((m) => m.default),
  sw: () => import("./legal/sw").then((m) => m.default),
  pt: () => import("./legal/pt").then((m) => m.default),
};

/** Whether the legal documents have been translated into this language. */
export function hasLegalTranslation(lang: Locale): boolean {
  return lang in legalLoaders;
}

export function getLegalDocuments(lang: Locale): Promise<LegalDocument[]> {
  return (legalLoaders[lang] ?? legalLoaders.en!)();
}
