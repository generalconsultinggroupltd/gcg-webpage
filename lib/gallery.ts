import type { GalleryItem } from "@/lib/api";

/** The media shipped with the site (public/gallery/), shown when the API
 * can't be reached. The live list is managed from /admin (lib/api.ts).
 * Descriptions are in the dictionaries (gallery.items), at the same index. */
const media: { type: GalleryItem["media_type"]; src: string; english: string }[] = [
  { type: "image", src: "/gallery/gcg1.jpg", english: "General Consulting Group working session" },
  { type: "image", src: "/gallery/gcg2.jpg", english: "General Consulting Group strategy meeting" },
  { type: "image", src: "/gallery/gcg3.jpg", english: "General Consulting Group team at work" },
  { type: "video", src: "/gallery/gcg-video.mp4", english: "General Consulting Group in action" },
];

export function fallbackGallery(descriptions: readonly string[]): GalleryItem[] {
  return media.map((item, index) => ({
    id: -(index + 1),
    media_type: item.type,
    path: item.src,
    description: descriptions[index] ?? "",
    created_at: "",
    updated_at: "",
  }));
}

/** The API starts with the shipped media and their English descriptions
 * (backend/database/schema.go). While an item keeps that description, show
 * the visitor's translation instead; once edited in /admin, the admin's
 * text is shown as typed. */
export function translateShipped(items: GalleryItem[], descriptions: readonly string[]): GalleryItem[] {
  return items.map((item) => {
    const index = media.findIndex((m) => m.src === item.path && m.english === item.description);
    return index >= 0 && descriptions[index] ? { ...item, description: descriptions[index] } : item;
  });
}
