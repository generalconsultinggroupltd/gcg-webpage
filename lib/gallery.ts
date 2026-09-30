/** Gallery media, in display order. Descriptions (alt text) are in the
 * dictionaries (gallery.items), at the same index. */
export type GalleryItem = { type: "image" | "video"; src: string };

export const gallery: GalleryItem[] = [
  { type: "image", src: "/gallery/gcg1.jpg" },
  { type: "image", src: "/gallery/gcg2.jpg" },
  { type: "image", src: "/gallery/gcg3.jpg" },
  { type: "video", src: "/gallery/gcg-video.mp4" },
];
