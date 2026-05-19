import { BlankSection } from "../ui/BlankSection";

const summaryCardLabels = [
  "Summary stat card one",
  "Summary stat card two",
  "Summary stat card three",
  "Summary stat card four",
] as const;

export function DashboardSummaryStats() {
  return (
    <section
      aria-label="Summary stats section"
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {summaryCardLabels.map((label) => (
        <BlankSection
          key={label}
          ariaLabel={label}
          className="h-[148px]"
          variant="card"
        />
      ))}
    </section>
  );
}
