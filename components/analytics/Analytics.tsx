"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import {
  GA_MEASUREMENT_ID,
  LOCAL_HOSTS,
  OPEN_CONSENT_EVENT,
  readConsent,
  saveConsent,
  type ConsentChoice,
} from "@/lib/analytics";
import { CookieBanner } from "./CookieBanner";

/** Dispatched after a choice is saved, so every reader re-renders. */
const CONSENT_CHANGE_EVENT = "gcg:consent-change";

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  // Another tab made a choice.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Removes Google Analytics' own cookies (_ga, _ga_<id>) once consent is
 * withdrawn. GA sets them on the widest domain it can, so both the host and
 * its parent domains are tried. */
function clearAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((part) => part.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));
  const labels = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < labels.length - 1; i++) domains.push(`; domain=.${labels.slice(i).join(".")}`);
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}

/**
 * Google Analytics (GA4) with a consent banner, loaded once from the root
 * layout.
 *
 * Nothing is sent to Google before the visitor accepts: gtag.js itself is
 * only requested once consent is granted (the privacy policy promises no
 * analytics otherwise). The choice lives in localStorage for 12 months;
 * the footer's "Cookie settings" link reopens the banner.
 *
 * As on the foundation site, the tag stays silent on /admin (the dashboard
 * is for staff, whose visits must not appear in the figures it shows) and
 * on a developer's machine, via Google's documented opt-out flag. The inline
 * script sets that flag from the URL before the first `config` call, and the
 * effect keeps it current on client-side navigation. GA4's enhanced
 * measurement reports page views on route changes by itself.
 */
export function Analytics() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  // undefined on the server and during hydration: the choice lives in the
  // browser, so nothing is decided until then.
  const consent = useSyncExternalStore<ConsentChoice | null | undefined>(
    subscribe,
    readConsent,
    () => undefined,
  );
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    const isLocal = LOCAL_HOSTS.includes(window.location.hostname);
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_MEASUREMENT_ID}`] =
      isAdmin || isLocal || consent !== "granted";
  }, [isAdmin, consent]);

  if (!GA_MEASUREMENT_ID) return null;

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice);
    if (choice === "denied") clearAnalyticsCookies();
    setReopened(false);
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  };

  const showBanner = !isAdmin && (consent === null || reopened);

  return (
    <>
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window['ga-disable-${GA_MEASUREMENT_ID}'] =
                location.pathname.indexOf('/admin') === 0 ||
                ${JSON.stringify(LOCAL_HOSTS)}.indexOf(location.hostname) !== -1;
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'granted',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
              });
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}
      {showBanner && <CookieBanner current={consent ?? null} onChoose={choose} />}
    </>
  );
}
