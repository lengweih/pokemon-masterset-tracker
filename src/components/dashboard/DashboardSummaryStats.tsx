import { dashboardSummaryStats } from "../../data/dashboard";
import { SummaryStatCard } from "./SummaryStatCard";

export function DashboardSummaryStats() {
  return (
    <section
      aria-label="Summary stats section"
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {dashboardSummaryStats.map((stat) => (
        <SummaryStatCard key={stat.label} stat={stat} />
      ))}
    </section>
  );
}
