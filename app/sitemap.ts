import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { legalSlugs } from "@/lib/legal";
import { locales, localizedPath } from "@/lib/i18n/config";
import { languageAlternates } from "@/lib/i18n/metadata";

type Page = { path: string; priority: number; changeFrequency: "monthly" | "yearly" };

const pages: Page[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/consulting", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/import-export", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/representation", priority: 0.8, changeFrequency: "monthly" },
  { path: "/partners", priority: 0.6, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  ...legalSlugs.map((slug): Page => ({ path: `/${slug}`, priority: 0.3, changeFrequency: "yearly" })),
];

const absolute = (path: string) => `${site.url}${path}`;

/** Every page in every language, each listing its translations so search
 * engines show visitors the version in their language. */
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority, changeFrequency }) => {
    const alternates = Object.fromEntries(
      Object.entries(languageAlternates(path)).map(([code, href]) => [code, absolute(href)]),
    );
    return locales.map((lang) => ({
      url: absolute(localizedPath(lang, path)),
      changeFrequency,
      priority,
      alternates: { languages: alternates },
    }));
  });
}
