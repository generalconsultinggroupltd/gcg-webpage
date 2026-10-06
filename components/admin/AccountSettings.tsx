"use client";

import { useEffect, useState, type FormEvent } from "react";
import { adminFetch, storeToken, type IssuedToken } from "@/lib/adminAuth";
import { Button, Card, Field, Notice, PageHeader, errorMessage, inputClass } from "./ui";

const PASSWORD_RULE =
  "At least 8 characters, with at least one letter, one digit and one special character.";

/** "My account": change the sign-in email or the password. Either change
 * signs out every other browser; this one is handed a fresh session. */
export function AccountSettings() {
  const [email, setEmail] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    adminFetch<{ email: string }>("/api/admin/account")
      .then((account) => setEmail(account.email))
      .catch((err) => setLoadError(errorMessage(err)));
  }, []);

  return (
    <div>
      <PageHeader title="My account" description="The email and password used to sign in to this panel." />
      {loadError && <p className="mt-6 text-sm text-red-600">{loadError}</p>}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {email !== null && <EmailForm current={email} onChanged={setEmail} />}
        <PasswordForm />
      </div>
    </div>
  );
}

function EmailForm({ current, onChanged }: { current: string; onChanged: (email: string) => void }) {
  const [email, setEmail] = useState(current);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSuccess(null);
    if (!email.trim()) return setError("Please enter the new email address.");
    if (email.trim().toLowerCase() === current.toLowerCase()) return setError("This is already your email address.");
    if (!password) return setError("Please confirm with your current password.");

    setBusy(true);
    setError(null);
    try {
      storeToken(
        await adminFetch<IssuedToken>("/api/admin/account/email", {
          method: "PUT",
          json: { email: email.trim(), current_password: password },
        }),
      );
      onChanged(email.trim());
      setPassword("");
      setSuccess("Email updated. Use it the next time you sign in.");
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <h2 className="font-serif text-xl font-semibold text-navy-950">Email address</h2>
      <p className="mt-1 text-sm text-muted">
        Currently <strong className="text-ink">{current}</strong>. Password reset links are sent here.
      </p>
      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        <Field label="New email">
          {(id) => (
            <input
              id={id}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
            />
          )}
        </Field>
        <Field label="Current password">
          {(id) => (
            <input
              id={id}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClass}
            />
          )}
        </Field>
        <Notice error={error} success={success} />
        <Button type="submit" disabled={busy}>
          {busy ? "Saving…" : "Change email"}
        </Button>
      </form>
    </Card>
  );
}

function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSuccess(null);
    if (!current || !next || !confirmation) return setError("Please fill in all three fields.");
    if (next !== confirmation) return setError("The two new passwords do not match.");

    setBusy(true);
    setError(null);
    try {
      storeToken(
        await adminFetch<IssuedToken>("/api/admin/account/password", {
          method: "PUT",
          json: { current_password: current, new_password: next, password_confirmation: confirmation },
        }),
      );
      setCurrent("");
      setNext("");
      setConfirmation("");
      setSuccess("Password changed. Other browsers have been signed out.");
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <h2 className="font-serif text-xl font-semibold text-navy-950">Password</h2>
      <p className="mt-1 text-sm text-muted">{PASSWORD_RULE}</p>
      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        <Field label="Current password">
          {(id) => (
            <input
              id={id}
              type="password"
              autoComplete="current-password"
              value={current}
              onChange={(event) => setCurrent(event.target.value)}
              className={inputClass}
            />
          )}
        </Field>
        <Field label="New password">
          {(id) => (
            <input
              id={id}
              type="password"
              autoComplete="new-password"
              value={next}
              onChange={(event) => setNext(event.target.value)}
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
        <Notice error={error} success={success} />
        <Button type="submit" disabled={busy}>
          {busy ? "Saving…" : "Change password"}
        </Button>
      </form>
    </Card>
  );
}

export { PASSWORD_RULE };
