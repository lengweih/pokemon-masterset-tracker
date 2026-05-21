import { ChangelogCard } from "./ChangelogCard";
import { ProgressOverviewCard } from "./ProgressOverviewCard";
import { QuickActionsCard } from "./QuickActionsCard";

export function DashboardDetailsSection() {
  return (
    <section
      aria-label="Dashboard detail sections"
      className="grid gap-3 xl:grid-cols-[1fr_0.9fr_1.1fr]"
    >
      <ProgressOverviewCard />
      <QuickActionsCard />
      <ChangelogCard />
    </section>
  );
}
