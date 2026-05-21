import { ExternalLink, FileText } from "lucide-react";

import { changelogEntries } from "../../data/changelog";
import { ROUTES } from "../../routes/paths";
import { DashboardCardHeader } from "./DashboardCardHeader";

export function ChangelogCard() {
  return (
    <article className="surface-card h-full p-6">
      <DashboardCardHeader
        description="Latest updates & improvements"
        icon={FileText}
        iconColor="#7B61FF"
        title="Changelog"
      />

      <div className="mt-7 grid gap-4">
        {changelogEntries.map((entry) => (
          <div
            key={entry.date}
            className="grid grid-cols-[14px_92px_1fr] gap-2"
          >
            <span
              aria-hidden="true"
              className="mt-[3px] h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: entry.dotColor }}
            />
            <div>
              <p className="text-xs font-semibold leading-[1.35] text-text-secondary">
                {entry.date}
              </p>
              <p className="mt-1 text-xs font-semibold leading-none text-text-muted">
                {entry.version}
              </p>
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold leading-[1.35] text-text-primary">
                {entry.title}
              </p>
              <p className="mt-1 line-clamp-2 text-[11.5px] font-medium leading-[1.35] text-text-secondary">
                {entry.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <a
        className="inner-ring mt-6 flex h-11 items-center justify-center gap-3 rounded-button bg-surface px-5 text-sm font-medium text-text-secondary transition-all duration-180 ease-premium hover:bg-surface-hover hover:text-text-primary"
        href={ROUTES.home}
      >
        <span>View Full Changelog</span>
        <ExternalLink aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
      </a>
    </article>
  );
}
