/** Case studies shown under "Our Work". Their text is in the dictionaries
 * (projects.items[slug]). */
export type Project = {
  slug: "step-for-the-future" | "softscreatix";
  image: string;
  href: string;
};

export const projects: Project[] = [
  {
    slug: "step-for-the-future",
    image: "/projects/stepfuture.jpg",
    href: "https://stepfuture.org",
  },
  {
    slug: "softscreatix",
    image: "/projects/softscreatix.png",
    href: "https://softscreatix.com",
  },
];
