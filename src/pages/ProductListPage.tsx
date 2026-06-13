import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Package } from "lucide-react";

import { PageHeader } from "../components/common/PageHeader";
import { ProductCard } from "../components/product/ProductCard";
import { ProductSummaryCard } from "../components/product/ProductSummaryCard";
import {
  DataViewToolbar,
  type DataViewSortOption,
} from "../components/ui/DataViewToolbar";
import { Pagination } from "../components/ui/Pagination";
import { products } from "../data/products";
import { usePagination } from "../hooks/usePagination";
import {
  THREE_COLUMN_CARD_GRID,
  useResponsiveGridPageSize,
} from "../hooks/useResponsiveGridPageSize";
import type { Product, ProductSortOption } from "../types/product";

const productViewEnterTransition = {
  duration: 0.3,
  ease: [0.64, 0, 0.78, 0],
} as const;

const productSortOptions = [
  {
    label: "A-Z",
    value: "name-asc",
  },
  {
    label: "Z-A",
    value: "name-desc",
  },
  {
    label: "Newest",
    value: "release-newest",
  },
  {
    label: "Oldest",
    value: "release-oldest",
  },
] satisfies readonly DataViewSortOption<ProductSortOption>[];

const sortProducts = (
  productsToSort: readonly Product[],
  sortOption: ProductSortOption,
) => {
  return [...productsToSort].sort((firstProduct, secondProduct) => {
    if (sortOption === "name-desc") {
      return secondProduct.name.localeCompare(firstProduct.name);
    }

    if (sortOption === "release-newest") {
      return secondProduct.releaseDate.localeCompare(firstProduct.releaseDate);
    }

    if (sortOption === "release-oldest") {
      return firstProduct.releaseDate.localeCompare(secondProduct.releaseDate);
    }

    return firstProduct.name.localeCompare(secondProduct.name);
  });
};

export function ProductListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<ProductSortOption>("name-asc");
  const { gridClass, pageSize } =
    useResponsiveGridPageSize(THREE_COLUMN_CARD_GRID);

  const visibleProducts = useMemo(() => {
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();
    const searchedProducts =
      normalizedSearchQuery.length === 0
        ? products
        : products.filter((product) => {
            const searchableText = [product.name, product.releaseLabel].join(
              " ",
            );

            return searchableText.toLowerCase().includes(normalizedSearchQuery);
          });

    return sortProducts(searchedProducts, sortOption);
  }, [searchQuery, sortOption]);

  const pagination = usePagination({
    items: visibleProducts,
    pageSize,
  });
  const gridPlaceholderCount =
    pagination.totalPages > 1
      ? Math.max(pagination.pageSize - pagination.currentItems.length, 0)
      : 0;

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    pagination.goToPage(1);
  };

  const handleSortChange = (value: ProductSortOption) => {
    setSortOption(value);
    pagination.goToPage(1);
  };

  return (
    <section className="grid w-full self-start gap-3 lg:h-full lg:min-h-0 lg:self-stretch lg:grid-rows-[auto_minmax(0,1fr)]">
      <PageHeader
        description="Browse all related products for Prismatic Evolutions."
        eyebrow="Product List"
        icon={Package}
        title="Product List"
        titleId="product-list-title"
      >
        <div className="lg:max-w-[270px]">
          <ProductSummaryCard totalProducts={products.length} />
        </div>
      </PageHeader>

      <div className="surface-card grid gap-5 p-4 sm:p-6 lg:min-h-0 lg:grid-rows-[auto_minmax(0,1fr)_auto]">
        <DataViewToolbar
          searchInputId="product-search"
          searchLabel="Search products"
          searchPlaceholder="Search products..."
          searchValue={searchQuery}
          sortLabel="Sort"
          sortOptions={productSortOptions}
          sortSelectId="product-sort"
          sortValue={sortOption}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
        />

        {pagination.currentItems.length > 0 ? (
          <motion.div
            key={pagination.currentPage}
            initial={{ opacity: 0.82 }}
            animate={{ opacity: 1 }}
            className={gridClass}
            transition={productViewEnterTransition}
          >
            {pagination.currentItems.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={productViewEnterTransition}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
            {Array.from({ length: gridPlaceholderCount }, (_, index) => (
              <div
                key={`product-placeholder-${index}`}
                aria-hidden="true"
                className="invisible h-56 w-full rounded-card sm:h-64 xl:h-60"
              />
            ))}
          </motion.div>
        ) : (
          <div className="empty-state lg:h-full">
            <p className="text-card text-text-primary">No products found</p>
            <p className="max-w-md text-sm font-medium text-text-secondary">
              Try a different search term or clear the search field to view all
              products.
            </p>
          </div>
        )}

        <Pagination
          currentPage={pagination.currentPage}
          itemName="product"
          pageSize={pagination.pageSize}
          totalItems={pagination.totalItems}
          totalPages={pagination.totalPages}
          onPageChange={pagination.goToPage}
        />
      </div>
    </section>
  );
}

export default ProductListPage;
