import type { LucideIcon } from "lucide-react";

interface DashboardSectionHeaderProps {
  description: string;
  icon: LucideIcon;
  iconColor: string;
  title: string;
}

export function DashboardSectionHeader({
  description,
  icon: Icon,
  iconColor,
  title,
}: DashboardSectionHeaderProps) {
  return (
    <div className="flex items-start gap-4">
      <Icon
        aria-hidden="true"
        className="h-8 w-8 shrink-0 mt-1"
        strokeWidth={2}
        style={{ color: iconColor }}
      />
      <div className="min-w-0">
        <h2 className="truncate text-[16px] font-medium text-text-primary">
          {title}
        </h2>
        <p className="mt-1 truncate text-[12.5px] font-medium text-text-secondary">
          {description}
        </p>
      </div>
    </div>
  );
}
