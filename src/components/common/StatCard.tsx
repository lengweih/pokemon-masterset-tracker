import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  // Provide either a lucide icon (rendered in the standard brand chip) or a
  // custom leading element (e.g. a progress ring) sized to the chip footprint.
  icon?: LucideIcon;
  leading?: ReactNode;
  className?: string;
}

export function StatCard({
  className = "",
  icon: Icon,
  label,
  leading,
  value,
}: StatCardProps) {
  return (
    <article
      aria-label={`${label}: ${value}`}
      className={[
        "inner-ring flex h-24 items-center gap-4 rounded-card bg-surface p-4",
        className,
      ].join(" ")}
    >
      {leading ?? (
        Icon ? (
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-light text-brand-blue">
            <Icon aria-hidden="true" className="h-7 w-7" strokeWidth={2} />
          </span>
        ) : null
      )}

      <div className="min-w-0">
        <h2 className="text-[13px] font-semibold leading-[1.35] text-text-primary">
          {label}
        </h2>
        <p className="mt-1 text-[30px] font-semibold leading-none text-brand-blue">
          {value}
        </p>
      </div>
    </article>
  );
}
