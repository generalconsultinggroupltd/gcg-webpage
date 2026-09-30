import { lang } from "next/root-params";
import { defaultLocale, getDictionary, hasLocale, localizedPath, type Locale } from "./index";

/** The language of the page being rendered, for Server Components that
 * don't receive route params (homepage sections, not-found…). */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  return hasLocale(value) ? value : defaultLocale;
}

/** The page's language, its dictionary, and a helper that prefixes links. */
export async function getDict() {
  const locale = await getLocale();
  return {
    lang: locale,
    dict: await getDictionary(locale),
    href: (path: string) => localizedPath(locale, path),
  };
}
