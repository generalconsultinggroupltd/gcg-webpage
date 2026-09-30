/** Base URL of the Go backend (`../backend`). */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080").replace(/\/$/, "");

/** All-time visitor figures from Google Analytics, served by the backend
 * from an hourly cache. See backend/analytics/audience.go. */
export type SiteStats = {
  visitors: number;
  countries: number;
  page_views: number;
  visitors_last_30_days: number;
  since: string;
  fetched_at: string;
};

/** Reads the homepage figures, or null when analytics isn't configured on
 * the server, the API is down, or the property has no visits yet. Cached by
 * Next for an hour, matching the backend's own cache, so the home page stays
 * static and is only regenerated when the figures could have changed. */
export async function getSiteStats(): Promise<SiteStats | null> {
  try {
    const response = await fetch(`${API_URL}/api/site-stats`, { next: { revalidate: 3600 } });
    // 204 means "not configured"; anything else but 200 is an error.
    if (response.status !== 200) return null;
    const body: { data?: SiteStats } = await response.json();
    return body.data ?? null;
  } catch {
    // API not running (e.g. frontend-only development): hide the section.
    return null;
  }
}
