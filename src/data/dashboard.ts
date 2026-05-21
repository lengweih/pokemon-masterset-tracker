import { ROUTES } from "../routes/paths";
import type {
  DashboardProgressItem,
  DashboardQuickAction,
  DashboardSummaryStat,
} from "../types/dashboard";

export const dashboardSummaryStats: DashboardSummaryStat[] = [
  {
    color: "#2F80FF",
    icon: "award",
    iconBackground: "#EAF3FF",
    label: "Master Set",
    value: "72%",
    supportingText: "739 / 1,025",
  },
  {
    color: "#7B61FF",
    icon: "crown",
    iconBackground: "#F1ECFF",
    label: "Grandmaster",
    value: "41%",
    supportingText: "419 / 1,025",
  },
  {
    color: "#10B981",
    icon: "clipboard-check",
    iconBackground: "#E8FAF2",
    label: "Cards Owned",
    value: "156",
    supportingText: "156 unique cards",
  },
  {
    color: "#F43F5E",
    icon: "grip",
    iconBackground: "#FDEAF0",
    label: "Missing Cards",
    value: "84",
    supportingText: "Across 37 variants",
  },
];

export const dashboardProgressItems: DashboardProgressItem[] = [
  {
    fill: "linear-gradient(90deg, #2F80FF 0%, #06B6D4 100%)",
    label: "Master Set Progress",
    percentage: "72%",
    total: "739 / 1,025",
    width: "72%",
  },
  {
    fill: "linear-gradient(90deg, #7B61FF 0%, #C061FF 100%)",
    label: "Grandmaster Set Progress",
    percentage: "41%",
    total: "419 / 1,025",
    width: "41%",
  },
];

export const dashboardQuickActions: DashboardQuickAction[] = [
  {
    description: "Add cards to your collection",
    href: ROUTES.collection,
    icon: "square-plus",
    iconColor: "#7B61FF",
    label: "Quick Add",
  },
  {
    description: "Save your collection data",
    href: ROUTES.home,
    icon: "cloud-upload",
    iconColor: "#7B61FF",
    label: "Export Backup",
  },
  {
    description: "See all missing cards & variants",
    href: ROUTES.collection,
    icon: "search",
    iconColor: "#2F80FF",
    label: "View Needed Cards",
  },
];
