import { Inter, Noto_Naskh_Arabic, Noto_Sans_Arabic, Playfair_Display } from "next/font/google";

// Cyrillic is for the Russian pages. Chinese and Japanese use the system's
// own CJK fonts (see :lang(zh) / :lang(ja) in globals.css): web fonts for
// them weigh several megabytes.
export const inter = Inter({ variable: "--font-inter", subsets: ["latin", "cyrillic"] });
export const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
});

// Inter and Playfair have no Arabic letters. These take over on Arabic pages
// only (see :lang(ar) in globals.css) and are not preloaded elsewhere.
export const arabicSans = Noto_Sans_Arabic({
  variable: "--font-arabic-sans",
  subsets: ["arabic"],
  preload: false,
});
export const arabicSerif = Noto_Naskh_Arabic({
  variable: "--font-arabic-serif",
  subsets: ["arabic"],
  preload: false,
});

/** Font variables for <html>. */
export function fontClasses(arabic = false) {
  const base = `${inter.variable} ${playfair.variable}`;
  return arabic ? `${base} ${arabicSans.variable} ${arabicSerif.variable}` : base;
}
