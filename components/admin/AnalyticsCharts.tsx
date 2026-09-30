"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { ArrowDownRightIcon, ArrowUpRightIcon, MinusIcon } from "@/components/ui/Icons";

// Every chart on the statistics dashboard plots a single series, so one hue
// does all the work: the brand navy (navy-700), with navy-100 for tracks and
// a deeper step for the hovered mark. Gold is kept for the site's accents —
// on white it is too light to carry a data line.
const SERIES = "#1f3a66";
const SERIES_HOVER = "#16294a";
const SERIES_TRACK = "#dfe6f0";
const GRID = "#e3e8ef";
const INK_MUTED = "#8a93a3";
const LOCALE = "en-GB";

const numberFormat = new Intl.NumberFormat(LOCALE);
export const formatNumber = (n: number) => numberFormat.format(n);

/** Compact figure for stat tiles: 1,284 · 12.9k · 4.2M. */
export function formatCompact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${(n / 1_000).toFixed(1)}k`;
  return formatNumber(n);
}

export function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s.toString().padStart(2, "0")}s` : `${s}s`;
}

/** Width of a block element, kept current on resize, so SVG charts render
 * at true pixel size instead of stretching a fixed viewBox. */
function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.clientWidth);
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
}

/** Clean axis ticks: 0 … a round maximum in 4 steps. */
function niceTicks(max: number, count = 4): number[] {
  if (max <= 0) return [0, 1];
  const rough = max / count;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const residual = rough / magnitude;
  const step =
    (residual >= 5 ? 10 : residual >= 2 ? 5 : residual >= 1 ? 2 : 1) * magnitude;
  const ticks: number[] = [];
  for (let v = 0; v <= max + step - 1e-9; v += step) ticks.push(Math.round(v * 1e6) / 1e6);
  return ticks;
}

// ---------------------------------------------------------------------------
// Stat tile
// ---------------------------------------------------------------------------

/** Value + delta vs the previous period. `upIsGood` decides which direction
 * gets the "good" colour; the arrow glyph carries the direction on its own,
 * so the colour is never the only signal. */
