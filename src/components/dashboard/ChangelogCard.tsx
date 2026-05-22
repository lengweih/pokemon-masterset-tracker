import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";

import { changelogEntries } from "../../data/changelog";
import { ROUTES } from "../../routes/paths";
import { ChangelogTimelineEntry } from "../common/ChangelogTimelineEntry";
import { DashboardCardHeader } from "./DashboardCardHeader";

const dashboardChangelogEntries = changelogEntries.slice(0, 3);

export function ChangelogCard() {
  return (
    <article className="surface-card h-full p-6">
      <DashboardCardHeader
        description="Latest updates & improvements"
        icon={FileText}
        iconColor="#7B61FF"
        title="Changelog"
      />

      <div className="relative mt-7 grid pb-5">
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-[125px] top-[15px] w-px bg-gradient-to-b from-border-strong via-border-strong to-transparent"
        />

        {dashboardChangelogEntries.map((entry) => (
          <ChangelogTimelineEntry
            key={`${entry.version}-${entry.date}`}
            entry={entry}
            variant="compact"
          />
        ))}
      </div>

      <Link
        className="inner-ring flex h-11 items-center justify-center gap-2 rounded-button bg-surface px-5 text-sm font-medium text-text-secondary transition-all duration-180 ease-premium hover:bg-surface-hover hover:text-text-primary"
        to={ROUTES.changelog}
      >
        <span>View Full Changelog</span>
        <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
      </Link>
    </article>
  );
}
