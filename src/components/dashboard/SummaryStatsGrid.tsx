import { getDashboardSummaryStats } from "../../data/dashboard";
import { useCollectionStats } from "../../hooks/useCollectionStats";
import { SummaryStatCard } from "./SummaryStatCard";

export function SummaryStatsGrid() {
  const stats = useCollectionStats();
  const summaryStats = getDashboardSummaryStats(stats);

  return (
    <section
      aria-label="Summary statistics"
      className="grid gap-3 grid-cols-2 sm:grid-cols-4"
    >
      {summaryStats.map((stat) => (
        <SummaryStatCard key={stat.label} stat={stat} />
      ))}
    </section>
  );
}
