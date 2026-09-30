# General Consulting Group — website

Redesign of [generalsconsultinggroups.com](https://generalsconsultinggroups.com) built with Next.js (App Router) and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/[lang]/` — public routes, once per language (`/en`, `/fr`, `/ar`, `/sw`, `/pt`): home, about, services (+ consulting, import-export, representation), partners, gallery, contact and the legal documents (`/[legal]`). Its layout is the root layout of the public site (`<html lang dir>`, header, footer).
- `proxy.ts` — sends unprefixed URLs (`/`, `/about`) to the visitor's language: their earlier choice (cookie), else their browser language, else English.
- `app/admin/` — password-protected Google Analytics dashboard (`/admin`, not indexed).
- `components/` — reusable UI (`ui/`), layout (header, footer, language switcher), page sections (`home/`, `services/`, `gallery/`, `contact/`), `analytics/` (GA4 tag + cookie banner) and `admin/` (dashboard and charts).
- `lib/` — site configuration and media lists (`site.ts`, `services.ts`, `projects.ts`, `partners.ts`, `gallery.ts`, `legal.ts`), `api.ts`, `analytics.ts`, `adminAuth.ts`, `fonts.ts`.
- `lib/i18n/` — languages (`config.ts`), one dictionary per language (`dictionaries/`), the legal documents per language (`legal/`), and helpers (`server.ts` for Server Components, `format.ts` / `rich.tsx` for placeholders).
- `public/` — logo, design reference, partner logos and gallery media.

## Backend

The Go API lives in `../backend` (contact form + statistics). Point the site at it:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Analytics

- **Tag**: Google Analytics 4, loaded only after the visitor accepts the cookie banner (nothing is sent to Google before). "Cookie settings" in the footer reopens the banner. The tag is silent on `/admin` and on localhost. Leave `NEXT_PUBLIC_GA_MEASUREMENT_ID` empty to turn off both tag and banner.
- **Homepage "Our Reach"**: all-time visitors, countries and last-30-day visitors, read from `/api/site-stats` and regenerated hourly. Hidden until analytics is configured and has data.
- **`/admin`**: live visitors, 7/28/90-day trends, top pages, countries, sources and devices. Password = `ADMIN_PASSWORD` in the backend.

Setup steps for the Google Analytics property: see `../backend/README.md`.
If a Content-Security-Policy is added later, allow `https://www.googletagmanager.com` (script) and `https://*.google-analytics.com` (connect).

## Translations

All visible text lives in `lib/i18n/dictionaries/{en,fr,ar,sw,pt}.ts`. English (`en.ts`) is the source and defines the shape: add or rename a string there and TypeScript flags every language that is missing it. Keep `{placeholders}` as they are.

- **Arabic** pages are right-to-left (`dir="rtl"`) and use Noto Sans / Noto Naskh Arabic. Use logical Tailwind classes (`ps-`, `ms-`, `start-`, `end-`, `border-s`, `text-start`) rather than `left`/`right` so layouts mirror correctly.
- **Legal documents** are in `lib/i18n/legal/`. Translated versions show a note that the English text prevails; have them checked by a lawyer or sworn translator before relying on them.
- The `/admin` dashboard is not translated (English only).

## Pending work

- **Footer social links**: fill in the real URLs in `lib/site.ts`.
