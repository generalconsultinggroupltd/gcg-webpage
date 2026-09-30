import type { ReactNode } from "react";

/** Small uppercase label with a gold rule, e.g. "OUR SERVICES ——". */
export function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const text = tone === "light" ? "text-white" : "text-navy-900";
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] ${text} ${className}`}
    >
      <span>{children}</span>
      <span className="h-px w-10 bg-gold-500" aria-hidden />
    </p>
  );
}
