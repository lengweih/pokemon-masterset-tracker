import type { LucideIcon } from "lucide-react";

import { PageHeader } from "../common/PageHeader";

interface PagePlaceholderProps {
  description: string;
  eyebrow: string;
  icon: LucideIcon;
  title: string;
}

export function PagePlaceholder({
  description,
  eyebrow,
  icon: Icon,
  title,
}: PagePlaceholderProps) {
  return (
    <section className="grid w-full self-start gap-3">
      <PageHeader
        description={description}
        eyebrow={eyebrow}
        icon={Icon}
        title={title}
      />

      <div className="surface-card grid gap-2 p-6">
        <p className="text-base font-semibold leading-[1.4] text-text-primary xs:text-card">
          Content Title
        </p>
        <p className="max-w-2xl text-sm font-medium leading-[1.6] text-text-secondary xs:text-body">
          Content to be added
        </p>
      </div>
    </section>
  );
}
