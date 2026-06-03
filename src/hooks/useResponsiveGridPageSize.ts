import { useEffect, useState } from "react";

export interface ResponsiveGridConfig {
  // Tailwind classes for the grid wrapper; must match `breakpoints` below.
  gridClass: string;
  // Column counts to apply at/above each min-width, ordered widest-first.
  breakpoints: readonly { columns: number; minWidth: number }[];
  defaultColumns: number;
  rowsPerPage: number;
  mobileRowsPerPage: number;
}

// Collection cards: compact, so they scale up to 4 columns.
export const FOUR_COLUMN_CARD_GRID: ResponsiveGridConfig = {
  gridClass:
    "grid min-h-0 grid-cols-2 content-start gap-3 sm:grid-cols-3 min-[960px]:grid-cols-4",
  breakpoints: [
    { columns: 4, minWidth: 960 },
    { columns: 3, minWidth: 640 },
  ],
  defaultColumns: 2,
  rowsPerPage: 3,
  mobileRowsPerPage: 2,
};

// Product cards carry more horizontal detail + a larger image, so they cap at
// 3 columns.
export const THREE_COLUMN_CARD_GRID: ResponsiveGridConfig = {
  gridClass: "grid min-h-0 grid-cols-2 content-start gap-3 sm:grid-cols-3",
  breakpoints: [{ columns: 3, minWidth: 640 }],
  defaultColumns: 2,
  rowsPerPage: 3,
  mobileRowsPerPage: 2,
};

const getViewportColumnCount = (config: ResponsiveGridConfig) => {
  if (typeof window === "undefined") {
    return config.defaultColumns;
  }

  const match = config.breakpoints.find(
    ({ minWidth }) => window.matchMedia(`(min-width: ${minWidth}px)`).matches,
  );

  return match?.columns ?? config.defaultColumns;
};

// Page size that always fills whole rows.
const getGridPageSize = (columnCount: number, config: ResponsiveGridConfig) => {
  const normalizedColumnCount = Math.max(columnCount, config.defaultColumns);
  const rowCount =
    normalizedColumnCount <= config.defaultColumns
      ? config.mobileRowsPerPage
      : config.rowsPerPage;

  return normalizedColumnCount * rowCount;
};

// Tracks the responsive column count and derives a row-aligned page size for a
// given grid preset, so grids paginate in step with their column count.
export function useResponsiveGridPageSize(
  config: ResponsiveGridConfig = FOUR_COLUMN_CARD_GRID,
) {
  const [columnCount, setColumnCount] = useState(() =>
    getViewportColumnCount(config),
  );

  useEffect(() => {
    const updateColumnCount = () => {
      setColumnCount(getViewportColumnCount(config));
    };

    const mediaQueries = config.breakpoints.map(({ minWidth }) =>
      window.matchMedia(`(min-width: ${minWidth}px)`),
    );

    mediaQueries.forEach((mediaQuery) => {
      mediaQuery.addEventListener("change", updateColumnCount);
    });

    return () => {
      mediaQueries.forEach((mediaQuery) => {
        mediaQuery.removeEventListener("change", updateColumnCount);
      });
    };
  }, [config]);

  return {
    columnCount,
    gridClass: config.gridClass,
    pageSize: getGridPageSize(columnCount, config),
  };
}
