import type { ChangeEvent, ReactNode } from "react";
import { LayoutGrid, List, Search } from "lucide-react";

import { DropdownSelect } from "./DropdownSelect";

export type DataViewMode = "grid" | "list";

export interface DataViewSortOption<TValue extends string> {
  label: string;
  value: TValue;
}

interface DataViewToolbarProps<TSortValue extends string> {
  filters?: ReactNode;
  onSearchChange: (value: string) => void;
  onPageSizeChange?: (value: number) => void;
  onSortChange: (value: TSortValue) => void;
  onViewModeChange: (value: DataViewMode) => void;
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
  viewMode: DataViewMode;
}

const viewModeOptions = [
  {
    icon: LayoutGrid,
    label: "Grid view",
    value: "grid",
  },
  {
    icon: List,
    label: "List view",
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
        value={pageSizeValue}
        variant="compact"
        onChange={(value) => {
          onPageSizeChange?.(value);
        }}
      />
    ) : null;

  const viewModeControl = (
    <div
      aria-label="Display options"
      className={[
        "flex h-12 items-center gap-1.5",
        hasPageSizeControl ? "lg:w-auto" : "",
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
              "flex h-12 w-14 items-center justify-center rounded-button border transition-colors duration-180 ease-premium",
              isSelected
                ? "relative z-10 border-primary bg-primary-light text-primary ring-1 ring-primary"
                : "border-border-strong bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary",
            ].join(" ")}
            type="button"
            onClick={() => {
              onViewModeChange(option.value);
            }}
          >
            <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={2} />
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="grid gap-2">
      {pageSizeControl ? (
        <div className="grid gap-2 2xs:grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[minmax(210px,1.4fr)_minmax(180px,0.8fr)_minmax(130px,0.5fr)_auto]">
          <div className="min-w-0 2xs:col-start-1 2xs:row-start-1 lg:col-start-1 lg:row-start-1">
            {searchControl}
          </div>

          <div className="min-w-0 2xs:col-start-1 2xs:row-start-2 lg:col-start-2 lg:row-start-1">
            {sortControl}
          </div>

          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 2xs:contents">
            <div className="min-w-0 2xs:col-start-2 2xs:row-start-2 lg:col-start-3 lg:row-start-1">
              {pageSizeControl}
            </div>

            <div className="2xs:col-start-2 2xs:row-start-1 lg:col-start-4 lg:row-start-1">
              {viewModeControl}
            </div>
          </div>
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

      {filters ? <div className="grid gap-2">{filters}</div> : null}
    </div>
  );
}
