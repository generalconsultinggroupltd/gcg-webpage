import type { Metadata } from "next";
import Image from "next/image";
import { partners } from "@/lib/partners";
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
  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner, index) => (
              <li
                key={partner.name}
                {...reveal(index % 3)}
                className="flex flex-col items-center rounded-lg bg-white p-8 shadow-card ring-1 ring-line"
              >
                <div className="flex h-32 w-full items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    className="max-h-28 w-auto object-contain"
                  />
                </div>
                <h2 className="mt-6 font-serif text-lg font-semibold text-navy-950">
                  {partner.name}
                </h2>
              </li>
            ))}
          </ul>
        </Container>
      </section>

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
