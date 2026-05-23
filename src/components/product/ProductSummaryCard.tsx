import { Package } from "lucide-react";

interface ProductSummaryCardProps {
  totalProducts: number;
}

export function ProductSummaryCard({ totalProducts }: ProductSummaryCardProps) {
  return (
    <article
      aria-label={`Total products: ${totalProducts}`}
      className="inner-ring flex items-center gap-4 rounded-card bg-surface p-4 h-24"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-light text-brand-blue">
        <Package aria-hidden="true" className="h-7 w-7" strokeWidth={2} />
      </div>

      <div className="min-w-0">
        <h2 className="text-[13px] font-semibold leading-[1.35] text-text-primary">
          Total Products
        </h2>
        <p className="mt-1 text-[30px] font-semibold leading-none text-brand-blue">
          {totalProducts}
        </p>
      </div>
    </article>
  );
}
