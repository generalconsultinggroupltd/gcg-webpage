import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/admin/PasswordRecovery";

export const metadata: Metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
