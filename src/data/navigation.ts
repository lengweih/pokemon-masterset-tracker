import { ROUTES } from "../routes/paths";
import type { AppRoute } from "../routes/paths";

export type SidebarNavigationIcon =
  | "heart"
  | "layout-dashboard"
  | "library"
  | "package";

export interface SidebarNavigationTab {
  href: AppRoute;
  icon: SidebarNavigationIcon;
  isActive?: boolean;
  label: string;
}

export const sidebarNavigationTabs: SidebarNavigationTab[] = [
  {
    href: ROUTES.home,
    icon: "layout-dashboard",
    isActive: true,
    label: "Dashboard",
  },
  { href: ROUTES.collection, icon: "library", label: "Collection" },
  { href: ROUTES.wishlist, icon: "heart", label: "Wishlist" },
  { href: ROUTES.products, icon: "package", label: "Product List" },
];
