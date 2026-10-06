import type { Metadata } from "next";
import { PartnersManager } from "@/components/admin/PartnersManager";

export const metadata: Metadata = { title: "Partners" };

export default function AdminPartnersPage() {
  return <PartnersManager />;
}
