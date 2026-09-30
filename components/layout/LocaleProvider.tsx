"use client";

import { createContext, useContext, type ReactNode } from "react";
import { localeMeta, localizedPath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";

type LocaleContextValue = {
  lang: Locale;
  dir: "ltr" | "rtl";
  dict: Dictionary;
  /** Prefixes a site path with the current language. */
  href: (path: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

/** Hands the page's language and dictionary to client components (header,
 * contact form, gallery…). Server Components use getDict() instead. */
export function LocaleProvider({
  lang,
  dict,
  children,
}: {
  lang: Locale;
  dict: Dictionary;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider
      value={{ lang, dir: localeMeta[lang].dir, dict, href: (path) => localizedPath(lang, path) }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside <LocaleProvider>");
  return value;
}
