import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface PageHeaderProps {
  description: string;
  eyebrow: string;
  icon: LucideIcon;
  title: string;
  titleId?: string;
  children?: ReactNode;
}

export function PageHeader({
  children,
  description,
  eyebrow,
  icon: Icon,
  title,
  titleId,
}: PageHeaderProps) {
  return (
    <section
      aria-labelledby={titleId}
      className="surface-card relative p-6 sm:p-8"
    >
      <div className="max-w-2xl pr-16 xs:pr-20 sm:pr-24">
        <p className="text-label uppercase tracking-[0.18em] text-brand-blue">
          {eyebrow}
        </p>
        <h1
          id={titleId}
          className="gradient-text mt-1 text-3xl font-bold leading-tight xs:text-[38px] sm:text-[42px]"
        >
          {title}
        </h1>
        <p className="mt-3 max-w-xl text-sm font-medium leading-[1.6] text-text-secondary xs:text-body">
          {description}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="inner-ring absolute right-6 top-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-button bg-primary-light text-brand-blue sm:right-8 sm:top-8"
      >
        <Icon className="h-7 w-7" strokeWidth={2} />
      </div>

      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
}
