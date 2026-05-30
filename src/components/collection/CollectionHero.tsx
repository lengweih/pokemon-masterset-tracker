import { ClipboardCheck, Library } from "lucide-react";

import { PageHeader } from "../common/PageHeader";
import { StatCard } from "../common/StatCard";
import type { CollectionProgress } from "../../types/collection";

interface CollectionHeroProps {
  progress: CollectionProgress;
}

const CIRCLE_RADIUS = 46;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

function ProgressRing({ percentage }: { percentage: number }) {
  const strokeOffset = CIRCLE_CIRCUMFERENCE * (1 - percentage / 100);

  return (
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 112 112"
      >
        <defs>
          <linearGradient
            id="collection-progress-gradient"
            x1="18"
            x2="94"
            y1="94"
            y2="18"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7B61FF" />
            <stop offset="1" stopColor="#C061FF" />
          </linearGradient>
        </defs>
        <circle
          cx="56"
          cy="56"
          fill="none"
          r={CIRCLE_RADIUS}
          stroke="#EEF2F8"
          strokeWidth="10"
        />
        <circle
          cx="56"
          cy="56"
          fill="none"
          r={CIRCLE_RADIUS}
          stroke="url(#collection-progress-gradient)"
          strokeDasharray={CIRCLE_CIRCUMFERENCE}
          strokeDashoffset={strokeOffset}
          strokeLinecap="round"
          strokeWidth="10"
        />
      </svg>
    </div>
  );
}

export function CollectionHero({ progress }: CollectionHeroProps) {
  return (
    <PageHeader
      description="Add cards to your collection and track your progress."
      eyebrow="Collection"
      icon={Library}
      title="Prismatic Evolutions"
      titleId="collection-title"
    >
      <div className="flex flex-col gap-3 xs:flex-row">
        <StatCard
          className="xs:flex-1 lg:w-[270px] lg:flex-none"
          label="Progress"
          leading={<ProgressRing percentage={progress.percentage} />}
          value={`${progress.percentage}%`}
        />
        <StatCard
          className="xs:flex-1 lg:w-[270px] lg:flex-none"
          icon={ClipboardCheck}
          label="Cards Owned"
          value={`${progress.collected} / ${progress.total}`}
        />
      </div>
    </PageHeader>
  );
}
