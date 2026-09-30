"use client";

import { useEffect } from "react";

/**
 * Fades elements marked with `data-reveal` in as they scroll into view.
 *
 * Content is fully visible in the server HTML; hiding only starts once this
 * runs, so the page still works without JavaScript. Elements already on
 * screen at that moment are shown straight away to avoid a flicker. New
 * elements (after a client-side navigation) are picked up automatically.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    const track = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)").forEach((element) => {
        observer.observe(element);
      });
    };

    // First paint: whatever is already on screen stays put.
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        element.classList.add("is-visible");
      }
    });
    document.documentElement.classList.add("reveal-ready");
    track(document);

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches("[data-reveal]")) observer.observe(node);
          track(node);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
