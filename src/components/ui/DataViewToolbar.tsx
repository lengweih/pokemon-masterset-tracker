import type { ChangeEvent, ReactNode } from "react";
import { Search } from "lucide-react";

import { DropdownSelect } from "./DropdownSelect";

export interface DataViewSortOption<TValue extends string> {
  label: string;
  value: TValue;
}

interface DataViewToolbarProps<TSortValue extends string> {
  filters?: readonly ReactNode[];
  onSearchChange: (value: string) => void;
  onSortChange: (value: TSortValue) => void;
  searchInputId: string;
  searchLabel: string;
  searchPlaceholder: string;
  searchValue: string;
  sortLabel: string;
  sortOptions: readonly DataViewSortOption<TSortValue>[];
  sortSelectId: string;
  sortValue: TSortValue;
}

export function DataViewToolbar<TSortValue extends string>({
  filters,
  onSearchChange,
  onSortChange,
  searchInputId,
  searchLabel,
  searchPlaceholder,
  searchValue,
  sortLabel,
  sortOptions,
  sortSelectId,
  sortValue,
}: DataViewToolbarProps<TSortValue>) {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

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

  // The responsive grid layout below positions at most three filters. Extra
  // entries in `filters` are intentionally not rendered; add layout slots here
  // before passing a fourth filter.
  const [firstFilter, secondFilter, thirdFilter] = filters ?? [];

  if (!filters?.length) {
    return (
      <div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_260px]">
        {searchControl}
        {sortControl}
      </div>
    );
  }

  return (
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

      {thirdFilter ? (
        <div className="min-w-0 xs:col-start-1 xs:row-start-3 lg:col-start-2 lg:row-start-2">
          {thirdFilter}
        </div>
      ) : null}
    </div>
  );
}
