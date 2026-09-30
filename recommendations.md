# Recommendations — General Consulting Group website

This file lists what has been done and what I still need from you.
**Part A** is the list of things to send me or decide. **Part B** is what is
already built. **Part C** is the full backlog, with each item's status.

**Status legend**

- ✅ **Done** — built and in the site.
- 🟡 **Done, please check** — built with draft content that you need to confirm or correct.
- 📝 **I need content from you** — text, photos, numbers or accounts.
- ⚠️ **Needs a decision or an external account** — cost, service or policy choice.
- ❌ **I can't do this** — you have to do it yourself.

---

## A. What I need from you (checklist)

Send these whenever you have them. Each one unblocks the item in brackets.

### Please check what I wrote

- [ ] **Founder's title.** I used **"Founder & CEO"** for Njambe Patrick Junior. Is that right, or is it Managing Director, Chairman, or something else? _(1.1)_
- [ ] **Founder bio.** The About page has a short two-sentence bio that I wrote from what the site already says. Please send 3–5 lines in his own words: background, experience, education, languages, why he founded GCG. A short quote from him would also help. _(1.1)_
- [ ] **Impact figures.** Because GCG is a new company, I removed the figures from the design mock (+20 years, +15 countries, +100 partners). They now show numbers that are true today: **2** countries (Rwanda, Cameroon), **3** continents in the supplier network, **7** services & ventures, **100%** committed to sustainability. Confirm they are correct. _(1.5)_
- [ ] **Step for the Future case study.** On the home page (Our Work) I present stepfuture.org as a project delivered by SoftsCreatix, with a screenshot of the site and figures that are public on it (109+ children, 40 families, visitors from 23 countries). Please confirm (a) the foundation is happy to be named as a reference, and (b) the "What we did" list matches what was actually delivered. _(1.2)_
- [ ] **SoftsCreatix case study.** It is presented as a venture GCG launched. I used only facts from softscreatix.com: 5+ projects (including this site, stepfuture.org, Home Abomo Law Firm and Models & Hostesses), active in 3 countries, and its tech stack. I left out "10+ years" and "90% satisfaction" because they don't match a new company. When softscreatix.com is updated, tell me and I'll refresh the screenshot (`public/projects/softscreatix.png`) and the text. _(1.2)_
- [ ] **Privacy policy.** I drafted `/privacy-policy`. Points to confirm: that Mailjet is the email provider, the 24-month retention period for enquiries, and the new Google Analytics section (consent banner, 14-month retention, data processed by Google). **Have a lawyer review it before launch.** _(4.1)_
- [ ] **Domain — please confirm urgently.** I set the public URL to `https://generalconsultinggroups.com`, which I had taken from the old contact email. That email has expired, so the domain may have expired too. This URL is used in the sitemap, share cards, language links and search data. Confirm you still own it, or give me the right domain (change `url` in `lib/site.ts`). _(5.1–5.3)_

### Content to send

- [ ] **More case studies (2–5).** Other projects GCG, SoftsCreatix, Penja Peppers or the import-export team have delivered. For each one: client (or an anonymous description such as "a Douala food distributor"), the problem, what you did, the result (numbers if possible), and a photo or screenshot. Even small projects count for a new company. _(1.2)_
- [ ] **Testimonial from Step for the Future.** One or two sentences from the foundation's leadership, with their name and role. This is the fastest way to add credibility. _(1.3)_
- [ ] **Other team members.** Photo, name, role and 2 lines for any partner, manager or key consultant you want to show. _(1.1)_
- [ ] **Company legal details.** RDB registration number, TIN, and year founded (Rwanda). The Cameroon entity's RCCM number if there is one. _(1.4)_
- [ ] **Cameroon address**, if you have an office there. _(2.6)_
- [ ] **Partner logos**, plus permission to use them. The partner strip only has 2 logos today. Suppliers, banks, chambers of commerce and clients also count. _(1.6)_
- [ ] **Memberships and certifications** (chamber of commerce, RDB, professional bodies, donor pre-qualification). _(1.7)_
- [ ] **Social media URLs** (LinkedIn, Facebook, X, YouTube). Icons that were still `#` are now hidden, so no dead links show. Once you send the URLs they appear automatically. _(6.1)_
- [ ] **Real photos for the service cards.** The consulting, import-export, representation and MyStay cards use stock photos. _(6.4)_
- [ ] **Your sectors of focus** (e.g. agribusiness, construction, public sector, NGOs), for sector pages. _(2.1)_

### Decisions to take

