"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, site } from "@/lib/site";
import { t } from "@/lib/i18n/format";
import { Container } from "@/components/ui/Container";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { stripLocale } from "@/lib/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLocale } from "./LocaleProvider";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const { dict, href } = useLocale();
  // Active state compares paths without the /{lang} prefix.
  const pathname = stripLocale(usePathname());
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-white/10 bg-navy-950 text-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_8px_24px_-12px_rgb(0_0_0_/_0.6)]" : ""
      }`}
    >
      <Container className="flex h-[76px] items-center justify-between gap-3 sm:gap-6">
        <Logo priority href={href("/")} label={t(dict.header.homeLink, { name: site.name })} />

        <nav aria-label={dict.header.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-9">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={href(item.href)}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 text-[15px] font-medium transition-colors hover:text-gold-300 ${
                      active ? "text-gold-400" : "text-white/90"
                    }`}
                  >
                    {dict.nav[item.key]}
                    <span
                      aria-hidden
                      className={`absolute -bottom-1 start-0 h-0.5 w-full bg-gold-500 transition-opacity ${
                        active ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            className="rounded-md p-2 text-white transition-colors hover:text-gold-300 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? dict.header.closeMenu : dict.header.openMenu}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-white/10 transition-[max-height] duration-300 lg:hidden ${
          menuOpen ? "max-h-[420px]" : "max-h-0 border-t-0"
        }`}
      >
        <nav aria-label={dict.header.mobileNav}>
          <Container>
            <ul className="flex flex-col py-3">
              {navigation.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={href(item.href)}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={`block border-s-2 py-3 ps-4 text-base font-medium transition-colors ${
                        active
                          ? "border-gold-500 text-gold-400"
                          : "border-transparent text-white/90 hover:text-gold-300"
                      }`}
                    >
                      {dict.nav[item.key]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </nav>
      </div>
    </header>
  );
}
