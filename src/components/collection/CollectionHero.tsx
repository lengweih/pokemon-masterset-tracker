import type { CollectionProgress } from "../../types/collection";

interface CollectionHeroProps {
  progress: CollectionProgress;
}

const CIRCLE_RADIUS = 46;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

export function CollectionHero({ progress }: CollectionHeroProps) {
  const progressStrokeOffset =
    CIRCLE_CIRCUMFERENCE * (1 - progress.percentage / 100);

  return (
    <section
      aria-labelledby="collection-title"
      className="surface-card p-6 sm:p-8"
    >
      <div className="grid items-start gap-5 xs:grid-cols-[minmax(0,1fr)_auto] xs:gap-6">
        <div className="min-w-0 max-w-3xl">
          <p className="text-label uppercase tracking-[0.18em] text-brand-blue">
            Collection
          </p>
          <h1
            id="collection-title"
            className="gradient-text mt-1 text-3xl font-bold leading-tight xs:text-[38px] sm:text-[42px]"
          >
            Prismatic Evolutions
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-[1.6] text-text-secondary xs:text-body">
            Add cards to your collection and track your progress.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-self-start gap-3 self-start xs:justify-self-end xs:self-center xs:gap-4 sm:flex-nowrap sm:gap-5">
          <div
            aria-label={`${progress.percentage}% complete`}
            className="relative flex h-24 w-24 shrink-0 items-center justify-center xs:h-28 xs:w-28"
            role="img"
          >
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
                strokeWidth="8"
              />
              <circle
                cx="56"
                cy="56"
                fill="none"
                r={CIRCLE_RADIUS}
                stroke="url(#collection-progress-gradient)"
                strokeDasharray={CIRCLE_CIRCUMFERENCE}
                strokeDashoffset={progressStrokeOffset}
                strokeLinecap="round"
                strokeWidth="8"
              />
            </svg>

            <div className="absolute inset-0 grid place-items-center text-center">
              <p className="w-full ml-1.5 text-xl font-semibold leading-none text-text-primary tabular-nums xs:text-[22px]">
                {progress.percentage}%
              </p>
            </div>
          </div>

          <dl className="grid min-w-[84px] gap-3 xs:min-w-[90px]">
            <div>
              <dt className="text-[13px] font-semibold leading-[1.35] text-text-secondary">
                Collected
              </dt>
              <dd className="mt-1.5 text-base font-semibold leading-none text-text-primary">
                {progress.collected} / {progress.total}
              </dd>
            </div>

            <div className="h-px bg-border-strong" />

            <div>
              <dt className="text-[13px] font-semibold leading-[1.35] text-text-secondary">
                Remaining
              </dt>
              <dd className="mt-1.5 text-base font-semibold leading-none text-text-primary">
                {progress.remaining}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
