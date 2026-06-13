import type { Product } from "../../types/product";
import { ProductPromoBadge } from "./ProductPromoBadge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex h-56 w-full flex-col rounded-card border border-border bg-surface p-3 transition-colors duration-180 ease-premium hover:border-border-strong hover:bg-surface-hover sm:h-64 xl:h-60">
      {/* Dedicated top row for the info icon so it never overlaps the image. */}
      <div className="mb-1 flex h-5 shrink-0 items-center justify-end">
        {product.promos ? <ProductPromoBadge promos={product.promos} /> : null}
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center">
        <img
          alt={product.imageAlt}
          className="max-h-full max-w-full object-contain"
          src={product.imageUrl}
        />
      </div>

      <div className="mt-2 shrink-0">
        <h2 className="line-clamp-2 text-xs font-semibold leading-[1.35] text-text-primary sm:text-[15px]">
          {product.name}
        </h2>
        <p className="mt-1 text-[11px] font-medium leading-[1.5] text-text-secondary sm:text-sm">
          {product.releaseLabel}
        </p>
      </div>
    </article>
  );
}
