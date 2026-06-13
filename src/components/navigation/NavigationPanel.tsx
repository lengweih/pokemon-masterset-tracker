import { NavigationLinks } from "./NavigationLinks";

export function NavigationPanel() {
  return (
    <section
      aria-label="Navigation panel"
      className="surface-panel flex flex-col gap-6 h-auto lg:flex-1"
    >
      <NavigationLinks />
    </section>
  );
}
