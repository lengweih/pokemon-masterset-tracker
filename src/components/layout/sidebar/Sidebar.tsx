import { SidebarHeader } from "./SidebarHeader";
import { SidebarNavigationPanel } from "./SidebarNavigationPanel";

export function Sidebar() {
  return (
    <aside aria-label="App sidebar" className="flex h-full flex-col gap-3">
      <SidebarHeader />
      <SidebarNavigationPanel />
    </aside>
  );
}
