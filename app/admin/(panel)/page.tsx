import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import { ContentSummary } from "@/components/admin/ContentSummary";

/** Content counts (as on the previous admin) and visitor statistics. */
export default function AdminDashboardPage() {
  return (
    <>
      <ContentSummary />
      <div className="mt-12 border-t border-line pt-10">
        <AnalyticsDashboard />
      </div>
    </>
  );
}
