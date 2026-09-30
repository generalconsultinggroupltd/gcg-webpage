"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { GalleryItem } from "@/lib/gallery";
import { CloseIcon, PlayIcon } from "@/components/ui/Icons";
import { reveal } from "@/lib/motion";
import { t } from "@/lib/i18n/format";
import { useLocale } from "@/components/layout/LocaleProvider";

/** Photo/video grid with a simple full-screen viewer (as on the previous site). */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const { dict } = useLocale();
  // Descriptions are in the dictionary, at the same index as the media.
  const altOf = (item: GalleryItem) => dict.gallery.items[items.indexOf(item)] ?? "";
  const [active, setActive] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <li key={item.src} {...reveal(index % 3)}>
            <button
              type="button"
              onClick={() => setActive(item)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-navy-900 shadow-card ring-1 ring-line"
              aria-label={t(dict.gallery.open, { item: altOf(item) })}
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={altOf(item)}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <>
                  <video
                    src={`${item.src}#t=0.1`}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-navy-950/30 transition-colors group-hover:bg-navy-950/45">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold-500 bg-navy-950/80 text-gold-400">
                      <PlayIcon className="ml-0.5 h-6 w-6" />
                    </span>
                  </span>
                </>
              )}
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={altOf(active)}
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/95 p-4 sm:p-8"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label={dict.common.close}
            className="absolute top-4 end-4 rounded-full p-2 text-white transition-colors hover:text-gold-300"
          >
            <CloseIcon className="h-7 w-7" />
          </button>
          <div
            className="relative max-h-full w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            {active.type === "image" ? (
              <Image
                src={active.src}
                alt={altOf(active)}
                width={1080}
                height={810}
                className="mx-auto max-h-[85vh] w-auto rounded-lg object-contain"
              />
            ) : (
              <video
                src={active.src}
                controls
                autoPlay
                playsInline
                className="mx-auto max-h-[85vh] w-auto rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
