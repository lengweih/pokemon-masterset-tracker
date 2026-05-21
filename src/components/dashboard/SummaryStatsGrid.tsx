import { dashboardSummaryStats } from "../../data/dashboard";
import { SummaryStatCard } from "./SummaryStatCard";

export function SummaryStatsGrid() {
  return (
    <section
      aria-label="Summary statistics"
      className="grid gap-3 grid-cols-2 sm:grid-cols-4"
    >
      {dashboardSummaryStats.map((stat) => (
        <SummaryStatCard key={stat.label} stat={stat} />
      ))}
    </section>
  );
}
