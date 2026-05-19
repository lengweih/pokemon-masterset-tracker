import { BlankSection } from "../ui/BlankSection";

const sectionLabels = [
  "Progress overview section",
  "Quick actions section",
  "Changelog section",
] as const;

export function DashboardDetailsSection() {
  return (
    <section
      aria-label="Dashboard detail sections"
      className="grid gap-3 xl:grid-cols-[1.1fr_0.9fr_1.1fr]"
    >
      {sectionLabels.map((label) => (
        <BlankSection key={label} ariaLabel={label} className="h-80" />
      ))}
    </section>
  );
}
