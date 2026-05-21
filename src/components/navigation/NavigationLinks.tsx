import { Heart, LayoutDashboard, Library, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { navigationLinks } from "../../data/navigation";
import type { NavigationLink } from "../../data/navigation";

const navigationIcons: Record<NavigationLink["icon"], LucideIcon> = {
  heart: Heart,
  "layout-dashboard": LayoutDashboard,
  library: Library,
  package: Package,
};

export function NavigationLinks() {
  return (
    <nav aria-label="Primary navigation" className="grid gap-2">
      {navigationLinks.map((link) => {
        const Icon = navigationIcons[link.icon];

        return (
          <a
            key={link.label}
            aria-current={link.isActive ? "page" : undefined}
            className={[
              "flex h-14 items-center gap-4 rounded-button px-4 text-body font-medium leading-none transition-all duration-180 ease-premium",
              link.isActive
                ? "inner-ring bg-primary-light text-brand-blue"
                : "text-text-secondary hover:bg-surface-hover hover:text-text-primary",
            ].join(" ")}
            href={link.href}
          >
            <Icon
              aria-hidden="true"
              className="h-6 w-6 shrink-0"
              strokeWidth={2}
            />
            <span>{link.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
