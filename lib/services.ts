export type ServiceIcon =
  | "consulting"
  | "trade"
  | "representation"
  | "hostesses"
  | "code"
  | "leaf"
  | "stay";

export type ServiceSlug =
  | "consulting"
  | "import-export"
  | "representation"
  | "models-hostesses"
  | "softscreatix"
  | "penja-peppers"
  | "mystay";

/**
 * The services and ventures. Their displayed name and summary come from the
 * dictionaries (services.items[slug]); `name` here is the English label used
 * to tag contact-form emails, so the team sees the same tag in any language.
 */
export type Service = {
  slug: ServiceSlug;
  name: string;
  icon: ServiceIcon;
  /** Card photo, from /public/services. */
  image: string;
  /** Internal route or external website. */
  href: string;
  external?: boolean;
};

export const services: Service[] = [
  {
    slug: "consulting",
    image: "/services/consulting.jpg",
    name: "Consulting",
    icon: "consulting",
    href: "/services/consulting",
  },
  {
    slug: "import-export",
    image: "/services/imports.jpg",
    name: "International Trade",
    icon: "trade",
    href: "/services/import-export",
  },
  {
    slug: "representation",
    image: "/services/representation.jpg",
    name: "Representation",
    icon: "representation",
    href: "/services/representation",
  },
  {
    slug: "models-hostesses",
    image: "/services/models.jpg",
    name: "Models & Hostesses",
    icon: "hostesses",
    href: "https://modelshostesses.com",
    external: true,
  },
  {
    slug: "softscreatix",
    image: "/services/softscreatix.jpg",
    name: "SoftsCreatix",
    icon: "code",
    href: "https://softscreatix.com",
    external: true,
  },
  {
    slug: "penja-peppers",
    image: "/services/penja.jpg",
    name: "Penja Peppers",
    icon: "leaf",
    href: "https://penjaspeppers.com",
    external: true,
  },
  {
    slug: "mystay",
    image: "/services/mystay.jpg",
    name: "MyStay",
    icon: "stay",
    href: "https://mystays-comingsoon.vercel.app",
    external: true,
  },
];
