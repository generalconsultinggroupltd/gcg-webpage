import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SmoothScroll } from "./SmoothScroll";
import { ScrollReveal } from "./ScrollReveal";
import { getDict } from "@/lib/i18n/server";

/** Header, footer and scroll behaviour of the public site (app/[lang]); the
 * /admin dashboard has none of it. */
export async function SiteChrome({ children }: { children: ReactNode }) {
  const { dict } = await getDict();
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-950 focus:not-sr-only focus:fixed focus:top-3 focus:start-3"
      >
        {dict.common.skipToContent}
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <SmoothScroll />
      <ScrollReveal />
    </>
  );
}
