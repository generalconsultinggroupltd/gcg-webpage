import "../globals.css";
import type { Metadata } from "next";
import { fontClasses } from "@/lib/fonts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Statistics | ${site.name}`,
  robots: { index: false, follow: false },
};

/** Staff-only area, and its own root layout: outside the public site's
 * language routing (it stays in English), with none of its header, footer,
 * smooth scrolling or analytics tag. */
export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <html lang="en" className={`${fontClasses()} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-cream">{children}</body>
    </html>
  );
}
