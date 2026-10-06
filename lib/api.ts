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

/** A photo or video of the gallery, managed from /admin. */
export type GalleryItem = {
  id: number;
  media_type: "image" | "video";
  /** "/uploads/…" (served by the API) or a path in public/. */
  path: string;
  description: string;
  created_at: string;
  updated_at: string;
};

/** A partner shown on the home and partners pages, managed from /admin. */
export type Partner = {
  id: number;
  name: string;
  description: string;
  /** "/uploads/…" (served by the API) or a path in public/. */
  logo_path: string;
  created_at: string;
  updated_at: string;
};

/** True for files uploaded through the admin panel, which the API serves. */
export const isUploaded = (path: string) => path.startsWith("/uploads/");

/** Browser URL of a media path: uploads live on the API, the rest in
 * public/. Uploads skip next/image optimisation (`unoptimized`): the API
 * may sit on a private address, which the optimiser refuses to fetch. */
export const mediaUrl = (path: string) => (isUploaded(path) ? `${API_URL}${path}` : path);

/** How long a page keeps the gallery / partner list before asking the API
 * again: an edit in /admin shows on the site within a minute. */
const CONTENT_REVALIDATE = 60;

async function getContent<T>(path: string): Promise<T[] | null> {
  try {
    const response = await fetch(`${API_URL}${path}`, { next: { revalidate: CONTENT_REVALIDATE } });
    if (!response.ok) return null;
    const body: { data?: T[] } = await response.json();
    return body.data ?? null;
  } catch {
    return null;
  }
}

/** The gallery, or null when the API can't be reached (callers then show
 * the media shipped with the site, lib/gallery.ts). */
export const getGallery = () => getContent<GalleryItem>("/api/gallery");

/** The partners, or null when the API can't be reached (callers then show
 * lib/partners.ts). */
export const getPartners = () => getContent<Partner>("/api/partners");
