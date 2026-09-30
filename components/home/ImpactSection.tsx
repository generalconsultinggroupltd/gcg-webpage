import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/services";
import { CountUp } from "@/components/ui/CountUp";
import { AfricaIcon, GlobeIcon, LeafIcon, UsersIcon } from "@/components/ui/Icons";
import { reveal } from "@/lib/motion";
import { getDict } from "@/lib/i18n/server";

/**
 * GCG is a young company: these figures describe its footprint today, not a
 * track record. Update them as the company grows. Labels are in the
 * dictionaries (impact.stats), in the same order.
 */
const figures = [
  { icon: AfricaIcon, value: "2" },
  { icon: GlobeIcon, value: "3" },
  { icon: UsersIcon, value: String(services.length) },
  { icon: LeafIcon, value: "100%" },
];

export async function ImpactSection() {
  const { dict } = await getDict();
  const stats = figures.map((figure, index) => ({ ...figure, ...dict.impact.stats[index] }));
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      <Image
        src="/impact.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-left rtl:object-right"
      />
      {/* Photo shows through on the left and fades into solid navy on the right. */}
      <div
        aria-hidden
        className="absolute inset-0 rtl:-scale-x-100 bg-[linear-gradient(90deg,_rgb(10_20_36_/_0.45)_0%,_rgb(10_20_36_/_0.7)_30%,_rgb(10_20_36_/_0.94)_55%,_rgb(10_20_36)_100%)]"
      />
      <Container className="relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,_1fr)_2fr] lg:items-center">
        <SectionHeading
          eyebrow={dict.impact.eyebrow}
          tone="light"
          title={dict.impact.title}
        />
        <ul className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-white/15 rtl:lg:divide-x-reverse">
          {stats.map(({ icon: Icon, value, label, text }, index) => (
            <li key={label} className="text-center lg:px-6" {...reveal(index)}>
              <Icon className="mx-auto h-8 w-8 text-gold-400" />
              <p className="mt-3 font-serif text-4xl font-semibold text-gold-400">
                <CountUp value={value} />
              </p>
              <p className="mt-1 text-sm font-semibold">{label}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/65">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
