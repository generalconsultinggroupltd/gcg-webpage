import type { Metadata } from "next";
import { GalleryManager } from "@/components/admin/GalleryManager";

export const metadata: Metadata = { title: "Gallery" };

export default function AdminGalleryPage() {
  return <GalleryManager />;
}
