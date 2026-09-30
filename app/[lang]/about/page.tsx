import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
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

/** Photos for the three "why choose us" reasons, in dictionary order. */
const reasonImages = ["/gallery/gcg1.jpg", "/gallery/gcg2.jpg", "/gallery/gcg3.jpg"];

export default async function AboutPage() {
  const { dict, href } = await getDict();
  const copy = dict.about;
  const { name: founder } = site.founder;
  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={
          <>
            {copy.titlePrefix} <span className="text-gold-400">{site.name}</span>
          </>
        }
        description={copy.intro}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,_2fr)_3fr] lg:gap-16">
          <div
            className="relative mx-auto aspect-[6/7] w-full max-w-sm overflow-hidden rounded-lg shadow-card ring-1 ring-line lg:max-w-none"
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
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1 bg-gold-500"
            />
          </div>
          <div {...reveal(1)}>
            <SectionHeading eyebrow={copy.leadership} title={founder} />
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-gold-600">
              {copy.founderRole}
            </p>
            <p className="mt-6 leading-relaxed text-muted">
              {t(copy.founderBio1, { name: founder, company: site.name })}
            </p>
            <p className="mt-4 leading-relaxed text-muted">{copy.founderBio2}</p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={copy.whyEyebrow}
            title={copy.whyTitle}
          />
          <ul className="mt-12 space-y-12 lg:space-y-16">
            {copy.reasons.map((reason, index) => (
              <li
                key={reason.title}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
                {...reveal()}
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-lg shadow-card ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={reasonImages[index]}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-serif text-5xl font-semibold text-gold-500">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl font-semibold text-navy-950">
                    {reason.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted">{reason.text}</p>
                </div>
              </li>
            ))}
          </ul>
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
