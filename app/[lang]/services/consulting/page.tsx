import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContentBlocks } from "@/components/services/ContentBlocks";
import { ServiceCta } from "@/components/services/ServiceCta";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/services/consulting">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const page = (await getDictionary(lang)).servicePages.consulting;
  return pageMetadata(lang, "/services/consulting", { title: page.title, description: page.intro });
}

export default async function ConsultingPage() {
  const { dict } = await getDict();
  const page = dict.servicePages.consulting;
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
            eyebrow={dict.servicePages.whatWeDo}
            title={page.sectionTitle}
            className="mb-10"
          />
          <ContentBlocks items={page.items} />
        </Container>
      </section>
      <ServiceCta />
    </>
  );
}
