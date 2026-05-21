import { APP_CONFIG } from "../../../config/app";

export function SidebarProfileSection() {
  return (
    <section
      aria-label="Collector profile"
      className="inner-ring flex h-22 items-center gap-4 rounded-card bg-surface p-4"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-xl font-medium leading-none text-white">
        {APP_CONFIG.collector.initials}
      </div>
      <div className="min-w-0">
        <p className="truncate text-lg font-light text-text-primary">
          {APP_CONFIG.collector.name}
        </p>
        <p className="truncate text-sm text-text-secondary">
          {APP_CONFIG.collector.progressLabel}
        </p>
      </div>
    </section>
  );
}
