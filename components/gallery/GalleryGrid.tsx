"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { isUploaded, mediaUrl, type GalleryItem } from "@/lib/api";
import { CloseIcon, PlayIcon } from "@/components/ui/Icons";
import { reveal } from "@/lib/motion";
import { t } from "@/lib/i18n/format";
import { useLocale } from "@/components/layout/LocaleProvider";

/** Photo/video grid with captions and a simple full-screen viewer (as on
 * the previous site). Items come from the API (managed in /admin). */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const { dict } = useLocale();
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
          <li key={item.id} {...reveal(index % 3)}>
            <button
              type="button"
              onClick={() => setActive(item)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-navy-900 shadow-card ring-1 ring-line"
              aria-label={t(dict.gallery.open, { item: item.description })}
            >
              {item.media_type === "image" ? (
                <Image
                  src={mediaUrl(item.path)}
                  alt={item.description}
                  unoptimized={isUploaded(item.path)}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <>
                  <video
                    src={`${mediaUrl(item.path)}#t=0.1`}
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
            {item.description && (
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
            )}
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.description}
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
            {active.media_type === "image" ? (
              <Image
                src={mediaUrl(active.path)}
                alt={active.description}
                unoptimized={isUploaded(active.path)}
                width={1080}
                height={810}
                className="mx-auto max-h-[85vh] w-auto rounded-lg object-contain"
              />
            ) : (
              <video
                src={mediaUrl(active.path)}
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
