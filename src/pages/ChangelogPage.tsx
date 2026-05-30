import { FileText } from "lucide-react";

import { ChangelogTimelineEntry } from "../components/common/ChangelogTimelineEntry";
import { PageHeader } from "../components/common/PageHeader";
import { changelogEntries } from "../data/changelog";

export function ChangelogPage() {
  return (
    <section className="grid w-full self-start gap-3">
      <PageHeader
        description="Track app improvements, collection updates, and data corrections as the master set tracker evolves."
        eyebrow="Changelog"
        icon={FileText}
        title="Latest Updates"
        titleId="changelog-title"
      />

      <div className="surface-card p-6 sm:p-8">
        <div className="relative grid">
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[125px] top-[18px] z-0 w-px bg-border-strong sm:left-[150px] sm:top-[20px]"
          />

          {changelogEntries.map((entry) => (
            <ChangelogTimelineEntry
              key={`${entry.version}-${entry.date}`}
              entry={entry}
              variant="full"
            />
          ))}

          <div className="relative grid grid-cols-[108px_18px_minmax(0,1fr)] gap-2 sm:grid-cols-[124px_20px_minmax(0,1fr)] sm:gap-4">
            <div />
            <div className="relative flex justify-center">
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-1/2 top-4 z-10 w-3 -translate-x-1/2 bg-surface"
              />
              <span
                aria-hidden="true"
                className="relative z-20 mt-1.5 h-2.5 w-2.5 rounded-full border-2 border-border-strong bg-surface"
              />
            </div>
            <p className="text-xs font-semibold text-text-muted mt-[3px]">
              No older changelogs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChangelogPage;
