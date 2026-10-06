import type { Metadata } from "next";
import { getGallery } from "@/lib/api";
import { fallbackGallery, translateShipped } from "@/lib/gallery";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/gallery">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { gallery } = await getDictionary(lang);
  return pageMetadata(lang, "/gallery", { title: gallery.eyebrow, description: gallery.metaDescription });
}

export default async function GalleryPage() {
  const { dict } = await getDict();
  const copy = dict.gallery;
  const live = await getGallery();
  const items = live ? translateShipped(live, copy.items) : fallbackGallery(copy.items);
  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={
          <>
            {copy.titlePrefix} <span className="text-gold-400">{copy.titleHighlight}</span>
          </>
        }
        description={copy.description}
      />
      <section className="py-16 sm:py-20">
        <Container>
          {items.length > 0 ? (
            <GalleryGrid items={items} />
          ) : (
            <p className="py-12 text-center text-muted">{copy.empty}</p>
          )}
        </Container>
      </section>
    </>
  );
}
