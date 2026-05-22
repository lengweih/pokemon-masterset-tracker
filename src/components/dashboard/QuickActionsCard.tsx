import {
  ChevronRight,
  CloudUpload,
  Search,
  SquarePlus,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { dashboardQuickActions } from "../../data/dashboard";
import type { DashboardQuickAction } from "../../types/dashboard";
import { DashboardCardHeader } from "./DashboardCardHeader";

const quickActionIcons: Record<DashboardQuickAction["icon"], LucideIcon> = {
  "cloud-upload": CloudUpload,
  search: Search,
  "square-plus": SquarePlus,
};

export function QuickActionsCard() {
  return (
    <article className="surface-card h-full p-6">
      <DashboardCardHeader
        description="Common tasks and tools"
        icon={Zap}
        iconColor="#7B61FF"
        title="Quick Actions"
      />

      <div className="mt-7 grid gap-2 xl:gap-3">
        {dashboardQuickActions.map((action) => {
          const Icon = quickActionIcons[action.icon];

          return (
            <Link
              key={action.label}
              className="inner-ring flex h-[62px] items-center gap-2 rounded-button bg-surface px-3 transition-all duration-180 ease-premium hover:bg-surface-hover"
              to={action.href}
            >
              <Icon
                aria-hidden="true"
                className="h-8 w-8 shrink-0"
                strokeWidth={2}
                style={{ color: action.iconColor }}
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium leading-tight text-text-primary">
                  {action.label}
                </span>
                <span className="mt-1 block truncate text-xs font-medium leading-tight text-text-secondary">
                  {action.description}
                </span>
              </span>
              <ChevronRight
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-text-secondary"
                strokeWidth={2}
              />
            </Link>
          );
        })}
      </div>
    </article>
  );
}
