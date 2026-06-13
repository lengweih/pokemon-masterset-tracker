import { APP_CONFIG } from "../../config/app";
import { useCollectionStats } from "../../contexts/CollectionStatsContext";

export function ProfileCard() {
  const stats = useCollectionStats();

  return (
    <section
      aria-label="Collector profile"
      className="inner-ring flex h-22 items-center gap-4 rounded-card bg-surface p-4"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-xl font-medium leading-none text-white">
        {APP_CONFIG.collector.initials}
      </div>
      <div className="min-w-0">
        <p className="truncate text-[16px] font-light text-text-primary">
          {APP_CONFIG.collector.name}
        </p>
        <p className="truncate text-[13px] text-text-secondary">
          {stats.master.percentage}% Complete
        </p>
      </div>
    </section>
  );
}
