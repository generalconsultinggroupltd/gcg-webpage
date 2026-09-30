import Image from "next/image";
import { projects } from "@/lib/projects";
import { reveal } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon, ExternalLinkIcon } from "@/components/ui/Icons";
import { t } from "@/lib/i18n";
import { getDict } from "@/lib/i18n/server";

/** Case studies: client context, what GCG delivered, and the outcome. */
export async function ProjectsSection() {
  const { dict } = await getDict();
  const copy = dict.projects;
  return (
    <section id="our-work" className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <ul className="mt-10 space-y-10">
          {projects.map((project, index) => {
            const text = copy.items[project.slug];
            return (
            <li
              key={project.slug}
              className="grid overflow-hidden rounded-lg bg-cream shadow-card ring-1 ring-line lg:grid-cols-2"
              {...reveal()}
            >
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(copy.visitLabel, { name: text.client })}
                className={`group flex items-center bg-navy-900 p-5 sm:p-8 lg:p-10 ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                {/* The screenshot is shown whole, at its own ~2:1 shape, in a
                    browser frame. Stretching it to the card's height with
                    object-cover used to enlarge it past the width `sizes`
                    announces, so a small file was upscaled and text blurred. */}
                <div className="w-full overflow-hidden rounded-md bg-white shadow-card ring-1 ring-white/10">
                  <div className="flex items-center gap-1.5 bg-navy-100 px-3 py-2" aria-hidden>
                    <span className="h-2 w-2 rounded-full bg-navy-700/30" />
                    <span className="h-2 w-2 rounded-full bg-navy-700/30" />
                    <span className="h-2 w-2 rounded-full bg-navy-700/30" />
                  </div>
                  <div className="relative aspect-[2/1] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={t(copy.imageAlt, { name: text.client })}
                      fill
                      quality={90}
                      sizes="(min-width: 1280px) 560px, (min-width: 1024px) 44vw, 92vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>
              </a>

              <div className="p-6 sm:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-600">
                  {text.sector} <span className="mx-1.5 text-line">|</span> {text.location}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-semibold text-navy-950 sm:text-3xl">
                  {text.client}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{text.context}</p>
                <p className="mt-3 leading-relaxed text-muted">{text.challenge}</p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-semibold text-navy-950">
                      {copy.whatWeDid}{" "}
                      <span className="font-normal text-muted">· {text.deliveredBy}</span>
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {text.work.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-navy-950">{copy.result}</h4>
                    <ul className="mt-3 space-y-2">
                      {text.results.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-950 transition-colors hover:text-gold-600"
                >
                  {t(copy.visit, { site: project.href.replace(/^https?:\/\//, "") })}
                  <ExternalLinkIcon className="h-4 w-4" />
                </a>
              </div>
            </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
