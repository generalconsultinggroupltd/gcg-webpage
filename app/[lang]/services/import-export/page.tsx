import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContentBlocks } from "@/components/services/ContentBlocks";
import { ServiceCta } from "@/components/services/ServiceCta";
import { CheckIcon } from "@/components/ui/Icons";
import { reveal } from "@/lib/motion";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/services/import-export">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const page = (await getDictionary(lang)).servicePages.importExport;
  return pageMetadata(lang, "/services/import-export", { title: page.title, description: page.intro });
}

/** Photos beside the two "Commitment to Africa" paragraphs, in order. */
const missionImages = ["/gallery/gcg2.jpg", "/gallery/gcg3.jpg"];

export default async function ImportExportPage() {
  const { dict } = await getDict();
  const page = dict.servicePages.importExport;
  return (
    <>
      <PageHero
        eyebrow={dict.servicePages.eyebrow}
        title={page.title}
        description={page.intro}
      />

      {/* The branch's activities at a glance. */}
      <section className="border-b border-line bg-white py-10 sm:py-12">
        <Container>
          <h2 className="font-serif text-2xl font-semibold text-navy-950">{page.activitiesTitle}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {page.activities.map((activity, index) => (
              <li
                key={activity}
                className="flex items-center gap-3 rounded-md bg-cream px-4 py-3"
                {...reveal(index % 3)}
              >
                <CheckIcon className="h-5 w-5 shrink-0 text-gold-600" />
                <span className="font-medium text-ink">{activity}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={dict.servicePages.whatWeDo}
            title={page.sectionTitle}
            className="mb-10"
          />
          <ContentBlocks items={page.items} columns={3} />
        </Container>
      </section>

      <section className="bg-navy-950 py-16 text-white sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={dict.servicePages.whyUs}
            tone="light"
            title={page.advantagesTitle}
            className="mb-10"
          />
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {page.advantages.map((advantage, index) => (
              <li
                key={advantage.title}
                className="border-s-2 border-gold-500 ps-5"
                {...reveal(index)}
              >
                <p className="font-serif text-3xl font-semibold text-gold-400">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-semibold">{advantage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {advantage.text}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={dict.servicePages.ourMission}
            title={page.missionTitle}
            className="mb-10"
          />
          <ul className="space-y-10">
            {page.mission.map((text, index) => (
              <li
                key={missionImages[index]}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
                {...reveal()}
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-lg shadow-card ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={missionImages[index]}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="text-lg leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ServiceCta />
    </>
  );
}
