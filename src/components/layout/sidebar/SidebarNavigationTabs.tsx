import { Heart, LayoutDashboard, Library, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { sidebarNavigationTabs } from "../../../data/navigation";
import type { SidebarNavigationTab } from "../../../data/navigation";

const navigationIcons: Record<SidebarNavigationTab["icon"], LucideIcon> = {
  heart: Heart,
  "layout-dashboard": LayoutDashboard,
  library: Library,
  package: Package,
};

export function SidebarNavigationTabs() {
  return (
    <nav aria-label="Sidebar navigation tabs" className="grid gap-2">
      {sidebarNavigationTabs.map((tab) => {
        const Icon = navigationIcons[tab.icon];

        return (
          <a
            key={tab.label}
            aria-current={tab.isActive ? "page" : undefined}
            className={[
              "flex h-14 items-center gap-4 rounded-button px-4 text-body font-medium leading-none transition-all duration-180 ease-premium",
              tab.isActive
                ? "inner-ring bg-primary-light text-brand-blue"
                : "text-text-secondary hover:bg-surface-hover hover:text-text-primary",
            ].join(" ")}
            href={tab.href}
          >
            <Icon
              aria-hidden="true"
              className="h-6 w-6 shrink-0"
              strokeWidth={2}
            />
            <span>{tab.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
