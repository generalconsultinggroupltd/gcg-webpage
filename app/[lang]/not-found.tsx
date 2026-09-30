import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { getDict } from "@/lib/i18n/server";

export default async function NotFound() {
  const { dict, href } = await getDict();
  return (
    <section className="py-24 sm:py-32">
      <Container className="text-center">
        <p className="font-serif text-7xl font-semibold text-gold-500">404</p>
        <h1 className="mt-4 font-serif text-3xl font-semibold text-navy-950">
          {dict.notFound.title}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted">{dict.notFound.text}</p>
        <div className="mt-8">
          <ButtonLink href={href("/")}>
            {dict.notFound.backHome} <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
