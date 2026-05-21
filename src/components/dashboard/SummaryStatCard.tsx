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
      className="surface-card flex items-center justify-center px-5 py-5 h-48 xl:h-[130px] xl:justify-start"
    >
      <div className="flex flex-col items-center justify-center gap-2 xl:flex-row xl:items-start xl:justify-start xl:gap-4 2xl:gap-5">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full lg:h-16 lg:w-16"
          style={{
            backgroundColor: stat.iconBackground,
            color: stat.color,
          }}
        >
          <Icon
            aria-hidden="true"
            className="h-7 w-7 lg:h-8 lg:w-8"
            strokeWidth={2}
          />
        </div>

        <div className="min-w-0 text-center xl:text-left">
          <h2 className="whitespace-nowrap text-[15px] font-medium text-text-primary sm:text-[16px]">
            {stat.label}
          </h2>
          <p
            className="mt-1 whitespace-nowrap text-[30px] font-semibold leading-none sm:text-[32px]"
            style={{ color: stat.color }}
          >
            {stat.value}
          </p>
          <p className="mt-2 whitespace-nowrap text-[12.5px] font-medium text-text-secondary 2xl:text-sm">
            {stat.supportingText}
          </p>
        </div>
      </div>
    </article>
  );
}
