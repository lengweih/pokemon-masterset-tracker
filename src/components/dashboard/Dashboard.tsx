import { DashboardHeroSection } from "./DashboardHeroSection";
import { DashboardDetailsSection } from "./DashboardDetailsSection";
import { DashboardSummaryStats } from "./DashboardSummaryStats";

export function Dashboard() {
  return (
    <div aria-label="Home dashboard skeleton" className="grid w-full self-start gap-4">
      <DashboardHeroSection />
      <DashboardSummaryStats />
      <DashboardDetailsSection />
    </div>
  );
}
