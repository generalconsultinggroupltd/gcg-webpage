import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { getDict } from "@/lib/i18n/server";

export async function ServiceCta() {
  const { dict, href } = await getDict();
  return (
    <section className="bg-navy-950 py-14 text-white">
      <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
            {dict.servicePages.ctaTitle}
          </h2>
          <p className="mt-2 text-white/75">{dict.servicePages.ctaText}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={href("/contact")}>
            {dict.common.contactUs} <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href={href("/services")} variant="outline">
            {dict.common.allServices}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
