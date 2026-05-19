import { BlankSection } from "../../ui/BlankSection";

const navigationTabLabels = [
  "Dashboard navigation tab",
  "Collection navigation tab",
  "Wishlist navigation tab",
  "Product list navigation tab",
] as const;

export function SidebarNavigationTabs() {
  return (
    <nav aria-label="Sidebar navigation tabs" className="grid gap-3">
      {navigationTabLabels.map((label) => (
        <BlankSection
          key={label}
          ariaLabel={label}
          className="h-14"
          element="div"
          variant="card"
        />
      ))}
    </nav>
  );
}
