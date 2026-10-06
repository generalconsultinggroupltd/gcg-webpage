"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { adminFetch } from "@/lib/adminAuth";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import {
  DevicesIcon,
  ExternalLinkIcon,
  GlobeIcon,
  PagesIcon,
  RefreshIcon,
  SignalIcon,
  TableIcon,
  TrendUpIcon,
} from "@/components/ui/Icons";
import {
  BarList,
  DailyChart,
  DailyTable,
  MinuteColumns,
  StatTile,
  formatCompact,
  formatDuration,
  formatNumber,
  useSecondsSince,
} from "./AnalyticsCharts";

// Shapes returned by /api/admin/analytics/*; see backend/analytics.

type AnalyticsStatus = {
  configured: boolean;
  measurement_id: string;
  property_id?: string;
  /** Host the figures are restricted to; empty counts every host. */
  hostname?: string;
};

type Bucket = { label: string; value: number };

type Realtime = {
  active_users: number;
  active_users_5min: number;
  /** 30 slots, oldest first (minutes_ago 29 → 0). */
  per_minute: { minutes_ago: number; users: number }[];
  /** Realtime knows pages by title only. */
  pages: Bucket[];
  countries: Bucket[];
  devices: Bucket[];
  fetched_at: string;
  next_refresh_after: number;
};

type Totals = {
  users: number;
  new_users: number;
  sessions: number;
  page_views: number;
  avg_session_duration: number;
  engagement_rate: number;
  bounce_rate: number;
};

type Overview = {
  days: Period;
  start_date: string;
  end_date: string;
  totals: Totals;
  /** Same figures for the period immediately before, for the trend. */
  previous: Totals;
  daily: { date: string; users: number; sessions: number; page_views: number }[];
  pages: { path: string; title: string; views: number; users: number }[];
  countries: Bucket[];
  devices: Bucket[];
  channels: Bucket[];
  fetched_at: string;
};

type Period = 7 | 28 | 90;
const periods: Period[] = [7, 28, 90];

// GA reports these in lower case / its own vocabulary.
const deviceLabels: Record<string, string> = {
  mobile: "Mobile",
  desktop: "Desktop",
  tablet: "Tablet",
  "smart tv": "Smart TV",
};
const channelLabels: Record<string, string> = {
  "Organic Search": "Search engines",
  "Organic Social": "Social networks",
  "Organic Video": "Video (YouTube…)",
  Referral: "Other websites",
  Unassigned: "Unattributed",
};

let regionNames: Intl.DisplayNames | null = null;
try {
  regionNames = new Intl.DisplayNames(["en"], { type: "region" });
} catch {
  regionNames = null;
}
function countryName(code: string) {
  try {
    return regionNames?.of(code) ?? code;
  } catch {
    return code;
  }
}

const translate = (items: Bucket[], dict: Record<string, string>) =>
  items.map((b) => ({ label: dict[b.label] ?? b.label, value: b.value }));
const countries = (items: Bucket[]) =>
  items.map((b) => ({ label: countryName(b.label), value: b.value }));

const errorMessage = (err: unknown) => (err instanceof Error ? err.message : "Error.");

/**
 * Visitor statistics from Google Analytics: a live "right now" panel that
 * polls while the tab is visible, and the last 7 / 28 / 90 days. Everything
 * comes through the Go API, which holds the Google credentials and caches
 * the answers — the browser never talks to Google directly.
 */