export function StatTile({
  label,
  value,
  previous,
  current,
  upIsGood = true,
  hint,
}: {
  label: string;
  value: string;
  current: number;
  previous: number;
  upIsGood?: boolean;
  hint?: string;
}) {
  let delta: ReactNode = null;
  if (previous > 0 || current > 0) {
    const pct = previous > 0 ? ((current - previous) / previous) * 100 : null;
    const direction = current === previous ? 0 : current > previous ? 1 : -1;
    const good = direction === 0 ? null : (direction > 0) === upIsGood;
    const tone =
      good === null ? "text-muted" : good ? "text-emerald-700" : "text-red-600";
    const Icon =
      direction === 0 ? MinusIcon : direction > 0 ? ArrowUpRightIcon : ArrowDownRightIcon;
    delta = (
      <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${tone}`}>
        <Icon className="h-3.5 w-3.5" />
        {pct === null
          ? "new"
          : `${pct > 0 ? "+" : ""}${pct.toFixed(Math.abs(pct) < 10 ? 1 : 0)}%`}
      </span>
    );
  }
  return (
    <div className="rounded-xl border border-line bg-white p-4 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-navy-950">{value}</p>
      <div className="mt-1 flex items-center gap-2 text-xs text-muted">
        {delta}
        {hint && <span>{hint}</span>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Realtime per-minute columns
// ---------------------------------------------------------------------------

export function MinuteColumns({
  points,
}: {
  points: { minutes_ago: number; users: number }[];
}) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const height = 72;
  const max = Math.max(1, ...points.map((p) => p.users));
  const gap = 2;
  const slot = width > 0 ? width / points.length : 0;
  const barWidth = Math.min(24, Math.max(2, slot - gap));
  const hovered = hover === null ? null : points[hover];

  return (
    <div ref={ref} className="relative w-full">
      {width > 0 && (
        <svg
          width={width}
          height={height}
          role="img"
          aria-label="Active users per minute over the last 30 minutes"
          onPointerLeave={() => setHover(null)}
        >
          <line x1={0} x2={width} y1={height - 0.5} y2={height - 0.5} stroke={GRID} />
          {points.map((p, i) => {
            const h = Math.max(p.users > 0 ? 3 : 0, ((height - 6) * p.users) / max);
            const x = i * slot + (slot - barWidth) / 2;
            const y = height - 1 - h;
            const r = Math.min(4, barWidth / 2, h);
            return (
              <g key={p.minutes_ago}>
                {/* The hit target is the whole slot, never just the bar. */}
                <rect
                  x={i * slot}
                  y={0}
                  width={slot}
                  height={height}
                  fill="transparent"
                  onPointerEnter={() => setHover(i)}
                />
                {h > 0 && (
                  <path
                    d={`M${x},${y + h} V${y + r} a${r},${r} 0 0 1 ${r},-${r} h${barWidth - 2 * r} a${r},${r} 0 0 1 ${r},${r} V${y + h} Z`}
                    fill={hover === i ? SERIES_HOVER : SERIES}
                    pointerEvents="none"
                  />
                )}
              </g>
            );
          })}
        </svg>
      )}
      {hovered && hover !== null && (
        <div
          className="pointer-events-none absolute -top-9 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-navy-950 px-2 py-1 text-xs text-white shadow"
          style={{ left: hover * slot + slot / 2 }}
        >
          <span className="font-semibold">{hovered.users}</span>{" "}
          {hovered.minutes_ago === 0
            ? "this minute"
            : `${hovered.minutes_ago} min ago`}
        </div>
      )}
      <div className="mt-1 flex justify-between text-[10px] text-muted">
        <span>−30 min</span>
        <span>now</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Daily line chart (single series, area wash, crosshair tooltip)
// ---------------------------------------------------------------------------

export interface DailyPoint {
  date: string;
  users: number;
  sessions: number;
  page_views: number;
}

const dayLabel = (iso: string, withYear = false) =>
  new Date(iso + "T12:00:00").toLocaleDateString(LOCALE, {
    day: "numeric",
    month: "short",
    ...(withYear ? { year: "numeric" } : {}),
  });

const longDayLabel = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString(LOCALE, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

export function DailyChart({ points }: { points: DailyPoint[] }) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [active, setActive] = useState<number | null>(null);
  const tooltipId = useId();

  const height = 240;
  const pad = { top: 12, right: 16, bottom: 28, left: 44 };
  const plotW = Math.max(0, width - pad.left - pad.right);
  const plotH = height - pad.top - pad.bottom;
  const ticks = niceTicks(Math.max(...points.map((p) => p.users), 0));
  const yMax = ticks[ticks.length - 1];
  const n = points.length;
  const xAt = (i: number) => pad.left + (n > 1 ? (i / (n - 1)) * plotW : plotW / 2);
  const yAt = (v: number) => pad.top + plotH - (yMax > 0 ? (v / yMax) * plotH : 0);

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${xAt(i).toFixed(1)},${yAt(p.users).toFixed(1)}`)
    .join(" ");
  const areaPath =
    n > 0
      ? `${linePath} L${xAt(n - 1).toFixed(1)},${(pad.top + plotH).toFixed(1)} L${xAt(0).toFixed(1)},${(pad.top + plotH).toFixed(1)} Z`
      : "";

  // Label every k-th day so the axis never crowds: aim for ~6 labels.
  const every = Math.max(1, Math.ceil(n / 6));

  const nearest = useCallback(
    (clientX: number, el: SVGSVGElement) => {
      const x = clientX - el.getBoundingClientRect().left;
      if (n <= 1) return 0;
      const i = Math.round(((x - pad.left) / plotW) * (n - 1));
      return Math.min(n - 1, Math.max(0, i));
    },
    [n, pad.left, plotW],
  );

  const onPointerMove = (e: PointerEvent<SVGSVGElement>) =>
    setActive(nearest(e.clientX, e.currentTarget));

  // Keyboard readers get the same readout: arrows walk the days.
  const onKeyDown = (e: KeyboardEvent<SVGSVGElement>) => {
    if (e.key === "ArrowRight") setActive((a) => Math.min(n - 1, (a ?? -1) + 1));
    else if (e.key === "ArrowLeft") setActive((a) => Math.max(0, (a ?? n) - 1));
    else if (e.key === "Home") setActive(0);
    else if (e.key === "End") setActive(n - 1);
    else if (e.key === "Escape") setActive(null);
    else return;
    e.preventDefault();
  };

  const current = active === null ? null : points[active];
  // Flip the tooltip to the left of the crosshair in the right half.
  const tooltipLeft = active !== null && xAt(active) > width / 2;

  const spansYears =
    n > 1 && points[0].date.slice(0, 4) !== points[n - 1].date.slice(0, 4);

  return (
    <div ref={ref} className="relative w-full">
      {width > 0 && (
        <svg
          width={width}
          height={height}
          tabIndex={0}
          role="img"
          aria-label="Users per day"
          aria-describedby={current ? tooltipId : undefined}
          className="block outline-none focus-visible:ring-2 focus-visible:ring-navy-700/40"
          onPointerMove={onPointerMove}
          onPointerLeave={() => setActive(null)}
          onKeyDown={onKeyDown}
          onBlur={() => setActive(null)}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line
                x1={pad.left}
                x2={width - pad.right}
                y1={yAt(t)}
                y2={yAt(t)}
                stroke={GRID}
                strokeWidth={1}
              />
              <text
                x={pad.left - 8}
                y={yAt(t) + 3.5}
                textAnchor="end"
                fontSize={10}
                fill={INK_MUTED}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {formatNumber(t)}
              </text>
            </g>
          ))}
          {points.map((p, i) =>
            i % every === 0 || i === n - 1 ? (
              <text
                key={p.date}
                x={xAt(i)}
                y={height - 8}
                textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"}
                fontSize={10}
                fill={INK_MUTED}
              >
                {dayLabel(p.date, spansYears && (i === 0 || i === n - 1))}
              </text>
            ) : null,
          )}
          {n > 0 && <path d={areaPath} fill={SERIES} fillOpacity={0.1} />}
          <path
            d={linePath}
            fill="none"
            stroke={SERIES}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* End marker: the latest value is the one the reader wants. */}
          {n > 0 && active === null && (
            <circle
              cx={xAt(n - 1)}
              cy={yAt(points[n - 1].users)}
              r={4}
              fill={SERIES}
              stroke="#fff"
              strokeWidth={2}
            />
          )}
          {active !== null && current && (
            <g pointerEvents="none">
              <line
                x1={xAt(active)}
                x2={xAt(active)}
                y1={pad.top}
                y2={pad.top + plotH}
                stroke={INK_MUTED}
                strokeWidth={1}
              />
              <circle
                cx={xAt(active)}
                cy={yAt(current.users)}
                r={4.5}
                fill={SERIES}
                stroke="#fff"
                strokeWidth={2}
              />
            </g>
          )}
        </svg>
      )}
      {active !== null && current && (
        <div
          id={tooltipId}
          role="status"
          className={`pointer-events-none absolute top-2 z-10 min-w-[10rem] rounded-md bg-navy-950 px-3 py-2 text-xs text-white shadow-lg ${
            tooltipLeft ? "-translate-x-full" : ""
          }`}
          style={{ left: xAt(active) + (tooltipLeft ? -10 : 10) }}
        >
          <p className="mb-1 font-semibold capitalize text-white/80">
            {longDayLabel(current.date)}
          </p>
          <TooltipRow label="Users" value={current.users} keyed />
          <TooltipRow label="Sessions" value={current.sessions} />
          <TooltipRow label="Page views" value={current.page_views} />
        </div>
      )}
    </div>
  );
}

