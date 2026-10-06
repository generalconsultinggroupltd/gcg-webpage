import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/admin/PasswordRecovery";

export const metadata: Metadata = {
  title: "Reset password",
  // The page URL carries the reset token: never send it to other sites.
  referrer: "no-referrer",
};

export default function ResetPasswordPage() {
  // useSearchParams needs a Suspense boundary on a statically built page.
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
