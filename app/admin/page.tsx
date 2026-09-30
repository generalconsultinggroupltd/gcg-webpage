"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { getToken, signIn, signOut, subscribeToSession } from "@/lib/adminAuth";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import { Container } from "@/components/ui/Container";
import { LockIcon } from "@/components/ui/Icons";
import { site } from "@/lib/site";

/** The statistics dashboard, behind the shared admin password. */
export default function AdminPage() {
  // undefined until the browser has read the stored session.
  const token = useSyncExternalStore<string | null | undefined>(
    subscribeToSession,
    getToken,
    () => undefined,
  );

  if (token === undefined) return null;
  if (!token) return <SignIn />;

  return (
    <>
      <header className="bg-navy-950 text-white">
        <Container className="flex items-center justify-between gap-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-removebg-preview.png" alt="" width={40} height={40} className="h-10 w-10" />
            <span className="text-sm font-semibold">
              {site.name} <span className="text-white/50">· Admin</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="rounded-md border border-white/25 px-3 py-1.5 text-xs font-semibold transition-colors hover:border-gold-300 hover:text-gold-300"
          >
            Sign out
          </button>
        </Container>
      </header>
      <Container className="py-8 sm:py-10">
        <AnalyticsDashboard />
      </Container>
    </>
  );
}

function SignIn() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!password) {
      setError("Please enter the password.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await signIn(password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign you in.");
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-navy-950 px-5 py-16">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-card">
        <div className="flex flex-col items-center text-center">
          <Image src="/logo.jpeg" alt={site.name} width={72} height={72} className="h-18 w-18 rounded" />
          <h1 className="mt-4 font-serif text-2xl font-semibold text-navy-950">Admin</h1>
          <p className="mt-1 text-sm text-muted">Website statistics</p>
        </div>
        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Password</span>
            <span className="relative block">
              <LockIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="password"
                autoComplete="current-password"
                autoFocus
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-md border border-line bg-white py-3 pr-4 pl-10 text-sm text-ink outline-none transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30"
              />
            </span>
          </label>
          <div aria-live="polite" className="min-h-5 text-sm text-red-600">
            {error}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-gold-500 px-5 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
