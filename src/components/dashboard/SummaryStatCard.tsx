import { Award, ClipboardCheck, Crown, Grip } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { DashboardSummaryStat } from "../../types/dashboard";

const summaryStatIcons: Record<DashboardSummaryStat["icon"], LucideIcon> = {
  award: Award,
  "clipboard-check": ClipboardCheck,
  crown: Crown,
  grip: Grip,
};

interface SummaryStatCardProps {
  stat: DashboardSummaryStat;
}

export function SummaryStatCard({ stat }: SummaryStatCardProps) {
  const Icon = summaryStatIcons[stat.icon];

  return (
    <article
      aria-label={`${stat.label}: ${stat.value}`}
      className="surface-card flex h-[148px] items-center px-6 py-5"
    >
      <div className="flex items-start gap-5 xl:gap-4 2xl:gap-5">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full xl:h-14 xl:w-14 2xl:h-16 2xl:w-16"
          style={{
            backgroundColor: stat.iconBackground,
            color: stat.color,
          }}
        >
          <Icon
            aria-hidden="true"
            className="h-8 w-8 xl:h-7 xl:w-7 2xl:h-8 2xl:w-8"
            strokeWidth={2}
          />
        </div>

        <div className="min-w-0">
          <h2 className="whitespace-nowrap text-[16px] font-medium text-text-primary">
            {stat.label}
          </h2>
          <p
            className="mt-1 whitespace-nowrap text-[32px] font-semibold leading-none"
            style={{ color: stat.color }}
          >
            {stat.value}
          </p>
          <p className="mt-4 whitespace-nowrap text-sm xl:text-[12.5px] 2xl:text-sm font-medium text-text-secondary">
            {stat.supportingText}
          </p>
        </div>
      </div>
    </article>
  );
}
