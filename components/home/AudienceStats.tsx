import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CountUp } from "@/components/ui/CountUp";
import { GlobeIcon, UsersIcon } from "@/components/ui/Icons";
import { getSiteStats } from "@/lib/api";
import { reveal } from "@/lib/motion";
import { formatNumber, localeMeta } from "@/lib/i18n";
import { getDict } from "@/lib/i18n/server";

/**
 * Visitor figures from Google Analytics: a few all-time totals showing that
 * the site is read, and read from many places. When analytics isn't
 * configured on the server, or the property has no visits yet, the section
 * is left out altogether rather than showing zeros.
 */
export async function AudienceStats() {
  const [stats, { lang, dict }] = await Promise.all([getSiteStats(), getDict()]);
  if (!stats || stats.visitors < 1) return null;
  const copy = dict.audience;

  const tiles = [
    { icon: UsersIcon, label: copy.visitors, value: stats.visitors },
    { icon: GlobeIcon, label: copy.countries, value: stats.countries },
    { icon: UsersIcon, label: copy.lastMonth, value: stats.visitors_last_30_days },
  ].filter((tile) => tile.value > 0);

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,_1fr)_1.4fr] lg:items-center">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />
        <div>
          <ul className="grid grid-cols-2 gap-y-10 border-t border-line pt-8 sm:grid-cols-3 sm:gap-x-8">
            {tiles.map(({ icon: Icon, label, value }, index) => (
              <li key={label} {...reveal(index)}>
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                  <Icon className="h-4 w-4 text-gold-600" />
                  {label}
                </p>
                <p className="mt-3 font-serif text-4xl font-semibold text-navy-950 sm:text-5xl">
                  <CountUp value={formatNumber(lang, value)} locale={localeMeta[lang].intl} />
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-xs text-muted">
            {copy.note}
          </p>
        </div>
      </Container>
    </section>
  );
}