export function AnalyticsDashboard() {
  const [status, setStatus] = useState<AnalyticsStatus | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);

  useEffect(() => {
    adminFetch<AnalyticsStatus>("/api/admin/analytics/status")
      .then(setStatus)
      .catch((err) => setStatusError(errorMessage(err)));
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-semibold text-navy-950">Statistics</h2>
          <p className="mt-1 text-sm text-muted">
            Website traffic, from Google Analytics
            {status?.hostname ? (
              <>
                {" "}
                — visits to <span className="font-medium text-navy-950">{status.hostname}</span>{" "}
                only
              </>
            ) : (
              status?.configured && " — every host, local tests included"
            )}
            .
          </p>
        </div>
        <a
          href="https://analytics.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-xs font-semibold text-navy-950 shadow-sm transition hover:border-gold-500"
        >
          Open Google Analytics
          <ExternalLinkIcon className="h-3.5 w-3.5" />
        </a>
      </div>

      {statusError ? (
        <Notice className="mt-6">{statusError}</Notice>
      ) : status === null ? (
        <p className="mt-6 text-sm text-muted">Loading…</p>
      ) : !status.configured ? (
        <SetupInstructions status={status} />
      ) : (
        <>
          <RealtimePanel />
          <OverviewPanel />
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Right now
// ---------------------------------------------------------------------------

function RealtimePanel() {
  const [data, setData] = useState<Realtime | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seconds = useSecondsSince(data?.fetched_at);

  const load = useCallback(async () => {
    setRefreshing(true);
    try {
      const rt = await adminFetch<Realtime>("/api/admin/analytics/realtime");
      setData(rt);
      setError(null);
      return rt.next_refresh_after;
    } catch (err) {
      setError(errorMessage(err));
      return 30;
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Poll while the tab is visible; the API's answer says how soon a new
  // one could differ (it is cached upstream), so polling faster is useless.
  useEffect(() => {
    let cancelled = false;
    const schedule = async () => {
      const wait = await load();
      if (cancelled || document.hidden) return;
      timer.current = setTimeout(schedule, Math.max(5, wait) * 1000);
    };
    const onVisibility = () => {
      if (document.hidden) {
        if (timer.current) clearTimeout(timer.current);
        timer.current = null;
      } else if (!timer.current) {
        schedule();
      }
    };
    schedule();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelled = true;
      if (timer.current) clearTimeout(timer.current);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [load]);

  return (
    <section className="mt-6 rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-muted">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          Live
        </h2>
        <p className="flex items-center gap-2 text-xs text-muted">
          {data && (seconds < 2 ? "just now" : `${seconds}s ago`)}
          <button
            type="button"
            onClick={load}
            disabled={refreshing}
            className="rounded p-1 text-muted transition hover:text-navy-950 disabled:opacity-50"
            aria-label="Refresh"
          >
            <RefreshIcon
              className={`h-3.5 w-3.5 ${refreshing ? "animate-spin motion-reduce:animate-none" : ""}`}
            />
          </button>
        </p>
      </div>

      {error && <Notice className="mt-4">{error}</Notice>}

      {data === null && !error ? (
        <p className="mt-4 text-sm text-muted">Loading…</p>
      ) : data ? (
        <div
          className={`mt-4 grid gap-6 transition-opacity lg:grid-cols-5 ${
            refreshing ? "opacity-70" : ""
          }`}
        >
          <div className="lg:col-span-2">
            <p className="font-serif text-5xl font-semibold leading-none text-navy-950">
              {formatNumber(data.active_users)}
            </p>
            <p className="mt-2 text-sm text-muted">
              {data.active_users === 1 ? "active visitor" : "active visitors"} in the last 30
              minutes
              {data.active_users_5min > 0 && (
                <>
                  , including{" "}
                  <span className="font-semibold text-navy-950">
                    {formatNumber(data.active_users_5min)}
                  </span>{" "}
                  in the last 5
                </>
              )}
            </p>
            <div className="mt-5">
              <MinuteColumns points={data.per_minute} />
            </div>
          </div>

          <Breakdown
            className="lg:col-span-1"
            icon={PagesIcon}
            title="Pages viewed"
            items={data.pages.map((b) => ({ ...b, label: cleanTitle(b.label) }))}
            empty="Nobody on the site right now."
          />
          <Breakdown
            className="lg:col-span-1"
            icon={GlobeIcon}
            title="Countries"
            items={countries(data.countries)}
            empty="—"
          />
          <Breakdown
            className="lg:col-span-1"
            icon={DevicesIcon}
            title="Devices"
            items={translate(data.devices, deviceLabels)}
            empty="—"
          />
        </div>
      ) : null}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Last N days
// ---------------------------------------------------------------------------

function OverviewPanel() {
  const [days, setDays] = useState<Period>(28);
  const [data, setData] = useState<Overview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showTable, setShowTable] = useState(false);
  // A period is loading until the data on screen is for that period.
  const loading = !error && (data === null || data.days !== days);

  useEffect(() => {
    let cancelled = false;
    adminFetch<Overview>(`/api/admin/analytics/overview?days=${days}`)
      .then((ov) => {
        if (cancelled) return;
        setData(ov);
        setError(null);
      })
      .catch((err) => {
        if (!cancelled) setError(errorMessage(err));
      });
    return () => {
      cancelled = true;
    };
  }, [days]);

  const rangeLabel = useMemo(() => {
    if (!data) return "";
    const fmt = (iso: string) =>
      new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long" });
    return `${fmt(data.start_date)} – ${fmt(data.end_date)}`;
  }, [data]);

  const t = data?.totals;
  const p = data?.previous;

  return (
    <section className="mt-8">
      {/* Filter row: scopes every figure and chart below it. */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-muted">
            <TrendUpIcon className="h-3.5 w-3.5" />
            Over the period
          </h2>
          <div
            role="radiogroup"
            aria-label="Period"
            className="inline-flex rounded-md border border-line bg-white p-0.5 shadow-sm"
          >
            {periods.map((period) => (
              <button
                key={period}
                type="button"
                role="radio"
                aria-checked={days === period}
                onClick={() => setDays(period)}
                className={`rounded px-3 py-1.5 text-xs font-semibold transition ${
                  days === period ? "bg-navy-950 text-white" : "text-muted hover:text-navy-950"
                }`}
              >
                {period} days
              </button>
            ))}
          </div>
        </div>
        {data && <p className="text-xs text-muted">{rangeLabel}</p>}
      </div>

      {error && <Notice className="mt-4">{error}</Notice>}

      {data === null && !error ? (
        <p className="mt-4 text-sm text-muted">Loading…</p>
      ) : data && t && p ? (
        // While a new period loads the previous render stays, dimmed —
        // no skeleton, no layout jump.
        <div className={`transition-opacity ${loading ? "opacity-60" : ""}`}>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <StatTile label="Visitors" value={formatCompact(t.users)} current={t.users} previous={p.users} />
            <StatTile
              label="New visitors"
              value={formatCompact(t.new_users)}
              current={t.new_users}
              previous={p.new_users}
            />
            <StatTile
              label="Sessions"
              value={formatCompact(t.sessions)}
              current={t.sessions}
              previous={p.sessions}
            />
            <StatTile
              label="Page views"
              value={formatCompact(t.page_views)}
              current={t.page_views}
              previous={p.page_views}
            />
            <StatTile
              label="Average time"
              value={formatDuration(t.avg_session_duration)}
              current={t.avg_session_duration}
              previous={p.avg_session_duration}
              hint="per session"
            />
            <StatTile
              label="Engagement"
              value={`${t.engagement_rate.toFixed(1)}%`}
              current={t.engagement_rate}
              previous={p.engagement_rate}
              hint="of sessions"
            />
          </div>

          <div className="mt-6 rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-navy-950">Visitors per day</h3>
                <p className="text-xs text-muted">Hover the chart for a day&apos;s detail.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowTable((v) => !v)}
                aria-pressed={showTable}
                className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition ${
                  showTable
                    ? "border-navy-700 bg-navy-100 text-navy-950"
                    : "border-line text-muted hover:text-navy-950"
                }`}
              >
                <TableIcon className="h-3.5 w-3.5" />
                Table
              </button>
            </div>
            <div className="mt-4">
              {showTable ? <DailyTable points={data.daily} /> : <DailyChart points={data.daily} />}
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-5">
            <div className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6 lg:col-span-3">
              <h3 className="font-semibold text-navy-950">Most viewed pages</h3>
              {data.pages.length === 0 ? (
                <p className="mt-3 text-sm text-muted">No data for this period.</p>
              ) : (
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-left text-[11px] font-semibold uppercase tracking-wide text-muted">
                      <tr>
                        <th className="py-2 pr-3">Page</th>
                        <th className="py-2 pr-3 text-right">Views</th>
                        <th className="py-2 text-right">Visitors</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line" style={{ fontVariantNumeric: "tabular-nums" }}>
                      {data.pages.map((page) => (
                        <tr key={page.path}>
                          <td className="max-w-0 py-2 pr-3">
                            <p className="truncate text-navy-950" title={page.title}>
                              {cleanTitle(page.title) || page.path}
                            </p>
                            <p className="truncate text-xs text-muted" title={page.path}>
                              {page.path}
                            </p>
                          </td>
                          <td className="py-2 pr-3 text-right font-semibold text-navy-950">
                            {formatNumber(page.views)}
                          </td>
                          <td className="py-2 text-right text-muted">{formatNumber(page.users)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6 lg:col-span-2">
              <Breakdown
                card
                icon={GlobeIcon}
                title="Countries"
                items={countries(data.countries)}
                empty="No data for this period."
              />
              <Breakdown
                card
                icon={SignalIcon}
                title="Traffic sources"
                items={translate(data.channels, channelLabels)}
                empty="No data for this period."
              />
              <Breakdown
                card
                icon={DevicesIcon}
                title="Devices"
                items={translate(data.devices, deviceLabels)}
                empty="No data for this period."
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

/** Page titles carry the site-wide suffix ("… | General Consulting Group")
 * or, on the home page, the tagline; neither says anything in a list of this
 * site's own pages. */
function cleanTitle(title: string) {
  return title.replace(/\s*[|—]\s*(General Consulting Group|Building Value).*$/i, "").trim();
}

// ---------------------------------------------------------------------------
// Pieces
// ---------------------------------------------------------------------------

function Breakdown({
  icon: Icon,
  title,
  items,
  empty,
  card,
  className = "",
}: {
  icon: typeof GlobeIcon;
  title: string;
  items: { label: string; value: number }[];
  empty: string;
  card?: boolean;
  className?: string;
}) {
  return (
    <div className={`${card ? "rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6" : ""} ${className}`}>
      <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted">
        <Icon className="h-3.5 w-3.5" />
        {title}
      </h3>
      <div className="mt-3">
        <BarList items={items} empty={empty} title={title} />
      </div>
    </div>
  );
}

function Notice({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div role="alert" className={`rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 ${className}`}>
      {children}
    </div>
  );
}

function SetupInstructions({ status }: { status: AnalyticsStatus }) {
  const measurementId = status.measurement_id || GA_MEASUREMENT_ID;
  const code = "rounded bg-cream px-1";
  return (
    <div className="mt-6 rounded-lg border border-line bg-white p-6 shadow-sm">
      <h2 className="font-semibold text-navy-950">Connect Google Analytics</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {measurementId ? (
          <>
            The Google Analytics tag (<code className={code}>{measurementId}</code>) is on the
            public site and collects visits from people who accept cookies.
          </>
        ) : (
          <>
            The Google Analytics tag is not configured yet: set{" "}
            <code className={code}>NEXT_PUBLIC_GA_MEASUREMENT_ID</code> in the website&apos;s
            environment and redeploy it.
          </>
        )}{" "}
        To show the figures here, the server needs read access to the property — a one-time setup
        by whoever manages the server:
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
        <li>
          In{" "}
          <a
            href="https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-navy-700 underline"
          >
            Google Cloud
          </a>
          , enable the &quot;Google Analytics Data API&quot; in a project.
        </li>
        <li>
          Create a <strong>service account</strong> (IAM &amp; Admin → Service Accounts) and
          download its key as JSON — or reuse the one the Step for the Future site already uses.
        </li>
        <li>
          In Google Analytics → Admin → Property access management, add that service account&apos;s
          email with the <strong>Viewer</strong> role.
        </li>
        <li>
          On the server, set <code className={code}>GA_PROPERTY_ID</code> (the numeric ID under
          Admin → Property details) and <code className={code}>GA_SERVICE_ACCOUNT_FILE</code> in the
          API&apos;s <code className={code}>.env</code>, then restart the API.
        </li>
      </ol>
      <p className="mt-4 text-xs text-muted">
        Details are in <code>backend/README.md</code>. Meanwhile, the statistics are available
        directly on{" "}
        <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer" className="underline">
          analytics.google.com
        </a>
        .
      </p>
    </div>
  );
}
