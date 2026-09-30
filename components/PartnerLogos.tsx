"use client";

import Image from "next/image";
import { useRef } from "react";
import { partners } from "@/lib/partners";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";
import { useLocale } from "@/components/layout/LocaleProvider";

/** Horizontal, scrollable strip of partner logos with prev/next controls. */
export function PartnerLogos() {
  const { dict, dir } = useLocale();
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollBy = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    // In a right-to-left page "next" lies to the left.
    const sign = dir === "rtl" ? -1 : 1;
    track.scrollBy({ left: sign * direction * track.clientWidth * 0.7, behavior: "smooth" });
  };

  const controlClass =
    "hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-navy-900 transition-colors hover:border-gold-500 hover:text-gold-600 sm:flex";

  return (
    <div className="flex items-center gap-4" data-reveal="">
      <button type="button" aria-label={dict.partners.previous} className={controlClass} onClick={() => scrollBy(-1)}>
        <ChevronLeftIcon className="h-4 w-4" />
      </button>

      <ul
        ref={trackRef}
        className="flex flex-1 snap-x gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {partners.map((partner) => (
          <li
            key={partner.name}
            className="flex h-24 w-44 shrink-0 snap-start items-center justify-center rounded-lg bg-white p-4 ring-1 ring-line"
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={partner.width}
              height={partner.height}
              className="max-h-16 w-auto object-contain"
            />
          </li>
        ))}
      </ul>

      <button type="button" aria-label={dict.partners.next} className={controlClass} onClick={() => scrollBy(1)}>
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
