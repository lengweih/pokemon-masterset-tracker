import { ChartNoAxesCombined } from "lucide-react";

import { getDashboardProgressItems } from "../../data/dashboard";
import { useCollectionStats } from "../../hooks/useCollectionStats";
import { DashboardCardHeader } from "./DashboardCardHeader";

export function ProgressOverviewCard() {
  const stats = useCollectionStats();
  const progressItems = getDashboardProgressItems(stats);

  return (
    <article className="surface-card h-full p-6">
      <DashboardCardHeader
        description="Your collection progress at a glance"
        icon={ChartNoAxesCombined}
        iconColor="#7B61FF"
        title="Progress Overview"
      />

      <div className="mt-7 grid gap-10">
        {progressItems.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium leading-none text-text-primary">
                {item.label}
              </p>
              <p className="text-[20px] font-semibold leading-none text-text-primary">
                {item.percentage}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-[minmax(0,1fr)_94px] items-center">
              <div className="h-3 overflow-hidden rounded-pill bg-progress-track">
                <div
                  className="h-full rounded-pill"
                  style={{ background: item.fill, width: item.width }}
                />
              </div>
              <p className="text-right text-sm font-medium leading-none text-text-secondary">
                {item.total}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
