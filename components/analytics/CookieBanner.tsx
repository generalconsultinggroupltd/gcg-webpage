"use client";

import Link from "next/link";
import type { ConsentChoice } from "@/lib/analytics";
import { t } from "@/lib/i18n/format";
import { useLocale } from "@/components/layout/LocaleProvider";

/**
 * Asks once whether Google Analytics may run. "Decline" is as prominent as
 * "Accept" — consent only counts when refusing is as easy as agreeing.
 * Not a modal: the page stays usable while the question is open.
 */
export function CookieBanner({
  current,
  onChoose,
}: {
  current: ConsentChoice | null;
  onChoose: (choice: ConsentChoice) => void;
}) {
  const { dict, href } = useLocale();
  const copy = dict.cookies;
  const button =
    "inline-flex flex-1 items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors sm:flex-none";

  return (
    <section
      role="region"
      aria-label={copy.region}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-lg border border-white/10 bg-navy-950 p-5 text-white shadow-card sm:inset-x-6 sm:bottom-6 sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="text-sm leading-relaxed text-white/80">
          <p className="font-semibold text-white">{copy.title}</p>
          <p className="mt-1">
            {copy.text}{" "}
            <Link
              href={href("/privacy-policy")}
              className="text-gold-300 underline underline-offset-2"
            >
              {copy.privacyPolicy}
            </Link>
            {current && (
              <span className="text-white/60">
                {" "}
                ·{" "}
                {t(copy.current, {
                  choice: current === "granted" ? copy.accepted : copy.declined,
                })}
              </span>
            )}
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => onChoose("denied")}
            className={`${button} border border-white/30 text-white hover:border-gold-300 hover:text-gold-300`}
          >
            {copy.decline}
          </button>
          <button
            type="button"
            onClick={() => onChoose("granted")}
            className={`${button} bg-gold-500 text-navy-950 hover:bg-gold-400`}
          >
            {copy.accept}
          </button>
        </div>
      </div>
    </section>
  );
}
