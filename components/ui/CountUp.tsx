"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a figure like "+100", "100%", "1,284" or "1 284" up from zero when it
 * scrolls into view. Grouped figures are re-grouped with `locale` as they
 * count. The final value is what the server renders, so it is
 * always correct without JavaScript and for search engines.
 */
export function CountUp({
  value,
  duration = 1400,
  locale = "en-US",
}: {
  value: string;
  duration?: number;
  locale?: string;
}) {
  // Digits plus the group separators Intl uses (comma, dot, spaces).
  const match = value.match(/^([^\d]*)(\d(?:[\d,.\s\u00a0\u202f]*\d)?)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!match || !element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replace(/\D/g, ""));
    const grouped = /\D/.test(digits);
    const formatter = new Intl.NumberFormat(locale);
    const format = (n: number) => (grouped ? formatter.format(n) : String(n));
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(`${prefix}${format(Math.round(target * eased))}${suffix}`);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        setDisplay(`${prefix}0${suffix}`);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // `match` is derived from `value`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration, locale]);

  return <span ref={ref}>{display}</span>;
}
