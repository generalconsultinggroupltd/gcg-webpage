import type { ReactNode } from "react";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { delay } from "@/lib/motion";

/** Dark navy banner used at the top of inner pages. */
export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgb(201_165_82_/_0.18),_transparent_55%)]"
      />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        {eyebrow && (
          <Eyebrow tone="light" className="animate-fade-up mb-5">
            {eyebrow}
          </Eyebrow>
        )}
        <h1
          className="animate-fade-up max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
          style={delay(100)}
        >
          {title}
        </h1>
        {description && (
          <p
            className="animate-fade-up mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
            style={delay(200)}
          >
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
