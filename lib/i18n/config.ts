/**
 * The languages the public site is published in. Every public page lives
 * under /{lang} (e.g. /fr/about); proxy.ts sends unprefixed URLs to the
 * visitor's language. The /admin dashboard is not translated.
 */
export const locales = ["en", "fr", "ar", "sw", "pt"] as const;
export type Locale = (typeof locales)[number];

/** English is the source every other dictionary is translated from. */
export const defaultLocale: Locale = "en";

/** Cookie remembering the language a visitor picked, read by proxy.ts. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const localeMeta: Record<
  Locale,
  {
    /** Name of the language in that language, for the switcher. */
    label: string;
    dir: "ltr" | "rtl";
    /** BCP 47 tag handed to Intl for dates and numbers. Arabic keeps
     * Western digits so figures and phone numbers read the same everywhere. */
    intl: string;
    /** Open Graph locale. */
    og: string;
  }
> = {
  en: { label: "English", dir: "ltr", intl: "en-GB", og: "en_US" },
  fr: { label: "Français", dir: "ltr", intl: "fr-FR", og: "fr_FR" },
  ar: { label: "العربية", dir: "rtl", intl: "ar-u-nu-latn", og: "ar_AR" },
  sw: { label: "Kiswahili", dir: "ltr", intl: "sw-KE", og: "sw_KE" },
  pt: { label: "Português", dir: "ltr", intl: "pt-PT", og: "pt_PT" },
};

export function hasLocale(value: string | undefined | null): value is Locale {
  return (locales as readonly string[]).includes(value ?? "");
}

/** Prefixes a site path with the language: localizedPath("fr", "/about")
 * → "/fr/about". Already-prefixed paths and external URLs pass through. */
export function localizedPath(lang: Locale, path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (hasLocale(clean.split("/")[1])) return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

/** Strips the language prefix: "/fr/about" → "/about", "/fr" → "/". */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if (!hasLocale(first)) return pathname;
  const remainder = rest.join("/");
  return remainder ? `/${remainder}` : "/";
}
