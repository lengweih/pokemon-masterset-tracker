import type { ChangeEvent, ReactNode } from "react";
import { LayoutGrid, List, Search } from "lucide-react";

import { DropdownSelect } from "./DropdownSelect";

export type DataViewMode = "grid" | "list";

export interface DataViewSortOption<TValue extends string> {
  label: string;
  value: TValue;
}

interface DataViewToolbarProps<TSortValue extends string> {
  filters?: readonly ReactNode[];
  onSearchChange: (value: string) => void;
  onPageSizeChange?: (value: number) => void;
  onSortChange: (value: TSortValue) => void;
  onViewModeChange?: (value: DataViewMode) => void;
  pageSizeLabel?: string;
  pageSizeOptions?: readonly number[];
  pageSizeSelectId?: string;
  pageSizeValue?: number;
  searchInputId: string;
  searchLabel: string;
  searchPlaceholder: string;
  searchValue: string;
  sortLabel: string;
  sortOptions: readonly DataViewSortOption<TSortValue>[];
  sortSelectId: string;
  sortValue: TSortValue;
  viewMode?: DataViewMode;
}

const viewModeOptions = [
  {
    icon: LayoutGrid,
    label: "Grid view",
    shortLabel: "Grid",
    value: "grid",
  },
  {
    icon: List,
    label: "List view",
    shortLabel: "List",
    value: "list",
  },
] as const;

