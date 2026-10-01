import Link from "next/link";
import { navigation, site } from "@/lib/site";
import { legalSlugs } from "@/lib/legal";
import { t } from "@/lib/i18n";
import { getDict } from "@/lib/i18n/server";
import { Container } from "@/components/ui/Container";
import { socialIcons } from "@/components/ui/Icons";
import { CookieSettingsButton } from "@/components/analytics/CookieSettingsButton";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";

export async function Footer() {
  const { dict, href } = await getDict();
  const year = new Date().getFullYear();
  const social = site.social.filter((item) => item.href !== "#");

  return (
    <footer className="bg-navy-950 text-white">
      <Container className="py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Logo size="md" href={href("/")} label={t(dict.header.homeLink, { name: site.name })} />

          <nav aria-label={dict.footer.nav}>
            <ul className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-white/85">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={href(item.href)} className="transition-colors hover:text-gold-300">
                    {dict.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            {social.length > 0 && (
              <>
                <ul className="flex items-center gap-4">
                  {social.map((item) => {
                    const Icon = socialIcons[item.name];
                    return (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={item.name}
                          className="block text-white/80 transition-colors hover:text-gold-300"
                        >
                          <Icon className="h-4.5 w-4.5" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <span className="h-5 w-px bg-white/20" aria-hidden />
              </>
            )}
            {/* Opens upwards; left-aligned on phones, where the switcher sits at the
                start of the row, and right-aligned on desktop. */}
            <LanguageSwitcher menuPosition="bottom-full mb-2 start-0 lg:start-auto lg:end-0" />
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {t(dict.footer.rights, { year, name: site.name })}{" "}
            <span className="text-white/40">·</span> {dict.footer.developedBy}{" "}
            <a
              href={site.developer.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 transition-colors hover:text-gold-300"
            >
              {site.developer.name}
            </a>
          </p>
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {legalSlugs.map((slug, index) => (
              <li key={slug} className="flex items-center gap-3">
                {index > 0 && <span className="h-3 w-px bg-white/25" aria-hidden />}
                <Link href={href(`/${slug}`)} className="transition-colors hover:text-gold-300">
                  {dict.footer.legal[slug]}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-3 empty:hidden">
              <CookieSettingsButton label={dict.footer.cookieSettings} className="flex items-center gap-3 transition-colors hover:text-gold-300 before:h-3 before:w-px before:bg-white/25 before:content-['']" />
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
