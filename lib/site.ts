export const site = {
  name: "General Consulting Group",
  shortName: "GCG",
  legalName: "General Consulting Group Ltd",
  /** Public URL of the site; used for canonical links, sitemap and share cards. */
  url: "https://generalsconsultinggroups.com",
  contact: {
    email: "contact@generalsconsultinggroups.com",
    phones: ["+250 796 129 284", "+250 728 231 090"],
    /** WhatsApp line of the Cameroon office. */
    whatsapp: { display: "+237 688 528 283", href: "https://wa.me/237688528283" },
  },
  founder: {
    name: "Patrick Junior Njambe II",
    /** English title, for search-engine data; pages show about.founderRole. */
    role: "Founder & Managing Director",
    photo: "/owner.jpeg",
  },
  developer: { name: "SoftsCreatix", href: "https://softscreatix.com" },
  /**
   * Social links shown in the footer. Entries left as "#" are hidden, so no
   * dead icons appear; fill in the real profile URLs to show them.
   */
  social: [
    { name: "LinkedIn", href: "#" },
    { name: "X", href: "#" },
    { name: "Facebook", href: "#" },
    { name: "YouTube", href: "#" },
  ],
} as const;

/** Main navigation; labels come from the dictionaries (nav[key]). */
export const navigation = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "partners", href: "/partners" },
  { key: "gallery", href: "/gallery" },
  { key: "contact", href: "/contact" },
] as const;
