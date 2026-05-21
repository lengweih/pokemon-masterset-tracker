import type { AppRoute } from "../routes/paths";

export type DashboardSummaryStatIcon =
  | "award"
  | "clipboard-check"
  | "crown"
  | "grip";

export interface DashboardSummaryStat {
  color: string;
  icon: DashboardSummaryStatIcon;
  iconBackground: string;
  label: string;
  supportingText: string;
  value: string;
}

export interface DashboardProgressItem {
  fill: string;
  label: string;
  percentage: string;
  total: string;
  width: string;
}

export type DashboardQuickActionIcon = "cloud-upload" | "search" | "square-plus";

export interface DashboardQuickAction {
  description: string;
  href: AppRoute;
  icon: DashboardQuickActionIcon;
  iconColor: string;
  label: string;
}

export interface DashboardChangelogEntry {
  date: string;
  description: string;
  dotColor: string;
  title: string;
  version: string;
}
