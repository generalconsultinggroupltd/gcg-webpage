import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/services";
import { ArrowRightIcon, ExternalLinkIcon, serviceIcons } from "@/components/ui/Icons";
import { t } from "@/lib/i18n";
import { getDict } from "@/lib/i18n/server";

/**
 * Card with a photo header, a gold circular icon badge straddling the edge,
 * then title, summary and an arrow link.
 */
export async function ServiceCard({ service }: { service: Service }) {
  const { dict, href } = await getDict();
  const { name, summary } = dict.services.items[service.slug];
  const Icon = serviceIcons[service.icon];
  const linkClass =
    "group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-card ring-1 ring-line transition-transform duration-300 hover:-translate-y-1";

  const body = (
    <>
      <div className="relative h-40">
        <div className="absolute inset-0 overflow-hidden bg-navy-900">
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <span className="absolute start-6 -bottom-7 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold-500 bg-navy-950 text-gold-400">
          <Icon className="h-6 w-6" />
        </span>
      </div>
      <div className="flex flex-1 flex-col px-6 pt-11 pb-6">
        <h3 className="font-serif text-lg font-semibold text-navy-950">
          {name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{summary}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-navy-950 transition-colors group-hover:text-gold-600">
          {service.external ? (
            <>
              {dict.common.visitWebsite} <ExternalLinkIcon className="h-4 w-4" />
            </>
          ) : (
            <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          )}
        </span>
      </div>
    </>
  );

  if (service.external) {
    return (
      <a
        href={service.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-label={t(dict.common.opensInNewTab, { name })}
      >
        {body}
      </a>
    );
  }

  return (
    <Link href={href(service.href)} className={linkClass}>
      {body}
    </Link>
  );
}
