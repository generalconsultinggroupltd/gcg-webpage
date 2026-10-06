"use client";

import Image from "next/image";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { CloseIcon } from "@/components/ui/Icons";
import { site } from "@/lib/site";

// Building blocks shared by the admin pages, in the dashboard's style:
// white cards on cream, navy text, gold primary actions.

export const inputClass =
  "w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 disabled:bg-cream";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-navy-950">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: (id: string) => ReactNode;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children(id)}
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function Button({
  children,
  variant = "primary",
  type = "button",
  disabled,
  onClick,
  className = "",
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const styles = {
    primary: "bg-gold-500 text-navy-950 hover:bg-gold-400",
    secondary: "border border-line bg-white text-navy-900 hover:border-gold-500 hover:text-gold-600",
    danger: "bg-red-600 text-white hover:bg-red-700",
  }[variant];
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

/** Error / success line under a form; announced to screen readers. */
export function Notice({ error, success }: { error?: string | null; success?: string | null }) {
  return (
    <div aria-live="polite" className="min-h-5 text-sm">
      {error ? <p className="text-red-600">{error}</p> : success ? <p className="text-emerald-700">{success}</p> : null}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6 ${className}`}>
      {children}
    </section>
  );
}

/** Centred dialog. Escape and the backdrop close it unless `busy`. */
export function Modal({
  title,
  onClose,
  busy = false,
  children,
}: {
  title: string;
  onClose: () => void;
  busy?: boolean;
  children: ReactNode;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  // Latest values, read by the listener without re-running the effect
  // (which would move the focus back to the first field on every keystroke).
  const latest = useRef({ busy, onClose });
  useEffect(() => {
    latest.current = { busy, onClose };
  });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !latest.current.busy) latest.current.onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("input, textarea, select")?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy-950/60 p-4 sm:items-center"
      onClick={() => !busy && onClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="my-8 w-full max-w-lg rounded-lg bg-white shadow-card"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id={titleId} className="font-serif text-xl font-semibold text-navy-950">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            aria-label="Close"
            className="rounded-md p-1 text-muted transition-colors hover:text-navy-950 disabled:opacity-40"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="px-5 py-5">{children}</div>
      </div>
    </div>
  );
}

/** "Are you sure?" before a deletion (the previous admin's popup). */
export function ConfirmDialog({
  title,
  message,
  confirmLabel,
  busy,
  error,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: ReactNode;
  confirmLabel: string;
  busy: boolean;
  error?: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal title={title} onClose={onCancel} busy={busy}>
      <div className="text-sm leading-relaxed text-ink">{message}</div>
      <Notice error={error} />
      <div className="mt-4 flex justify-end gap-3">
        <Button variant="secondary" onClick={onCancel} disabled={busy}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={busy}>
          {busy ? "Deleting…" : confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}

/** The navy full-page frame of the sign-in, forgot- and reset-password
 * screens. */
export function AuthCard({
  subtitle,
  children,
}: {
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <main className="flex flex-1 items-center justify-center bg-navy-950 px-5 py-16">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-card">
        <div className="flex flex-col items-center text-center">
          <Image src="/logo.jpeg" alt={site.name} width={72} height={72} className="h-18 w-18 rounded" />
          <h1 className="mt-4 font-serif text-2xl font-semibold text-navy-950">Admin</h1>
          <p className="mt-1 text-sm text-muted">{subtitle}</p>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}

export const errorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Something went wrong.";

export function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
