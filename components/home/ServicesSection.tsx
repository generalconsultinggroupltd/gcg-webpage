import { services } from "@/lib/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "./ServiceCard";
import { reveal } from "@/lib/motion";
import { getDict } from "@/lib/i18n/server";

export async function ServicesSection() {
  const { dict } = await getDict();
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={dict.services.eyebrow}
          title={dict.services.title}
          description={dict.services.description}
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <li key={service.slug} {...reveal(index % 4)}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
