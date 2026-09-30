"use client";

import { GA_MEASUREMENT_ID, OPEN_CONSENT_EVENT } from "@/lib/analytics";

/** Footer link that reopens the cookie banner, so a choice can be changed
 * at any time. Hidden when analytics isn't configured (nothing to choose). */
export function CookieSettingsButton({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  if (!GA_MEASUREMENT_ID) return null;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className={className}
    >
      {label}
    </button>
  );
}
