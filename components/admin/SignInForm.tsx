"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { signIn } from "@/lib/adminAuth";
import { LockIcon, MailIcon } from "@/components/ui/Icons";
import { AuthCard, Button, Notice, errorMessage, inputClass } from "./ui";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await signIn(email.trim(), password);
    } catch (err) {
      setError(errorMessage(err));
      setLoading(false);
    }
  }

  const withIcon = `${inputClass} ps-10`;
  const iconClass = "pointer-events-none absolute top-1/2 start-3 h-4 w-4 -translate-y-1/2 text-muted";

  return (
    <AuthCard subtitle="Sign in to manage the website">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Email</span>
          <span className="relative block">
            <MailIcon className={iconClass} />
            <input
              type="email"
              autoComplete="username"
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={withIcon}
            />
          </span>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Password</span>
          <span className="relative block">
            <LockIcon className={iconClass} />
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={withIcon}
            />
          </span>
        </label>
        <div className="text-end">
          <Link href="/admin/forgot-password" className="text-sm font-medium text-gold-600 hover:text-gold-500">
            Forgot your password?
          </Link>
        </div>
        <Notice error={error} />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </AuthCard>
  );
}
