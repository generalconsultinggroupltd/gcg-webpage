import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { legalSlugs, type LegalBlock } from "@/lib/legal";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { defaultLocale, getDictionary, getLegalDocuments, hasLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/metadata";

export function generateStaticParams() {
  return legalSlugs.map((legal) => ({ legal }));
}

// Any other single-segment URL (/fr/anything) reaches this page too and
// gets the site's own 404 from notFound(), in the right language.

async function getDocument(lang: Locale, slug: string) {
  return (await getLegalDocuments(lang)).find((document) => document.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[legal]">): Promise<Metadata> {
  const { lang, legal } = await params;
  if (!hasLocale(lang)) return {};
  const document = await getDocument(lang, legal);
  if (!document) return {};
  return pageMetadata(lang, `/${legal}`, {
    title: document.title,
    description: `${document.title} — ${document.company}.`,
  });
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-10 font-serif text-2xl font-semibold text-navy-950 first:mt-0">
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="mt-6 text-lg font-semibold text-navy-900">{block.text}</h3>;
    case "p":
      return <p className="mt-3 leading-relaxed text-muted">{block.text}</p>;
    case "list":
      return (
        <ul className="mt-3 list-disc space-y-1.5 ps-6 text-muted marker:text-gold-600">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "definitions":
      return (
        <ul className="mt-3 list-disc space-y-1.5 ps-6 text-muted marker:text-gold-600">
          {block.items.map((item) => (
            <li key={item.term}>
              <strong className="font-semibold text-ink">{item.term}</strong>: {item.text}
            </li>
          ))}
        </ul>
      );
  }
}

export default async function LegalPage({ params }: PageProps<"/[lang]/[legal]">) {
  const { lang, legal } = await params;
  if (!hasLocale(lang)) notFound();
  const document = await getDocument(lang, legal);
  if (!document) notFound();
  const { legalPage } = await getDictionary(lang);

  return (
    <>
      <PageHero eyebrow={document.company} title={document.title} />
      <section className="py-16 sm:py-20">
        <Container>
          <article className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-card ring-1 ring-line sm:p-10">
            {lang !== defaultLocale && (
              <p className="mb-8 rounded-md bg-cream px-4 py-3 text-sm text-muted">
                {legalPage.translationNotice}
              </p>
            )}
            {document.blocks.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </article>
        </Container>
      </section>
    </>
  );
}
