import { useState } from "react";
import { ChevronRight, Download, Search, Upload, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { dashboardQuickActions } from "../../data/dashboard";
import { downloadCollectionBackup } from "../../lib/collectionBackup";
import type { DashboardQuickAction } from "../../types/dashboard";
import { DashboardCardHeader } from "./DashboardCardHeader";
import { ImportCollectionModal } from "./ImportCollectionModal";

const quickActionIcons: Record<DashboardQuickAction["icon"], LucideIcon> = {
  download: Download,
  search: Search,
  upload: Upload,
};

const actionRowClass =
  "inner-ring flex h-[62px] items-center gap-2 rounded-button bg-surface px-3 text-left transition-all duration-180 ease-premium hover:bg-surface-hover";

export function QuickActionsCard() {
  const [isImportOpen, setIsImportOpen] = useState(false);

  const renderActionContent = (action: DashboardQuickAction) => {
    const Icon = quickActionIcons[action.icon];

    return (
      <>
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
      </>
    );
  };

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
          if (action.kind === "link" && action.href) {
            return (
              <Link
                key={action.label}
                className={actionRowClass}
                to={action.href}
              >
                {renderActionContent(action)}
              </Link>
            );
          }

          const handleClick =
            action.kind === "export-backup"
              ? downloadCollectionBackup
              : () => {
                  setIsImportOpen(true);
                };

          return (
            <button
              key={action.label}
              className={actionRowClass}
              type="button"
              onClick={handleClick}
            >
              {renderActionContent(action)}
            </button>
          );
        })}
      </div>

      {isImportOpen ? (
        <ImportCollectionModal
          onClose={() => {
            setIsImportOpen(false);
          }}
        />
      ) : null}
    </article>
  );
}
