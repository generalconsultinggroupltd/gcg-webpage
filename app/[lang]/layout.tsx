import "../globals.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@/components/analytics/Analytics";
import { LocaleProvider } from "@/components/layout/LocaleProvider";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { fontClasses } from "@/lib/fonts";
import { getDictionary, hasLocale, localeMeta, locales, localizedPath } from "@/lib/i18n";
import { languageAlternates } from "@/lib/i18n/metadata";
import { site } from "@/lib/site";

/** Every public page is prerendered once per language. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** Site-wide metadata, in the page's language. Pages override title,
 * description and canonical with pageMetadata(). */
export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = await getDictionary(lang);
  const home = localizedPath(lang, "/");

  return {
    metadataBase: new URL(site.url),
    title: { default: meta.homeTitle, template: `%s | ${site.name}` },
    description: meta.description,
    keywords: [site.name, site.shortName, ...meta.keywords],
    alternates: { canonical: home, languages: languageAlternates("/") },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: localeMeta[lang].og,
      url: home,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function SiteLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { dir } = localeMeta[lang];

  /** Organization structured data for search engines, in the page's language. */
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    alternateName: [site.name, site.shortName],
    url: site.url,
    logo: `${site.url}/logo.jpeg`,
    description: dict.meta.description,
    slogan: dict.meta.slogan,
    email: site.contact.email,
    telephone: site.contact.phones[0],
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "KN 4 Av 22",
        addressLocality: "Kigali",
        addressCountry: "RW",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Akwa",
        addressLocality: "Douala",
        addressCountry: "CM",
      },
    ],
    founder: { "@type": "Person", name: site.founder.name, jobTitle: site.founder.role },
    areaServed: ["Rwanda", "Cameroon", "Africa"],
    sameAs: site.social.map((item) => item.href).filter((href) => href !== "#"),
  };

  return (
    <html
      lang={lang}
      dir={dir}
      data-scroll-behavior="smooth"
      className={`${fontClasses(lang === "ar")} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <LocaleProvider lang={lang} dict={dict}>
          <SiteChrome>{children}</SiteChrome>
          {/* Google Analytics + cookie banner (silent on localhost) — see
              components/analytics/Analytics.tsx. */}
          <Analytics />
        </LocaleProvider>
      </body>
    </html>
  );
}
