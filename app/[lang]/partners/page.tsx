import type { Metadata } from "next";
import Image from "next/image";
import { getPartners, isUploaded, mediaUrl } from "@/lib/api";
import { fallbackPartners } from "@/lib/partners";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { reveal } from "@/lib/motion";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/partners">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { nav, partners } = await getDictionary(lang);
  return pageMetadata(lang, "/partners", { title: nav.partners, description: partners.metaDescription });
}

export default async function PartnersPage() {
  const { dict, href } = await getDict();
  const copy = dict.partners;
  const partners = (await getPartners()) ?? fallbackPartners;
  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      {partners.length > 0 && (
      <section className="py-16 sm:py-20">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner, index) => (
              <li
                key={partner.id}
                {...reveal(index % 3)}
                className="flex flex-col items-center rounded-lg bg-white p-8 shadow-card ring-1 ring-line"
              >
                <div className="relative h-28 w-full">
                  <Image
                    src={mediaUrl(partner.logo_path)}
                    alt={partner.name}
                    unoptimized={isUploaded(partner.logo_path)}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-contain"
                  />
                </div>
                <h2 className="mt-6 text-center font-serif text-lg font-semibold text-navy-950">
                  {partner.name}
                </h2>
                {partner.description && (
                  <p className="mt-2 text-center text-sm leading-relaxed text-muted">
                    {partner.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>
      )}

      <section className="bg-navy-950 py-14 text-white">
        <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <SectionHeading
            tone="light"
            title={copy.becomeTitle}
            description={copy.becomeText}
          />
          <ButtonLink href={href("/contact")}>
            {dict.common.getInTouch} <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
