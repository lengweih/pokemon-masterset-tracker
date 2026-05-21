import { NavigationLinks } from "./NavigationLinks";
import { ProfileCard } from "./ProfileCard";

export function NavigationPanel() {
  return (
    <section
      aria-label="Navigation panel"
      className="surface-panel flex flex-col justify-between gap-6 h-auto lg:flex-1"
    >
      <NavigationLinks />
      <ProfileCard />
    </section>
  );
}
