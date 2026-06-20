import { ROUTES } from "../routes/paths";
import type { CollectionStatsSummary } from "../types/collection";
import type {
  DashboardProgressItem,
  DashboardQuickAction,
} from "../types/dashboard";

export const getDashboardProgressItems = (
  stats: CollectionStatsSummary,
): DashboardProgressItem[] => [
  {
    fill: "linear-gradient(90deg, #2F80FF 0%, #06B6D4 100%)",
    label: "Master Set Progress",
    percentage: `${stats.master.percentage}%`,
    total: `${stats.master.collected} / ${stats.master.total}`,
    width: `${stats.master.percentage}%`,
  },
  {
    fill: "linear-gradient(90deg, #7B61FF 0%, #C061FF 100%)",
    label: "Grandmaster Set Progress",
    percentage: `${stats.grandmaster.percentage}%`,
    total: `${stats.grandmaster.collected} / ${stats.grandmaster.total}`,
    width: `${stats.grandmaster.percentage}%`,
  },
];

export const dashboardQuickActions: DashboardQuickAction[] = [
  {
    description: "Load a saved collection",
    icon: "upload",
    iconColor: "#7B61FF",
    kind: "import-collection",
    label: "Import Collection",
  },
  {
    description: "Download your collection",
    icon: "download",
    iconColor: "#7B61FF",
    kind: "export-backup",
    label: "Export Backup",
  },
  {
    description: "See all missing cards",
    href: `${ROUTES.collection}?ownership=missing`,
    icon: "search",
    iconColor: "#2F80FF",
    kind: "link",
    label: "View Missing Cards",
  },
];
