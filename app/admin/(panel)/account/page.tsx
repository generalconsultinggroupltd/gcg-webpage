import type { Metadata } from "next";
import { AccountSettings } from "@/components/admin/AccountSettings";

export const metadata: Metadata = { title: "My account" };

export default function AdminAccountPage() {
  return <AccountSettings />;
}
