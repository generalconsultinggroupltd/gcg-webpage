import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";
import { reveal } from "@/lib/motion";
import { getDictionary, hasLocale, t } from "@/lib/i18n";
import { getDict } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { about } = await getDictionary(lang);
  return pageMetadata(lang, "/about", { title: about.metaTitle, description: about.metaDescription });
}

export default async function AboutPage() {
  const { dict, href } = await getDict();
  const copy = dict.about;
  const { name: founder } = site.founder;
  const [introLead, ...introRest] = copy.intro;
  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} description={introLead} />

      {/* "Who is GCG?" — the rest of the introduction. */}
      {introRest.length > 0 && (
        <section className="bg-white py-12 sm:py-14">
          <Container>
            <div className="max-w-3xl border-s-2 border-gold-500 ps-6" {...reveal()}>
              {introRest.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-relaxed text-ink sm:text-xl">
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Leadership: photo, bio and vision. */}
      <section className="py-16 sm:py-20">
        <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,_2fr)_3fr] lg:gap-16">
          <div
            className="relative mx-auto aspect-[6/7] w-full max-w-sm overflow-hidden rounded-lg shadow-card ring-1 ring-line lg:sticky lg:top-28 lg:max-w-none"
            {...reveal()}
          >
            <Image
              src={site.founder.photo}
              alt={t(copy.founderPhotoAlt, {
                name: founder,
                role: copy.founderRole,
                company: site.name,
              })}
              fill
              sizes="(min-width: 1024px) 40vw, 384px"
              className="object-cover object-top"
            />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-gold-500" />
          </div>
          <div {...reveal(1)}>
            <SectionHeading eyebrow={copy.leadership} title={founder} />
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-gold-600">
              {copy.founderRole}
            </p>
            {copy.founderBio.map((paragraph, index) => (
              <p key={index} className={`${index === 0 ? "mt-6" : "mt-4"} leading-relaxed text-muted`}>
                {t(paragraph, { name: founder, company: site.name })}
              </p>
            ))}

            <figure className="mt-10 rounded-lg bg-navy-950 p-6 text-white sm:p-8">
              <Eyebrow tone="light">{copy.visionTitle}</Eyebrow>
              <blockquote className="mt-4 font-serif text-xl leading-snug sm:text-2xl">
                <p>{t(dict.common.quote, { text: copy.vision })}</p>
              </blockquote>
            </figure>
          </div>
        </Container>
      </section>

      {/* Areas of expertise and international presence. */}
      <section className="bg-white py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div {...reveal()}>
            <SectionHeading title={copy.expertiseTitle} />
            <ul className="mt-8 space-y-4">
              {copy.expertise.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span className="leading-relaxed text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div {...reveal(1)}>
            <SectionHeading title={copy.presenceTitle} />
            {copy.presence.map((paragraph, index) => (
              <p key={index} className={`${index === 0 ? "mt-8" : "mt-4"} leading-relaxed text-muted`}>
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* A word from the founder. */}
      <section className="bg-navy-950 py-16 text-white sm:py-20">
        <Container>
          <figure className="mx-auto max-w-4xl text-center" {...reveal()}>
            <Eyebrow tone="light" className="justify-center">
              {copy.messageTitle}
            </Eyebrow>
            <blockquote className="mt-8 font-serif text-2xl leading-snug sm:text-3xl">
              <p>{t(dict.common.quote, { text: copy.message })}</p>
            </blockquote>
            <figcaption className="mt-8">
              <span className="block font-semibold text-gold-400">{founder}</span>
              <span className="mt-1 block text-sm text-white/70">
                {copy.founderRole} — {site.name}
              </span>
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* Why choose GCG. */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,_2fr)_3fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow={copy.whyEyebrow} title={copy.whyTitle} />
            <div
              className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-lg shadow-card lg:block"
              {...reveal(1)}
            >
              <Image
                src="/gallery/gcg1.jpg"
                alt=""
                fill
                sizes="40vw"
                className="object-cover"
              />
            </div>
          </div>
          <ol className="space-y-10">
            {copy.reasons.map((reason, index) => (
              <li key={reason.title} className="flex gap-5 sm:gap-6" {...reveal()}>
                <p className="w-12 shrink-0 font-serif text-4xl font-semibold text-gold-500 sm:text-5xl">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="border-t border-line pt-4">
                  <h3 className="font-serif text-xl font-semibold text-navy-950 sm:text-2xl">
                    {reason.title}
                  </h3>
                  {reason.text.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} className="mt-3 leading-relaxed text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-navy-950 py-16 text-white sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={copy.approachEyebrow}
            tone="light"
            title={copy.approachTitle}
            description={copy.approachText}
          />
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {copy.approach.map((step, index) => (
              <li
                key={step.title}
                className="relative border-t-2 border-gold-500 pt-5"
                {...reveal(index)}
              >
                <p className="font-serif text-3xl font-semibold text-gold-400">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-white/10 bg-navy-950 py-14 text-white">
        <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <SectionHeading
            tone="light"
            title={copy.ctaTitle}
            description={copy.ctaText}
          />
          <ButtonLink href={href("/contact")}>
            {dict.common.contactUs} <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
