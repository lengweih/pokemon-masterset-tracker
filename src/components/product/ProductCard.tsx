import type { Product, ProductViewMode } from "../../types/product";

interface ProductCardProps {
  product: Product;
  viewMode: ProductViewMode;
}

export function ProductCard({ product, viewMode }: ProductCardProps) {
  if (viewMode === "list") {
    return (
      <article className="flex h-32 w-full rounded-card border border-border bg-surface p-3 transition-colors duration-180 ease-premium hover:border-border-strong hover:bg-surface-hover sm:h-36">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="flex h-full w-28 shrink-0 items-center justify-center sm:w-36">
            <img
              alt={product.imageAlt}
              className="max-h-full w-full object-contain"
              src={product.imageUrl}
            />
          </div>

          <div className="min-w-0">
            <h2 className="line-clamp-2 text-[15px] font-semibold leading-[1.35] text-text-primary sm:text-card">
              {product.name}
            </h2>
            <p className="mt-1 text-sm font-medium leading-[1.5] text-text-secondary">
              {product.releaseLabel}
            </p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex h-60 w-full flex-col rounded-card border border-border bg-surface p-3 transition-colors duration-180 ease-premium hover:border-border-strong hover:bg-surface-hover sm:h-64 xl:h-60">
      <div className="flex h-36 shrink-0 items-center justify-center p-1 sm:h-40 xl:h-36">
        <img
          alt={product.imageAlt}
          className="max-h-full w-full object-contain"
          src={product.imageUrl}
        />
      </div>

      <div className="mt-auto">
        <h2 className="line-clamp-2 text-[15px] font-semibold leading-[1.35] text-text-primary">
          {product.name}
        </h2>
        <p className="mt-1 text-sm font-medium leading-[1.5] text-text-secondary">
          {product.releaseLabel}
        </p>
      </div>
    </article>
  );
}