function TooltipRow({
  label,
  value,
  keyed,
}: {
  label: string;
  value: number;
  keyed?: boolean;
}) {
  return (
    <p className="flex items-center justify-between gap-4">
      <span className="flex items-center gap-1.5 text-white/70">
        <span
          className="inline-block h-0.5 w-3 rounded"
          style={{ background: keyed ? SERIES : "transparent" }}
        />
        {label}
      </span>
      <span className="font-semibold" style={{ fontVariantNumeric: "tabular-nums" }}>
        {formatNumber(value)}
      </span>
    </p>
  );
}

/** The chart's table twin: the same numbers, readable without a pointer. */
export function DailyTable({ points }: { points: DailyPoint[] }) {
  return (
    <div className="max-h-72 overflow-auto rounded-lg border border-line">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-cream text-left text-[11px] font-semibold uppercase tracking-wide text-muted">
          <tr>
            <th className="px-3 py-2">Day</th>
            <th className="px-3 py-2 text-right">Users</th>
            <th className="px-3 py-2 text-right">Sessions</th>
            <th className="px-3 py-2 text-right">Page views</th>
          </tr>
        </thead>
        <tbody
          className="divide-y divide-line"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {[...points].reverse().map((p) => (
            <tr key={p.date}>
              <td className="px-3 py-1.5 capitalize text-navy-950">{longDayLabel(p.date)}</td>
              <td className="px-3 py-1.5 text-right">{formatNumber(p.users)}</td>
              <td className="px-3 py-1.5 text-right">{formatNumber(p.sessions)}</td>
              <td className="px-3 py-1.5 text-right">{formatNumber(p.page_views)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Horizontal bar list ("top N")
// ---------------------------------------------------------------------------

export function BarList({
  items,
  empty = "No data.",
  title,
}: {
  items: { label: string; value: number; sublabel?: string }[];
  empty?: string;
  title?: string;
}) {
  const max = Math.max(1, ...items.map((i) => i.value));
  if (items.length === 0) {
    return <p className="text-sm text-muted">{empty}</p>;
  }
  return (
    <ul className="flex flex-col gap-2.5" aria-label={title}>
      {items.map((item, i) => (
        <li key={`${item.label}-${i}`} className="group text-sm">
          <div className="flex items-baseline justify-between gap-3">
            <span className="min-w-0 truncate text-navy-950" title={item.label}>
              {item.label}
              {item.sublabel && (
                <span className="ml-1.5 text-xs text-muted">{item.sublabel}</span>
              )}
            </span>
            <span
              className="shrink-0 text-xs font-semibold text-muted"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {formatNumber(item.value)}
            </span>
          </div>
          <div
            className="mt-1 h-1.5 w-full overflow-hidden rounded-full"
            style={{ background: SERIES_TRACK }}
          >
            <div
              className="h-full rounded-full transition-[width] duration-300 group-hover:brightness-110"
              style={{ width: `${(item.value / max) * 100}%`, background: SERIES }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// "Updated N s ago" ticker
// ---------------------------------------------------------------------------

export function useSecondsSince(iso: string | undefined) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!iso) return;
    const at = new Date(iso).getTime();
    const tick = () => setSeconds(Math.max(0, Math.round((Date.now() - at) / 1000)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [iso]);
  return seconds;
}
