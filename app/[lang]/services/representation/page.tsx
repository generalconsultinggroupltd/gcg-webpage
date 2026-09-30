import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContentBlocks } from "@/components/services/ContentBlocks";
import { ServiceCta } from "@/components/services/ServiceCta";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/services/representation">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const page = (await getDictionary(lang)).servicePages.representation;
  return pageMetadata(lang, "/services/representation", { title: page.title, description: page.intro });
}

export default async function RepresentationPage() {
  const { dict } = await getDict();
  const page = dict.servicePages.representation;
  return (
    <>
      <PageHero
        eyebrow={dict.servicePages.eyebrow}
        title={page.title}
        description={page.intro}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={dict.servicePages.ourApproach}
            title={page.sectionTitle}
            className="mb-10"
          />
          <ContentBlocks items={page.items} columns={3} />
        </Container>
      </section>
      <ServiceCta />
    </>
  );
}
