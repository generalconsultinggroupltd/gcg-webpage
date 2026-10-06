"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { publicPost } from "@/lib/adminAuth";
import { PASSWORD_RULE } from "./AccountSettings";
import { AuthCard, Button, Field, Notice, errorMessage, inputClass } from "./ui";

const backLink = (
  <Link href="/admin" className="block text-center text-sm font-medium text-gold-600 hover:text-gold-500">
    Back to sign in
  </Link>
);

/** Asks the API to email a reset link to the admin address. */
export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email.trim()) return setError("Please enter your email address.");
    setBusy(true);
    setError(null);
    try {
      setSuccess(await publicPost("/api/admin/forgot-password", { email: email.trim() }));
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthCard subtitle="Forgot your password?">
      {success ? (
        <div className="space-y-6">
          <p className="text-sm leading-relaxed text-emerald-700">{success}</p>
          {backLink}
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <p className="text-sm text-muted">Enter the admin email address and we will send you a link to choose a new password.</p>
          <Field label="Email">
            {(id) => (
              <input
                id={id}
                type="email"
                autoComplete="username"
                autoFocus
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={inputClass}
              />
            )}
          </Field>
          <Notice error={error} />
          <Button type="submit" disabled={busy} className="w-full">
            {busy ? "Sending…" : "Send the reset link"}
          </Button>
          {backLink}
        </form>
      )}
    </AuthCard>
  );
}

/** Sets a new password with the token from the reset email
 * (/admin/reset-password?token=…). */
export function ResetPasswordForm() {
  const token = useSearchParams().get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!password || !confirmation) return setError("Please enter the new password twice.");
    if (password !== confirmation) return setError("The two passwords do not match.");
    setBusy(true);
    setError(null);
    try {
      setSuccess(
        await publicPost("/api/admin/reset-password", {
          token,
          password,
          password_confirmation: confirmation,
        }),
      );
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  if (!token) {
    return (
      <AuthCard subtitle="Reset your password">
        <div className="space-y-6">
          <p className="text-sm text-red-600">This reset link is incomplete. Please use the link from the email, or ask for a new one.</p>
          <Link href="/admin/forgot-password" className="block text-center text-sm font-medium text-gold-600 hover:text-gold-500">
            Ask for a new link
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard subtitle="Choose a new password">
      {success ? (
        <div className="space-y-6">
          <p className="text-sm leading-relaxed text-emerald-700">{success}</p>
          {backLink}
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <p className="text-xs text-muted">{PASSWORD_RULE}</p>
          <Field label="New password">
            {(id) => (
              <input
                id={id}
                type="password"
                autoComplete="new-password"
                autoFocus
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={inputClass}
              />
            )}
          </Field>
          <Field label="Confirm new password">
            {(id) => (
              <input
                id={id}
                type="password"
                autoComplete="new-password"
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                className={inputClass}
              />
            )}
          </Field>
          <Notice error={error} />
          <Button type="submit" disabled={busy} className="w-full">
            {busy ? "Saving…" : "Change the password"}
          </Button>
          {backLink}
        </form>
      )}
    </AuthCard>
  );
}
