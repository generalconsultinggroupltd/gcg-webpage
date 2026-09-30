import { localeMeta, type Locale } from "./config";

// Small helpers safe to import from client components (unlike ./index,
// which carries the dictionary loaders).

/** Fills "{name}" placeholders: t("Visit {site}", { site: "a.com" }). */
export function t(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/** A plain count in the page's language: "1,240" / "1 240". */
export function formatNumber(lang: Locale, n: number): string {
  return new Intl.NumberFormat(localeMeta[lang].intl).format(n);
}
