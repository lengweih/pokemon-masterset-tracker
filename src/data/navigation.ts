import { ROUTES } from "../routes/paths";
import type { AppRoute } from "../routes/paths";

export type NavigationIcon =
  | "heart"
  | "layout-dashboard"
  | "library"
  | "package";

export interface NavigationLink {
  href: AppRoute;
  icon: NavigationIcon;
  isActive?: boolean;
  label: string;
}

export const navigationLinks: NavigationLink[] = [
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
