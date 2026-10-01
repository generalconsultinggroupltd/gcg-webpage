"use client";

import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, localeMeta, locales, stripLocale, type Locale } from "@/lib/i18n/config";
import { CheckIcon, ChevronDownIcon, GlobeIcon } from "@/components/ui/Icons";
import { useLocale } from "./LocaleProvider";

/** Remembers the choice for a year, so the next visit to an unprefixed URL
 * (the bare domain, an old link) opens in the same language (see proxy.ts). */
function remember(lang: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * Language dropdown. The items are real links to the same page in each
 * language: a full page load is what switches <html lang> and dir (Arabic is
 * right-to-left), and it gives search engines a path to every version.
 */
export function LanguageSwitcher({
  menuPosition = "end-0 mt-2",
}: {
  /** Placement classes for the dropdown; the footer opens it upwards. */
  menuPosition?: string;
}) {
  const { lang, dict } = useLocale();
  const rest = stripLocale(usePathname());
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const hrefFor = (code: Locale) => `/${code}${rest === "/" ? "" : rest}`;

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={dict.header.language}
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-white transition-colors hover:text-gold-300"
      >
        <GlobeIcon className="h-5 w-5" />
        <span className="uppercase">{lang}</span>
        <ChevronDownIcon className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          id={menuId}
          role="menu"
          aria-label={dict.header.languages}
          className={`absolute z-50 max-h-[70vh] w-44 overflow-y-auto rounded-lg border border-white/10 bg-navy-900 py-1 shadow-card ${menuPosition}`}
        >
          {locales.map((code) => {
            const selected = code === lang;
            return (
              <li key={code} role="none">
                <a
                  role="menuitem"
                  href={hrefFor(code)}
                  hrefLang={code}
                  lang={code}
                  dir={localeMeta[code].dir}
                  aria-current={selected ? "true" : undefined}
                  onClick={(event: MouseEvent) => {
                    if (selected) {
                      event.preventDefault();
                      setOpen(false);
                      return;
                    }
                    remember(code);
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-3.5 py-2 text-start text-sm transition-colors hover:bg-white/5 ${
                    selected ? "text-gold-300" : "text-white/85"
                  }`}
                >
                  <span>{localeMeta[code].label}</span>
                  {selected ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <span className="text-xs uppercase text-white/40">{code}</span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
