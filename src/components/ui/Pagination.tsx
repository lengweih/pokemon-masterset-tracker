import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  itemName: string;
  onPageChange: (page: number) => void;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

type PaginationItem = number | "ellipsis-start" | "ellipsis-end";
type PaginationSlotCount = 5 | 7;

const getPaginationItems = (
  currentPage: number,
  totalPages: number,
  slotCount: PaginationSlotCount,
): PaginationItem[] => {
  if (totalPages <= slotCount) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (slotCount === 7) {
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "ellipsis-end", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "ellipsis-start",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "ellipsis-start",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis-end",
      totalPages,
    ];
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "ellipsis-end", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis-start", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "ellipsis-start", currentPage, "ellipsis-end", totalPages];
};

interface PaginationItemsProps {
  items: PaginationItem[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

function PaginationItems({
  currentPage,
  items,
  onPageChange,
}: PaginationItemsProps) {
  return (
    <>
      {items.map((item) => {
        if (typeof item !== "number") {
          return (
            <span
              key={item}
              aria-hidden="true"
              className="flex h-8 w-7 items-center justify-center text-sm font-semibold text-text-secondary 2xs:h-9 2xs:w-8"
            >
              ...
            </span>
          );
        }

        const isCurrentPage = item === currentPage;

        return (
          <button
            key={item}
            aria-current={isCurrentPage ? "page" : undefined}
            aria-label={`Page ${item}`}
            className={[
              "flex h-8 w-7 items-center justify-center rounded-lg border text-sm font-semibold 2xs:h-9 2xs:w-8",
              isCurrentPage
                ? "border-transparent bg-primary text-white"
                : "border-border-strong bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary",
            ].join(" ")}
            type="button"
            onClick={() => {
              onPageChange(item);
            }}
          >
            {item}
          </button>
        );
      })}
    </>
  );
}

export function Pagination({
  currentPage,
  itemName,
  onPageChange,
  pageSize,
  totalItems,
  totalPages,
}: PaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const pluralItemName = totalItems === 1 ? itemName : `${itemName}s`;
  const compactPaginationItems = getPaginationItems(currentPage, totalPages, 5);
  const expandedPaginationItems = getPaginationItems(
    currentPage,
    totalPages,
    7,
  );

  return (
    <div className="flex flex-col items-center gap-3 border-t border-border pt-5 text-center sm:flex-row sm:justify-between sm:text-left">
      <p className="text-sm font-medium text-text-secondary">
        {totalItems === 0
          ? `Showing 0 ${pluralItemName}`
          : `Showing ${startItem} to ${endItem} of ${totalItems} ${pluralItemName}`}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1 xs:gap-2 sm:justify-end">
        <button
          aria-label="Previous page"
          className="flex h-8 w-7 items-center justify-center rounded-lg border border-border-strong bg-surface text-text-secondary transition-all duration-180 ease-premium hover:bg-surface-hover hover:text-text-primary disabled:opacity-45 2xs:h-9 2xs:w-8"
          disabled={currentPage <= 1}
          type="button"
          onClick={() => {
            onPageChange(currentPage - 1);
          }}
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
        </button>

        <div className="flex items-center gap-1 2xs:hidden">
          <PaginationItems
            currentPage={currentPage}
            items={compactPaginationItems}
            onPageChange={onPageChange}
          />
        </div>

        <div className="hidden items-center gap-1 2xs:flex xs:gap-2">
          <PaginationItems
            currentPage={currentPage}
            items={expandedPaginationItems}
            onPageChange={onPageChange}
          />
        </div>

        <button
          aria-label="Next page"
          className="flex h-8 w-7 items-center justify-center rounded-lg border border-border-strong bg-surface text-text-secondary transition-all duration-180 ease-premium hover:bg-surface-hover hover:text-text-primary disabled:opacity-45 2xs:h-9 2xs:w-8"
          disabled={currentPage >= totalPages}
          type="button"
          onClick={() => {
            onPageChange(currentPage + 1);
          }}
        >
          <ChevronRight
            aria-hidden="true"
            className="h-5 w-5"
            strokeWidth={2}
          />
        </button>
      </div>
    </div>
  );
}
