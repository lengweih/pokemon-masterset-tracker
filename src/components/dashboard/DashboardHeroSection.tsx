import { ArrowRight, LayoutGrid } from "lucide-react";

import { images } from "../../assets/images";
import { ROUTES } from "../../routes/paths";

export function DashboardHeroSection() {
  return (
    <section
      aria-label="Hero section"
      className="relative overflow-hidden rounded-modal border border-border bg-surface shadow-soft-md"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-full xl:block"
      >
        <img
          src={images.heroImage}
          alt=""
          className="absolute -right-12 -top-6 h-auto w-[530px] max-w-none opacity-95"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.64) 8%, #000 18%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.64) 8%, #000 18%)",
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,#fff_42%,rgba(255,255,255,0.82)_54%,rgba(255,255,255,0.28)_68%,rgba(255,255,255,0)_82%)]" />

      <div className="relative z-10 flex h-full max-w-[660px] flex-col px-5 py-5 sm:px-7 sm:py-7 md:px-10 md:py-8">
        <h1 className="max-w-[640px] text-3xl xs:text-[40px] font-bold leading-[1.12] text-text-primary sm:text-[52px]">
          Track your <span className="gradient-text">Prismatic</span>
          <br />
          <span className="gradient-text">Evolutions</span> master set
        </h1>

        <p className="mt-2 xs:mt-4 max-w-[480px] text-sm xs:text-[17px] font-medium leading-[1.55] text-text-secondary">
          Organize, track, and complete your collection with powerful tools
          built for collectors.
        </p>

        <div className="mt-4 xs:mt-8 flex flex-wrap items-center gap-3 xs:gap-6">
          <a
            className="inline-flex h-12 xs:h-14 xs:w-[210px] w-full items-center justify-center gap-3 rounded-button bg-gradient-brand px-7 text-[16px] font-medium text-white transition-all duration-180 ease-premium hover:brightness-[1.03]"
            href={ROUTES.collection}
          >
            <span>View Collection</span>
            <ArrowRight
              aria-hidden="true"
              className="h-5 w-5"
              strokeWidth={2}
            />
          </a>

          <a
            className="inner-ring inline-flex h-12 xs:h-14 xs:w-[210px] w-full items-center justify-center gap-3 rounded-button bg-surface px-7 text-[16px] font-medium text-text-primary transition-all duration-180 ease-premium hover:bg-surface-hover"
            href={ROUTES.collection}
          >
            <LayoutGrid
              aria-hidden="true"
              className="h-5 w-5 text-text-secondary"
              strokeWidth={2}
            />
            <span>Missing Cards</span>
          </a>
        </div>
      </div>
    </section>
  );
}
