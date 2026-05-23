import { useCallback, useMemo, useState } from "react";

interface UsePaginationOptions<TItem> {
  initialPage?: number;
  items: readonly TItem[];
  pageSize: number;
}

export function usePagination<TItem>({
  initialPage = 1,
  items,
  pageSize,
}: UsePaginationOptions<TItem>) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const getClampedPage = useCallback(
    (page: number) => Math.min(Math.max(page, 1), totalPages),
    [totalPages],
  );

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(getClampedPage(page));
    },
    [getClampedPage],
  );

  const clampedCurrentPage = getClampedPage(currentPage);
  const startIndex =
    totalItems === 0 ? 0 : (clampedCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const currentItems = useMemo(
    () => items.slice(startIndex, endIndex),
    [endIndex, items, startIndex],
  );

  return {
    currentItems,
    currentPage: clampedCurrentPage,
    endIndex,
    goToPage,
    pageSize,
    startIndex,
    totalItems,
    totalPages,
  };
}
