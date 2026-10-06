import { AdminShell } from "@/components/admin/AdminShell";

/** Signed-in pages: sign-in form until there is a session, then the
 * sidebar. Forgot / reset password live outside this group. */
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
