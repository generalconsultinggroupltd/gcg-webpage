"use client";

import Link from "next/link";
import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import { adminFetch } from "@/lib/adminAuth";
import { HandshakeIcon, ImagesIcon, PagesIcon, VideoIcon } from "@/components/ui/Icons";
import { errorMessage } from "./ui";

type Summary = { partners: number; gallery: number; photos: number; videos: number };

/** The previous admin's home page: how many partners, gallery items,
 * photos and videos the site shows. Each tile opens its section. */
export function ContentSummary() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminFetch<Summary>("/api/admin/summary")
      .then(setSummary)
      .catch((err) => setError(errorMessage(err)));
  }, []);

  const tiles: { label: string; value?: number; href: string; icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
    { label: "Partners", value: summary?.partners, href: "/admin/partners", icon: HandshakeIcon },
    { label: "Gallery items", value: summary?.gallery, href: "/admin/gallery", icon: PagesIcon },
    { label: "Photos", value: summary?.photos, href: "/admin/gallery", icon: ImagesIcon },
    { label: "Videos", value: summary?.videos, href: "/admin/gallery", icon: VideoIcon },
  ];

  return (
    <section>
      <h1 className="font-serif text-3xl font-semibold text-navy-950">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">What the website shows today.</p>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {tiles.map(({ label, value, href, icon: Icon }) => (
          <li key={label}>
            <Link
              href={href}
              className="flex items-center gap-4 rounded-lg border border-line bg-white p-5 shadow-sm transition-colors hover:border-gold-500"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-100 text-navy-800">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-serif text-2xl font-semibold text-navy-950 tabular-nums">
                  {value ?? "–"}
                </span>
                <span className="text-sm text-muted">{label}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
