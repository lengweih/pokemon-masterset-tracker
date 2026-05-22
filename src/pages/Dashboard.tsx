import { DashboardHeroSection } from "../components/dashboard/DashboardHeroSection";
import { DashboardCardsGrid } from "../components/dashboard/DashboardCardsGrid";
import { SummaryStatsGrid } from "../components/dashboard/SummaryStatsGrid";

export function Dashboard() {
  return (
    <div aria-label="Home dashboard" className="grid w-full self-start gap-3">
      <DashboardHeroSection />
      <SummaryStatsGrid />
      <DashboardCardsGrid />
    </div>
  );
}
