/**
 * Google Analytics (GA4) settings shared by the tag, the cookie banner and
 * the admin statistics dashboard.
 *
 * The measurement ID is public by nature (it is embedded in every page), but
 * unlike the foundation site there is no hard-coded fallback: this site must
 * report to its own GA4 property, so with no ID set the tag and the cookie
 * banner are simply left out.
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

/** Hosts the tag must stay silent on, so a developer's local runs never land
 * in the company's visitor statistics. */
export const LOCAL_HOSTS = ["localhost", "127.0.0.1", "[::1]"];

/** Where the visitor's cookie choice is remembered (browser only). */
export const CONSENT_STORAGE_KEY = "gcg-analytics-consent";

/** The choice is asked again after this long, as the privacy policy says. */
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

/** Fired by the footer's "Cookie settings" link to reopen the banner. */
export const OPEN_CONSENT_EVENT = "gcg:open-cookie-settings";

export type ConsentChoice = "granted" | "denied";

type StoredConsent = { choice: ConsentChoice; at: number };

/** The visitor's current choice, or null when they haven't chosen (or the
 * choice has expired, or storage is unavailable). */
export function readConsent(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as StoredConsent;
    if (stored.choice !== "granted" && stored.choice !== "denied") return null;
    if (!(Date.now() - stored.at < CONSENT_MAX_AGE_MS)) return null;
    return stored.choice;
  } catch {
    return null;
  }
}

/** Remembers the choice and applies it to the loaded tag (Consent Mode v2). */
export function saveConsent(choice: ConsentChoice) {
  try {
    const stored: StoredConsent = { choice, at: Date.now() };
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", { analytics_storage: choice });
}
