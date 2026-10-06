import type { Partner } from "@/lib/api";

/** The partners shipped with the site (public/partners/), shown when the
 * API can't be reached. The live list is managed from /admin (lib/api.ts). */
export const fallbackPartners: Partner[] = [
  { name: "Media Vision Academy", logo_path: "/partners/mva.png" },
  { name: "Cathy - Nganje", logo_path: "/partners/nganje.jpg" },
].map((partner, index) => ({
  id: -(index + 1),
  description: "",
  created_at: "",
  updated_at: "",
  ...partner,
}));
