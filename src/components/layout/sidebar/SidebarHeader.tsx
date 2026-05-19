import { MastersetSelector } from "./MastersetSelector";
import { SidebarTitle } from "./SidebarTitle";

export function SidebarHeader() {
  return (
    <section
      aria-label="Sidebar top section"
      className="surface-panel flex h-48 flex-col justify-between gap-4"
    >
      <SidebarTitle />
      <MastersetSelector />
    </section>
  );
}
