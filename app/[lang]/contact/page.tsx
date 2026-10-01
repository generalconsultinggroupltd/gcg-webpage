import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { ContactForm } from "@/components/contact/ContactForm";
import { reveal } from "@/lib/motion";
import { getDictionary, hasLocale, t } from "@/lib/i18n";
import { getDict } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { contact } = await getDictionary(lang);
  return pageMetadata(lang, "/contact", {
    title: contact.eyebrow,
    description: t(contact.metaDescription, { email: site.contact.email }),
  });
}

function telHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export default async function ContactPage() {
  const { dict } = await getDict();
  const copy = dict.contact;
  const { email, phones, whatsapp } = site.contact;

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,_2fr)_3fr] lg:gap-16">
          <ul className="space-y-6">
            <li className="flex gap-4" {...reveal(0)}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gold-500 bg-navy-950 text-gold-400">
                <MapPinIcon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-serif text-lg font-semibold text-navy-950">{copy.location}</h2>
                <ul className="mt-1 space-y-0.5">
                  {copy.addresses.map((address) => (
                    <li key={address} className="text-muted">
                      {address}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className="flex gap-4" {...reveal(1)}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gold-500 bg-navy-950 text-gold-400">
                <MailIcon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-serif text-lg font-semibold text-navy-950">{copy.email}</h2>
                <a
                  href={`mailto:${email}`}
                  className="mt-1 block break-all text-muted transition-colors hover:text-gold-600"
                >
                  {email}
                </a>
              </div>
            </li>
            <li className="flex gap-4" {...reveal(2)}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gold-500 bg-navy-950 text-gold-400">
                <PhoneIcon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-serif text-lg font-semibold text-navy-950">{copy.phone}</h2>
                <ul className="mt-1 space-y-0.5">
                  {phones.map((phone) => (
                    <li key={phone}>
                      <a
                        href={telHref(phone)}
                        dir="ltr"
                        className="text-muted transition-colors hover:text-gold-600"
                      >
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className="flex gap-4" {...reveal(3)}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gold-500 bg-navy-950 text-gold-400">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-serif text-lg font-semibold text-navy-950">{copy.whatsapp}</h2>
                <a
                  href={whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="mt-1 inline-block text-muted transition-colors hover:text-gold-600"
                >
                  {whatsapp.display}
                </a>
              </div>
            </li>
          </ul>

          <div className="rounded-lg bg-white p-6 shadow-card ring-1 ring-line sm:p-8" {...reveal(1)}>
            <h2 className="font-serif text-2xl font-semibold text-navy-950">
              {copy.formTitle}
            </h2>
            <p className="mt-2 text-sm text-muted">{copy.formText}</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
