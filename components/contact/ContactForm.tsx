"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { services } from "@/lib/services";
import { Button } from "@/components/ui/Button";
import { API_URL } from "@/lib/api";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { rich } from "@/lib/i18n/rich";
import { useLocale } from "@/components/layout/LocaleProvider";

export type ContactFormValues = {
  name: string;
  email: string;
  /** Optional service of interest (a service slug, "partnership" or
   * "other"); sent to the backend as a subject prefix. */
  service: string;
  subject: string;
  message: string;
};

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "error"; message: string }
  | { state: "success"; message: string };

type Copy = Dictionary["contact"]["form"];

const emptyValues: ContactFormValues = {
  name: "",
  email: "",
  service: "",
  subject: "",
  message: "",
};

function validate(values: ContactFormValues, errors: Copy["errors"]): string | null {
  if (!values.name.trim()) return errors.name;
  if (!values.email.trim()) return errors.email;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) return errors.emailInvalid;
  if (!values.subject.trim()) return errors.subject;
  if (!values.message.trim()) return errors.message;
  return null;
}

/** English label of a service-of-interest choice, for the email subject tag:
 * the team reads "[Consulting]" whatever language the visitor used. */
function serviceTag(value: string): string {
  if (value === "partnership") return "Partnership";
  if (value === "other") return "Other";
  return services.find((service) => service.slug === value)?.name ?? value;
}

/** Posts the form to the Go/Mailjet backend. The backend answers in English,
 * so failures are mapped to translated messages by status code. */
async function submitContact(
  values: ContactFormValues,
  honeypot: string,
  lang: Locale,
  errors: Copy["errors"],
): Promise<void> {
  // "[Consulting · FR]": the service, plus the visitor's language when it
  // isn't English, so the team knows which language to reply in.
  const tags = [values.service && serviceTag(values.service), lang !== "en" && lang.toUpperCase()]
    .filter(Boolean)
    .join(" · ");
  const subject = values.subject.trim();

  let response: Response;
  try {
    response = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: tags ? `[${tags}] ${subject}` : subject,
        message: values.message.trim(),
        company: honeypot,
      }),
    });
  } catch {
    throw new Error(errors.failed);
  }

  if (response.ok) return;
  if (response.status === 429) throw new Error(errors.tooMany);
  if (response.status === 503) throw new Error(errors.unavailable);
  if (response.status === 400) {
    // Field problems the client check missed (e.g. a too-long message): the
    // backend's own wording is the most precise we have.
    const payload: { error?: string } = await response.json().catch(() => ({}));
    throw new Error(payload.error ?? errors.failed);
  }
  throw new Error(errors.failed);
}

const fieldClass =
  "w-full rounded-md border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/70 outline-none transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30";

export function ContactForm() {
  const { lang, dict, href } = useLocale();
  const copy = dict.contact.form;
  const [values, setValues] = useState<ContactFormValues>(emptyValues);
  // Hidden from real users; only bots fill it in. The backend drops those.
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const update =
    (field: keyof ContactFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setValues((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = validate(values, copy.errors);
    if (error) {
      setStatus({ state: "error", message: error });
      return;
    }
    setStatus({ state: "submitting" });
    try {
      await submitContact(values, honeypot, lang, copy.errors);
      setValues(emptyValues);
      setStatus({ state: "success", message: copy.success });
    } catch (error) {
      setStatus({
        state: "error",
        message: error instanceof Error ? error.message : copy.errors.failed,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div aria-live="polite" className="min-h-6 text-center text-sm font-medium">
        {status.state === "error" && <p className="text-red-600">{status.message}</p>}
        {status.state === "success" && <p className="text-green-600">{status.message}</p>}
      </div>

      {/* Honeypot: hidden from people and screen readers, bait for bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="sr-only">
            {copy.name}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={copy.name}
            value={values.name}
            onChange={update("name")}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="sr-only">
            {copy.email}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={copy.email}
            value={values.email}
            onChange={update("email")}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-service" className="sr-only">
          {copy.service}
        </label>
        <select
          id="contact-service"
          name="service"
          value={values.service}
          onChange={update("service")}
          className={`${fieldClass} ${values.service ? "" : "text-muted/70"}`}
        >
          <option value="">{copy.service}</option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug} className="text-ink">
              {dict.services.items[service.slug].name}
            </option>
          ))}
          <option value="partnership" className="text-ink">
            {copy.partnership}
          </option>
          <option value="other" className="text-ink">
            {copy.other}
          </option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-subject" className="sr-only">
          {copy.subject}
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder={copy.subject}
          value={values.subject}
          onChange={update("subject")}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="sr-only">
          {copy.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder={copy.message}
          value={values.message}
          onChange={update("message")}
          className={`${fieldClass} resize-y`}
        />
      </div>

      <p className="text-xs leading-relaxed text-muted">
        {rich(copy.consent, {
          link: (
            <Link href={href("/privacy-policy")} className="underline hover:text-gold-600">
              {copy.privacyPolicy}
            </Link>
          ),
        })}
      </p>

      <div>
        <Button type="submit" disabled={status.state === "submitting"} className="w-full sm:w-auto">
          {status.state === "submitting" ? copy.sending : copy.send}
        </Button>
      </div>
    </form>
  );
}