- [ ] **WhatsApp button** — which number? (+250 796 129 284 or +250 728 231 090) _(3.3)_
- [ ] **Booking link** — should I add Calendly or Cal.com (free tier)? _(3.4)_
- [ ] **Where the contact API will be hosted** (e.g. `api.generalconsultinggroups.com` over HTTPS). **This is required before launch.** _(4.3)_
- [ ] **Spam protection** — Cloudflare Turnstile (free) or Google reCAPTCHA? _(4.2)_
- [x] **Analytics** — GA4 chosen, same setup as stepfuture.org. Built, with a cookie banner. **To do:** create the GA4 property and give the dashboard read access — steps in `../backend/README.md`. _(5.5)_
- [ ] **Admin password** — choose the password for the `/admin` statistics page (`ADMIN_PASSWORD` on the server). _(5.5)_
- [ ] **Image compression** — may I compress the original photos in `public/`? They are not in git yet, so the originals would be lost. Keep a backup copy first. _(5.4)_
- [x] **Translations** — done in all five languages of the switcher. **Please have a native speaker proofread** each language, and a lawyer check the translated legal documents. _(6.2)_

---

## B. Done in this round

| What                                                                                                                                                                                                           | Where                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **Leadership section** with the founder's photo, name, title and bio                                                                                                                                           | About page                                              |
| **"Our approach"** — the 5 steps of an engagement                                                                                                                                                              | About page                                              |
| **Case studies: Step for the Future Foundation and SoftsCreatix** (context, work, results, link, screenshot)                                                                                                   | Home page → "Our Work"                                  |
| **Impact figures corrected for a new company**, with a count-up animation                                                                                                                                      | Home page                                               |
| **Privacy policy** page, linked in the footer and under the contact form                                                                                                                                       | `/privacy-policy`                                       |
| **"Service of interest" dropdown** on the contact form. It is added to the email subject as `[Consulting] …`, so no backend change was needed                                                                  | Contact page                                            |
| **Favicon & Apple touch icon** made from the GCG logo (navy background, so it is visible in browser tabs)                                                                                                      | `app/icon.png`, `app/apple-icon.png`                    |
| **Social share image** for WhatsApp, LinkedIn, Facebook and X, plus Open Graph tags on every page                                                                                                              | `app/opengraph-image.jpg`                               |
| **`sitemap.xml` and `robots.txt`**                                                                                                                                                                             | `app/sitemap.ts`, `app/robots.ts`                       |
| **Organization structured data (JSON-LD)** — name, logo, address, founder, contact                                                                                                                             | `app/layout.tsx`                                        |
| **Canonical URLs** on every page                                                                                                                                                                               | `app/layout.tsx`                                        |
| **Security headers** — HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy; the `X-Powered-By` header is removed                                                                               | `next.config.ts`                                        |
| **Placeholder social icons hidden** until real URLs are provided                                                                                                                                               | Footer                                                  |
| **Smooth scrolling** — eased scrolling for mouse wheel and trackpad (Lenis). Phones and tablets keep their native momentum scroll. Anchor links and the new **back-to-top button** animate on all screen sizes | `components/layout/SmoothScroll.tsx`                    |
| **Animations** — hero text fades in and the hero globe zooms slowly on load; page titles fade in; sections, cards and stats fade up as you scroll; the header gets a shadow once you scroll                    | `app/globals.css`, `components/layout/ScrollReveal.tsx` |
| **Accessibility** — "Skip to content" link, visible keyboard focus rings, and all motion switched off for visitors who turn on "reduce motion" in their system settings                                        | Site-wide                                               |
| **Google Analytics 4** — same analytics as stepfuture.org, loaded only after the visitor accepts the new **cookie banner**; "Cookie settings" link in the footer                                               | `components/analytics/`                                 |
| **"Our Reach" figures** on the home page — real visitors and countries from Google Analytics, refreshed hourly; hidden until there is data                                                                     | Home page                                               |
| **Statistics dashboard** at `/admin` (password-protected, not indexed): live visitors, 7/28/90-day trends, top pages, countries, traffic sources, devices                                                      | `/admin`                                                |
| **Backend** moved into this project as `backend/` — contact form + statistics API. It now starts without Mailjet keys (the form answers "not available" until they are set)                                    | `../backend`                                            |
| **Contact email** changed everywhere to generalconsultinggroupltd@gmail.com (contact page, privacy policy, search data) | `lib/site.ts`, legal texts |
| **Translations**: the whole site in English, French, Arabic (right-to-left), Swahili and Portuguese, with a URL per language (`/fr/about`…), automatic language detection, and language links for Google | Site-wide |
| **Sharper project screenshots** under "Our Work": shown whole in a browser frame at their real proportions, served at higher quality | Home page |

---

## C. Full backlog

### 1. Credibility

