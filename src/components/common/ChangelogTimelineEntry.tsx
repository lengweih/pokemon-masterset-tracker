import { CalendarDays } from "lucide-react";

import type { ChangelogEntry } from "../../types/changelog";

type ChangelogTimelineVariant = "compact" | "full";

interface ChangelogTimelineEntryProps {
  entry: ChangelogEntry;
  variant: ChangelogTimelineVariant;
}

const baseStyles = {
  date:
    "flex items-center gap-2 whitespace-nowrap font-semibold leading-[1.35] text-text-secondary",
  description: "font-medium text-text-secondary",
  marker:
    "relative z-10 mt-0.5 h-3.5 w-3.5 rounded-full border-[3px] bg-surface",
  title: "font-semibold text-text-primary",
  version:
    "mt-1 pl-[23px] text-[11px] font-semibold leading-none text-text-muted xs:text-xs",
  wrapper:
    "relative grid grid-cols-[108px_18px_minmax(0,1fr)] gap-2",
} as const;

const variantStyles: Record<
  ChangelogTimelineVariant,
  {
    date: string;
    description: string;
    marker: string;
    title: string;
    wrapper: string;
  }
> = {
  compact: {
    date: "text-[11px] xs:text-xs",
    description:
      "mt-1 line-clamp-2 text-[11.5px] leading-[1.35] xs:text-xs xl:text-[11.5px]",
    marker: "",
    title: "truncate text-xs leading-[1.35] xs:text-sm xl:text-xs",
    wrapper: "pb-4 last:pb-0",
  },
  full: {
    date: "text-[12px] xs:text-xs sm:text-label",
    description: "mt-2 text-[11px] leading-[1.6] xs:text-body",
    marker: "sm:mt-1 sm:h-4 sm:w-4",
    title: "text-sm leading-[1.4] xs:text-card",
    wrapper: "pb-7 sm:grid-cols-[124px_20px_minmax(0,1fr)] sm:gap-4",
  },
};

export function ChangelogTimelineEntry({
  entry,
  variant,
}: ChangelogTimelineEntryProps) {
  const styles = variantStyles[variant];
  const wrapperClassName = `${baseStyles.wrapper} ${styles.wrapper}`;
  const dateClassName = `${baseStyles.date} ${styles.date}`;
  const markerClassName = `${baseStyles.marker} ${styles.marker}`;
  const titleClassName = `${baseStyles.title} ${styles.title}`;
  const descriptionClassName = `${baseStyles.description} ${styles.description}`;

  const content = (
    <>
      <div className="min-w-0">
        <p className={dateClassName}>
          <CalendarDays
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0"
            strokeWidth={2}
          />
          <span>{entry.date}</span>
        </p>
        <p className={baseStyles.version}>{entry.version}</p>
      </div>

      <div className="flex justify-center">
        <span
          aria-hidden="true"
          className={markerClassName}
          style={{ borderColor: entry.dotColor }}
        />
      </div>

      <div className="min-w-0">
        <p className={titleClassName}>{entry.title}</p>
        <p className={descriptionClassName}>{entry.description}</p>
      </div>
    </>
  );

  return <div className={wrapperClassName}>{content}</div>;
}
