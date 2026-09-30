import type { CSSProperties } from "react";

/**
 * Props that make an element fade in on scroll (see ScrollReveal).
 * Pass the item's index in a list to stagger siblings.
 */
export function reveal(index = 0, step = 90) {
  return {
    "data-reveal": "",
    style: { "--reveal-delay": `${index * step}ms` } as CSSProperties,
  };
}

/** Inline style for a load-time `animate-fade-up` delay. */
export function delay(ms: number) {
  return { "--delay": `${ms}ms` } as CSSProperties;
}