| #   | Recommendation                           | Status                                                                                                             |
| --- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 1.1 | Leadership / team section                | 🟡 Founder done. Confirm title and bio; send other team members                                                    |
| 1.2 | Case studies                             | 🟡 Step for the Future and SoftsCreatix done. Send more (Abomo Law Firm, Models & Hostesses, import-export deals…) |
| 1.3 | Client testimonials                      | 📝 Start with a quote from Step for the Future                                                                     |
| 1.4 | Legal & registration facts in the footer | 📝 Need RDB no., TIN, year founded                                                                                 |
| 1.5 | Honest impact figures                    | 🟡 Replaced. Please confirm                                                                                        |
| 1.6 | More partner logos (5+)                  | 📝 Need logos + permission                                                                                         |
| 1.7 | Certifications / memberships             | 📝 Tell me which you hold                                                                                          |

### 2. Content and structure

| #   | Recommendation                                      | Status                                                             |
| --- | --------------------------------------------------- | ------------------------------------------------------------------ |
| 2.1 | Sector pages                                        | 📝 Need your sectors                                               |
| 2.2 | "Our approach"                                      | 🟡 Done on the About page; correct the steps if needed             |
| 2.3 | Insights / blog                                     | ⚠️ Only if someone can write monthly                               |
| 2.4 | Downloadable company profile (PDF)                  | ✅ I can build it — best done after 1.1, 1.2 and 1.4 are filled in |
| 2.5 | Careers page ("send us your CV")                    | ✅ I can build it — tell me which email address should receive CVs |
| 2.6 | Offices section with map                            | 📝 Need the Cameroon address                                       |
| 2.7 | Rewrite service summaries as client outcomes        | ✅ I can draft them for you to approve                             |
| 2.8 | **New:** a "Projects" page listing all case studies | ✅ I can build it once there is a third project                    |

### 3. Lead capture

| #   | Recommendation                    | Status                             |
| --- | --------------------------------- | ---------------------------------- |
| 3.1 | Auto-reply email to the visitor   | ✅ I can build it (backend change) |
| 3.2 | "Service of interest" dropdown    | ✅ Done                            |
| 3.3 | WhatsApp button                   | ⚠️ Choose the number               |
| 3.4 | Booking link (Calendly / Cal.com) | ⚠️ Needs an account                |
| 3.5 | Store submissions in a database   | ⚠️ Needs a database                |
| 3.6 | Newsletter signup                 | ⚠️ Only with 2.3                   |

### 4. Trust, security and compliance

| #   | Recommendation                              | Status                                                                                                              |
| --- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 4.1 | Privacy policy                              | 🟡 Drafted — needs a lawyer's review                                                                                |
| 4.2 | Turnstile / reCAPTCHA on the form           | ⚠️ Needs a key                                                                                                      |
| 4.3 | Put the API behind HTTPS on a proper domain | ⚠️ **Blocking for launch**                                                                                          |
| 4.4 | Take the old PHP admin login offline        | ⚠️ Decide what happens to the old site                                                                              |
| 4.5 | Security headers                            | ✅ Done. A Content-Security-Policy will be added once the API domain (4.3) is known; it must allow Google Analytics |

### 5. Findability (SEO) and performance

| #   | Recommendation                                                 | Status                                                                                                                           |
| --- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 5.1 | Social share images                                            | ✅ Done                                                                                                                          |
| 5.2 | `sitemap.xml` + `robots.txt`                                   | ✅ Done                                                                                                                          |
| 5.3 | Organization JSON-LD                                           | ✅ Done                                                                                                                          |
| 5.4 | Compress source images (~18 MB of photos in `public/services`) | ⚠️ Waiting for your OK — originals are not in git                                                                                |
| 5.5 | Search Console + analytics                                     | 🟡 Analytics built (GA4 + banner + `/admin` dashboard); create the GA4 property. Search Console still needs verifying the domain |
| 5.6 | Google Business Profile                                        | ❌ You must claim it yourself (postal/phone verification)                                                                        |

### 6. Polish and accessibility

| #   | Recommendation             | Status                                                                                  |
| --- | -------------------------- | --------------------------------------------------------------------------------------- |
| 6.1 | Real social links          | 🟡 Dead icons hidden; send URLs                                                         |
| 6.2 | Translations               | 🟡 Done: English, French, Arabic (right-to-left), Swahili, Portuguese. Needs proofreading by native speakers |
| 6.3 | Accessibility pass         | 🟡 Skip link, focus rings and reduced motion done; a full contrast audit is still to do |
| 6.4 | Replace stock photos       | 📝 Need real photos                                                                     |
| 6.5 | Favicon from the logo      | ✅ Done                                                                                 |
| 6.6 | Smooth scroll + animations | ✅ Done                                                                                 |

---

## Suggested next steps

1. **Before launch:** 4.3 (HTTPS API), confirm the domain, lawyer review of 4.1, 5.4, create the GA4 property and set the admin password (5.5).
2. **Quick credibility wins:** a testimonial from Step for the Future (1.3), registration details (1.4), confirm the founder details (1.1).
3. **Next build:** auto-reply (3.1) and the company profile PDF (2.4). Proofread the translations (6.2).
