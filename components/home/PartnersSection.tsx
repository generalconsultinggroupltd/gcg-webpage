import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PartnerLogos } from "@/components/PartnerLogos";
import { getDict } from "@/lib/i18n/server";

export async function PartnersSection() {
  const { dict } = await getDict();
  return (
    <section className="py-16 sm:py-20">
      <Container className="grid grid-cols-[minmax(0,_1fr)] gap-10 lg:grid-cols-[minmax(0,_1fr)_1.4fr] lg:items-center">
        <SectionHeading
          eyebrow={dict.partners.eyebrow}
          title={dict.partners.title}
          description={dict.partners.description}
        />
        <PartnerLogos />
      </Container>
    </section>
  );
}
