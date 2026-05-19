import { SidebarNavigationTabs } from "./SidebarNavigationTabs";
import { SidebarProfileSection } from "./SidebarProfileSection";

export function SidebarNavigationPanel() {
  return (
    <section
      aria-label="Sidebar navigation section"
      className="surface-panel flex h-96 flex-col justify-between gap-6 lg:h-auto lg:flex-1"
    >
      <SidebarNavigationTabs />
      <SidebarProfileSection />
    </section>
  );
}