export function DataViewToolbar<TSortValue extends string>({
  filters,
  onPageSizeChange,
  onSearchChange,
  onSortChange,
  onViewModeChange,
  pageSizeLabel,
  pageSizeOptions,
  pageSizeSelectId,
  pageSizeValue,
  searchInputId,
  searchLabel,
  searchPlaceholder,
  searchValue,
  sortLabel,
  sortOptions,
  sortSelectId,
  sortValue,
  viewMode,
}: DataViewToolbarProps<TSortValue>) {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const hasPageSizeControl = Boolean(
    pageSizeOptions?.length &&
    pageSizeValue !== undefined &&
    pageSizeSelectId &&
    pageSizeLabel &&
    onPageSizeChange,
  );
  const pageSizeDropdownOptions =
    pageSizeOptions?.map((option) => ({
      label: `${option} per page`,
      value: option,
    })) ?? [];
  const hasViewModeControl = Boolean(viewMode && onViewModeChange);

  const searchControl = (
    <div className="relative min-w-0">
      <label className="sr-only" htmlFor={searchInputId}>
        {searchLabel}
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary"
        strokeWidth={2}
      />
      <input
        id={searchInputId}
        className="data-view-field pl-12"
        placeholder={searchPlaceholder}
        type="search"
        value={searchValue}
        onChange={handleSearchChange}
      />
    </div>
  );

  const sortControl = (
    <DropdownSelect
      id={sortSelectId}
      label={sortLabel}
      options={sortOptions}
      showLabel
      value={sortValue}
      onChange={onSortChange}
    />
  );

  const pageSizeControl =
    hasPageSizeControl &&
    pageSizeOptions &&
    pageSizeValue !== undefined &&
    pageSizeSelectId &&
    pageSizeLabel ? (
      <DropdownSelect
        id={pageSizeSelectId}
        label={pageSizeLabel}
        options={pageSizeDropdownOptions}
        showLabel
        value={pageSizeValue}
        onChange={(value) => {
          onPageSizeChange?.(value);
        }}
      />
    ) : null;
  const shouldShowViewModeLabels =
    hasViewModeControl && (Boolean(filters?.length) || hasPageSizeControl);

  const viewModeControl = hasViewModeControl ? (
    <div
      aria-label="Display options"
      className={[
        "h-12 gap-1.5",
        shouldShowViewModeLabels
          ? "grid w-full grid-cols-2"
          : "flex items-center",
        hasPageSizeControl && !shouldShowViewModeLabels ? "lg:w-auto" : "",
      ].join(" ")}
      role="group"
    >
      {viewModeOptions.map((option) => {
        const Icon = option.icon;
        const isSelected = option.value === viewMode;

        return (
          <button
            key={option.value}
            aria-label={option.label}
            aria-pressed={isSelected}
            className={[
              "flex h-12 items-center justify-center rounded-button border transition-colors duration-180 ease-premium",
              shouldShowViewModeLabels ? "min-w-0 gap-2 px-3" : "w-14",
              isSelected
                ? "relative z-10 border-primary bg-primary-light text-primary ring-1 ring-primary"
                : "border-border-strong bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary",
            ].join(" ")}
            type="button"
            onClick={() => {
              onViewModeChange?.(option.value);
            }}
          >
            <Icon
              aria-hidden="true"
              className={
                shouldShowViewModeLabels ? "h-6 w-6 shrink-0" : "h-6 w-6"
              }
              strokeWidth={2}
            />
            {shouldShowViewModeLabels ? (
              <span className="hidden min-w-0 truncate text-sm font-semibold xs:inline">
                {option.shortLabel}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  ) : null;
  // The responsive grid layout below positions at most three filters. Extra
  // entries in `filters` are intentionally not rendered; add layout slots here
  // before passing a fourth filter.
  const [firstFilter, secondFilter, thirdFilter] = filters ?? [];

  return (
    <div className="grid gap-2">
      {pageSizeControl ? (
        <div className="grid gap-2 2xs:grid-cols-[minmax(185px,1fr)_minmax(160px,0.3fr)] xs:grid-cols-[minmax(185px,1fr)_minmax(180px,0.5fr)] xl:grid-cols-[minmax(220px,0.82fr)_minmax(150px,0.52fr)_minmax(190px,0.7fr)_minmax(180px,0.55fr)]">
          <div className="min-w-0 2xs:col-start-1 2xs:row-start-1 xl:col-start-1 xl:row-start-1">
            {searchControl}
          </div>

          <div className="min-w-0 2xs:col-start-1 2xs:row-start-2 xl:col-start-2 xl:row-start-1">
            {sortControl}
          </div>

          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 2xs:contents">
            <div className="min-w-0 2xs:col-start-2 2xs:row-start-2 xl:col-start-3 xl:row-start-1">
              {pageSizeControl}
            </div>

            {viewModeControl ? (
              <div className="2xs:col-start-2 2xs:row-start-1 xl:col-start-4 xl:row-start-1">
                {viewModeControl}
              </div>
            ) : null}
          </div>
        </div>
      ) : filters?.length ? (
        <div className="grid gap-2 xs:grid-cols-2 lg:grid-cols-[minmax(180px,0.7fr)_minmax(180px,0.7fr)_minmax(180px,0.7fr)]">
          <div className="min-w-0 xs:col-start-1 xs:row-start-1 lg:col-start-1 lg:row-start-1">
            {searchControl}
          </div>

          <div className="min-w-0 xs:col-start-2 xs:row-start-1 lg:col-start-2 lg:row-start-1">
            {sortControl}
          </div>

          {firstFilter ? (
            <div className="min-w-0 xs:col-start-1 xs:row-start-2 lg:col-start-3 lg:row-start-1">
              {firstFilter}
            </div>
          ) : null}

          {secondFilter ? (
            <div className="min-w-0 xs:col-start-2 xs:row-start-2 lg:col-start-1 lg:row-start-2">
              {secondFilter}
            </div>
          ) : null}

          {viewModeControl ? (
            <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 xs:contents">
              {thirdFilter ? (
                <div className="min-w-0 xs:col-start-1 xs:row-start-3 lg:col-start-2 lg:row-start-2">
                  {thirdFilter}
                </div>
              ) : null}

              <div className="xs:col-start-2 xs:row-start-3 lg:col-start-3 lg:row-start-2">
                {viewModeControl}
              </div>
            </div>
          ) : thirdFilter ? (
            <div className="min-w-0 xs:col-start-1 xs:row-start-3 lg:col-start-2 lg:row-start-2">
              {thirdFilter}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_auto]">
          {searchControl}

          <div className="grid min-w-0 gap-2 2xs:grid-cols-[minmax(0,1fr)_auto] 2xs:items-center lg:grid-cols-[260px_auto]">
            {sortControl}
            {viewModeControl}
          </div>
        </div>
      )}
    </div>
  );
}
