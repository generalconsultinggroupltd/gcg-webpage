"use client";

/**
 * Admin session for the /admin statistics dashboard: the bearer token the
 * backend issues for the shared ADMIN_PASSWORD, kept in localStorage until
 * it expires, plus a fetch wrapper that attaches it and turns the API's
 * { data } / { error } answers into a value or a thrown Error.
 */
import { API_URL } from "@/lib/api";

const TOKEN_KEY = "gcg-admin-session";
const CHANGE_EVENT = "gcg:admin-session";

type Session = { token: string; expiresAt: number };

function readSession(): Session | null {
  try {
    const raw = window.localStorage.getItem(TOKEN_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as Session;
    return session.token && session.expiresAt > Date.now() ? session : null;
  } catch {
    return null;
  }
}

/** The current token, or null when signed out or expired. A string, so it
 * can serve directly as a useSyncExternalStore snapshot. */
export function getToken(): string | null {
  return readSession()?.token ?? null;
}

export function subscribeToSession(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function setSession(session: Session | null) {
  try {
    if (session) window.localStorage.setItem(TOKEN_KEY, JSON.stringify(session));
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Storage blocked (private browsing): the session won't survive a reload.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function signOut() {
  setSession(null);
}

export async function signIn(password: string): Promise<void> {
  const { token, expires_at } = await adminFetch<{ token: string; expires_at: string }>(
    "/api/admin/login",
    { method: "POST", json: { password } },
  );
  setSession({ token, expiresAt: new Date(expires_at).getTime() });
}

/** Fetch wrapper for every admin API call. A 401 ends the session, which
 * sends the page back to the sign-in form. */
export async function adminFetch<T>(
  path: string,
  options: { method?: string; json?: unknown } = {},
): Promise<T> {
  const headers: Record<string, string> = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (options.json !== undefined) headers["Content-Type"] = "application/json";

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method: options.method ?? "GET",
      headers,
      body: options.json === undefined ? undefined : JSON.stringify(options.json),
    });
  } catch {
    throw new Error("Cannot reach the server. Check that the API is running.");
  }

  const payload: { data?: T; error?: string } = await response.json().catch(() => ({}));
  // A 401 on the login itself is just a wrong password, not an ended session.
  if (response.status === 401 && token) signOut();
  if (!response.ok) throw new Error(payload.error ?? "Something went wrong.");
  return payload.data as T;
}
