import { DashboardHeroSection } from "./DashboardHeroSection";
import { DashboardCardsGrid } from "./DashboardCardsGrid";
import { SummaryStatsGrid } from "./SummaryStatsGrid";

export function Dashboard() {
  return (
    <div aria-label="Home dashboard" className="grid w-full self-start gap-3">
      <DashboardHeroSection />
      <SummaryStatsGrid />
      <DashboardCardsGrid />
    </div>
  );
}
