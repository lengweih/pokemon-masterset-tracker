export interface DashboardProgressItem {
  fill: string;
  label: string;
  percentage: string;
  total: string;
  width: string;
}

export type DashboardQuickActionIcon = "download" | "search" | "upload";

export type DashboardQuickActionKind =
  | "import-collection"
  | "export-backup"
  | "link";

export interface DashboardQuickAction {
  description: string;
  icon: DashboardQuickActionIcon;
  iconColor: string;
  kind: DashboardQuickActionKind;
  label: string;
  // Only used when kind is "link".
  href?: string;
}
