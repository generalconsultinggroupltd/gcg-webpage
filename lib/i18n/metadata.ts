import type { Metadata } from "next";
import { defaultLocale, localeMeta, locales, localizedPath, type Locale } from "./config";

/** hreflang alternates for one site path in every language, plus x-default
 * pointing at English. Paths are relative: metadataBase makes them absolute. */
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const code of locales) languages[code] = localizedPath(code, path);
  languages["x-default"] = localizedPath(defaultLocale, path);
  return languages;
}

/** Metadata shared by every inner page: title and description in the page's
 * language, canonical URL, hreflang alternates and Open Graph locale. */
export function pageMetadata(
  lang: Locale,
  path: string,
  page: { title: string; description?: string },
): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: localizedPath(lang, path),
      languages: languageAlternates(path),
    },
    openGraph: {
      locale: localeMeta[lang].og,
      title: page.title,
      description: page.description,
      url: localizedPath(lang, path),
    },
  };
}
