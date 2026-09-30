import Image from "next/image";
import { site } from "@/lib/site";
import { getDict } from "@/lib/i18n/server";
import { rich } from "@/lib/i18n/rich";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { delay } from "@/lib/motion";

export async function Hero() {
  const { dict, href } = await getDict();
  const copy = dict.hero;
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      {/*
        Earth photo, framed so the globe sits in the right column on desktop
        (the globe is centred at ~55% of the source image) and behind the text
        on smaller screens. On Arabic pages the text column is on the right, so
        the photo sits at the other end and the fade is mirrored.
      */}
      <div aria-hidden className="absolute inset-y-0 end-0 w-full overflow-hidden lg:w-[62%]">
        <Image
          src="/hero3.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="animate-hero-zoom object-cover object-[55%_center]"
        />
        {/* Blend the photo's black space into the navy background. */}
        <div className="absolute inset-0 bg-navy-950/15" />
        <div className="absolute inset-0 rtl:-scale-x-100 bg-[linear-gradient(90deg,_rgb(10_20_36)_0%,_rgb(10_20_36_/_0.55)_22%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgb(10_20_36_/_0.7)_0%,_transparent_25%,_transparent_75%,_rgb(10_20_36_/_0.7)_100%)]" />
      </div>
      {/* Extra darkening behind the text on small screens only. */}
      <div aria-hidden className="absolute inset-0 bg-navy-950/60 lg:hidden" />

      <Container className="relative flex min-h-[520px] flex-col justify-center py-20 sm:min-h-[600px] lg:min-h-[640px] lg:py-24">
        <div className="max-w-xl">
          <p className="animate-fade-up text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
            {copy.pillars.map((pillar, index) => (
              <span key={pillar}>
                {index > 0 && <span className="mx-2 text-gold-500">•</span>}
                {pillar}
              </span>
            ))}
          </p>
          <h1
            className="animate-fade-up mt-6 font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            style={delay(120)}
          >
            {copy.titleLine1}
            <br />
            <span className="text-gold-400">{copy.titleLine2}</span>
          </h1>
          <p
            className="animate-fade-up mt-6 text-base leading-relaxed text-white/80 sm:text-lg"
            style={delay(240)}
          >
            {rich(copy.text, { name: <span className="text-white">{site.name}</span> })}
          </p>
          <div className="animate-fade-up mt-8 flex flex-wrap gap-4" style={delay(360)}>
            <ButtonLink href={href("/about")}>
              {copy.discover} <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={href("/services")} variant="outline">
              {copy.ourServices}
            </ButtonLink>
          </div>
        </div>

        <p
          className="animate-fade-up mt-12 max-w-[200px] border-s-2 border-gold-500 ps-4 text-[11px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-white/85 lg:absolute lg:end-12 lg:bottom-16 lg:mt-0"
          style={delay(600)}
        >
          {copy.tagline}
        </p>
      </Container>
    </section>
  );
}
