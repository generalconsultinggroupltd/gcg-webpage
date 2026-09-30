import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
  align = "left",
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <div
      data-reveal=""
      className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl ${className}`}
    >
      {eyebrow && (
        <Eyebrow
          tone={tone}
          className={`mb-4 ${align === "center" ? "justify-center" : ""}`}
        >
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={`font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-navy-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            light ? "text-white/75" : "text-muted"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
