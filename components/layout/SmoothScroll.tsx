"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronUpIcon } from "@/components/ui/Icons";
import { useLocale } from "./LocaleProvider";

/**
 * Eased, inertial scrolling for mouse wheels and trackpads. Phones and tablets
 * keep their native momentum scrolling, which is already smooth and which
 * users expect; anchor links and "back to top" are animated on every device.
 * Everything is skipped for visitors who ask the OS for reduced motion.
 */
export function SmoothScroll() {
  const { dict } = useLocale();
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) {
      lenisRef.current = new Lenis({
        autoRaf: true,
        lerp: 0.1,
        smoothWheel: true,
        anchors: { offset: -90 },
      });
    }

    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // A new page starts at the top, without animating through the old one.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={dict.common.backToTop}
      tabIndex={showTop ? 0 : -1}
      aria-hidden={!showTop}
      className={`fixed end-4 bottom-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-gold-500 text-navy-950 shadow-card transition-all duration-300 hover:bg-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 sm:end-6 sm:bottom-6 ${
        showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ChevronUpIcon className="h-5 w-5" />
    </button>
  );
}
