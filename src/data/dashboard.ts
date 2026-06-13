import { ROUTES } from "../routes/paths";
import type { CollectionStatsSummary } from "../types/collection";
import type {
  DashboardProgressItem,
  DashboardQuickAction,
  DashboardSummaryStat,
} from "../types/dashboard";

export const getDashboardSummaryStats = (
  stats: CollectionStatsSummary,
): DashboardSummaryStat[] => [
  {
    color: "#2F80FF",
    icon: "award",
    iconBackground: "#EAF3FF",
    label: "Master Set",
    value: `${stats.master.percentage}%`,
    supportingText: `${stats.master.collected} / ${stats.master.total}`,
  },
  {
    color: "#7B61FF",
    icon: "crown",
    iconBackground: "#F1ECFF",
    label: "Grandmaster",
    value: stats.grandmaster.comingSoon
      ? "—"
      : `${stats.grandmaster.percentage}%`,
    supportingText: stats.grandmaster.comingSoon
      ? "Coming soon"
      : `${stats.grandmaster.collected} / ${stats.grandmaster.total}`,
  },
  {
    color: "#10B981",
    icon: "clipboard-check",
    iconBackground: "#E8FAF2",
    label: "Cards Owned",
    value: `${stats.cardsOwned}`,
    supportingText: `${stats.master.collected} unique variants`,
  },
  {
    color: "#F43F5E",
    icon: "grip",
    iconBackground: "#FDEAF0",
    label: "Missing Cards",
    value: `${stats.missingCards}`,
    supportingText: `${stats.master.remaining} variants left`,
  },
];

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
    percentage: stats.grandmaster.comingSoon
      ? "—"
      : `${stats.grandmaster.percentage}%`,
    total: stats.grandmaster.comingSoon
      ? "Coming soon"
      : `${stats.grandmaster.collected} / ${stats.grandmaster.total}`,
    width: stats.grandmaster.comingSoon
      ? "0%"
      : `${stats.grandmaster.percentage}%`,
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
