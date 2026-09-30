import type { Metadata } from "next";
import { services } from "@/lib/services";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceCard } from "@/components/home/ServiceCard";
import { reveal } from "@/lib/motion";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { nav, services } = await getDictionary(lang);
  return pageMetadata(lang, "/services", { title: nav.services, description: services.metaDescription });
}

export default async function ServicesPage() {
  const { dict } = await getDict();
  return (
    <>
      <PageHero
        eyebrow={dict.services.eyebrow}
        title={dict.services.title}
        description={dict.services.description}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <li key={service.slug} {...reveal(index % 3)}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
