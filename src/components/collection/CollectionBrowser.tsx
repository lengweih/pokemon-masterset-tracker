import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

import {
  DataViewToolbar,
  type DataViewSortOption,
} from "../ui/DataViewToolbar";
import { DropdownSelect } from "../ui/DropdownSelect";
import { Pagination } from "../ui/Pagination";
import {
  collectionCardRarityLabels,
  collectionCardRarityOrder,
  collectionCardsByView,
} from "../../data/collectionCards";
import { usePagination } from "../../hooks/usePagination";
import {
  FOUR_COLUMN_CARD_GRID,
  useResponsiveGridPageSize,
} from "../../hooks/useResponsiveGridPageSize";
import {
  getOwnedVariantCount,
  getOwnedVariantIds,
  setVariantSetOwnership,
  toggleVariantOwnership,
  toggleWishlistCard,
} from "../../lib/collectionOwnership";
import type {
  CollectionCard as CollectionCardModel,
  CollectionOwnershipFilter,
  CollectionRarityFilter,
  CollectionSortOption,
  CollectionTypeFilter,
  CollectionViewId,
  OwnedVariantsByCardId,
} from "../../types/collection";
import { CollectionCard } from "./CollectionCard";
import { CollectionTabs } from "./CollectionTabs";
import {
  COLLECTION_TAB_PANEL_ID,
  getCollectionTabId,
} from "./collectionTabPanel";
import { VariantSelectorModal } from "./VariantSelectorModal";

type CollectionStateSetter<TValue> = (
  nextValue: TValue | ((currentValue: TValue) => TValue),
) => void;

interface CollectionBrowserProps {
  activeView: CollectionViewId;
  ownedVariantsByCardId: OwnedVariantsByCardId;
  wishlistCardIds: string[];
  onActiveViewChange: (view: CollectionViewId) => void;
  onOwnedVariantsChange: CollectionStateSetter<OwnedVariantsByCardId>;
  onWishlistCardIdsChange: CollectionStateSetter<string[]>;
}

const COLLECTION_GRID_CARD_FRAME_CLASS =
  "mx-auto aspect-[63/88] w-full max-w-[280px] rounded-md";

const collectionViewEnterTransition = {
  duration: 0.3,
  ease: [0.64, 0, 0.78, 0],
} as const;

const typeFilterOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Grass",
    value: "grass",
  },
  {
    label: "Fire",
    value: "fire",
  },
  {
    label: "Water",
    value: "water",
  },
  {
    label: "Lightning",
    value: "lightning",
  },
  {
    label: "Psychic",
    value: "psychic",
  },
  {
    label: "Fighting",
    value: "fighting",
  },
  {
    label: "Darkness",
    value: "darkness",
  },
  {
    label: "Metal",
    value: "metal",
  },
  {
    label: "Dragon",
    value: "dragon",
  },
  {
    label: "Colorless",
    value: "colorless",
  },
  {
    label: "Trainer",
    value: "trainer",
  },
] satisfies readonly { label: string; value: CollectionTypeFilter }[];

const ownershipFilterOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Complete",
    value: "complete",
  },
  {
    label: "In Progress",
    value: "in-progress",
  },
  {
    label: "Missing",
    value: "missing",
  },
] satisfies readonly { label: string; value: CollectionOwnershipFilter }[];

const ownershipFilterValues = ownershipFilterOptions.map(
  (option) => option.value,
);

// Lets the dashboard deep-link to a pre-applied ownership filter via the
// `ownership` query param (e.g. the "Missing Cards" / "View Missing Cards" CTAs).
const parseOwnershipFilterParam = (
  value: string | null,
): CollectionOwnershipFilter =>
  ownershipFilterValues.includes(value as CollectionOwnershipFilter)
    ? (value as CollectionOwnershipFilter)
    : "all";

const collectionSortOptions = [
  {
    label: "Card Number (Asc)",
    value: "number-asc",
  },
  {
    label: "Card Number (Desc)",
    value: "number-desc",
  },
  {
    label: "Name (A-Z)",
    value: "name-asc",
  },
  {
    label: "Name (Z-A)",
    value: "name-desc",
  },
  {
    label: "Completion (High)",
    value: "completion-high",
  },
  {
    label: "Completion (Low)",
    value: "completion-low",
  },
] satisfies readonly DataViewSortOption<CollectionSortOption>[];

const matchesOwnershipFilter = (
  card: CollectionCardModel,
  ownershipFilter: CollectionOwnershipFilter,
  ownedVariantCount: number,
) => {
  const isComplete = ownedVariantCount === card.variants.length;
  const isMissing = ownedVariantCount === 0;

  if (ownershipFilter === "complete") {
    return isComplete;
  }

  if (ownershipFilter === "in-progress") {
    return !isComplete && !isMissing;
  }

  if (ownershipFilter === "missing") {
    return isMissing;
  }

  return true;
};

// Completion as a 0..1 ratio from a precomputed owned-variant count, so sorting
// never recomputes ownership (which would allocate a Set per comparison).
const getCompletionRatio = (
  card: CollectionCardModel,
  ownedVariantCount: number,
) => (card.variants.length === 0 ? 0 : ownedVariantCount / card.variants.length);

const sortCollectionCards = (
  cardsToSort: readonly CollectionCardModel[],
  sortOption: CollectionSortOption,
  ownedCountByCardId: ReadonlyMap<string, number>,
) => {
  return [...cardsToSort].sort((firstCard, secondCard) => {
    if (sortOption === "number-desc") {
      return secondCard.number.localeCompare(firstCard.number, undefined, {
        numeric: true,
      });
    }

    if (sortOption === "name-asc") {
      return firstCard.name.localeCompare(secondCard.name);
    }

    if (sortOption === "name-desc") {
      return secondCard.name.localeCompare(firstCard.name);
    }

    if (sortOption === "completion-high") {
      return (
        getCompletionRatio(secondCard, ownedCountByCardId.get(secondCard.id) ?? 0) -
        getCompletionRatio(firstCard, ownedCountByCardId.get(firstCard.id) ?? 0)
      );
    }

    if (sortOption === "completion-low") {
      return (
        getCompletionRatio(firstCard, ownedCountByCardId.get(firstCard.id) ?? 0) -
        getCompletionRatio(secondCard, ownedCountByCardId.get(secondCard.id) ?? 0)
      );
    }

    return firstCard.number.localeCompare(secondCard.number, undefined, {
      numeric: true,
    });
  });
};

export function CollectionBrowser({
  activeView,
  ownedVariantsByCardId,
  wishlistCardIds,
  onActiveViewChange,
  onOwnedVariantsChange,
  onWishlistCardIdsChange,
}: CollectionBrowserProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [rarityFilter, setRarityFilter] =
    useState<CollectionRarityFilter>("all");
  const [typeFilter, setTypeFilter] = useState<CollectionTypeFilter>("all");
  const [ownershipFilter, setOwnershipFilter] =
    useState<CollectionOwnershipFilter>(() =>
      parseOwnershipFilterParam(searchParams.get("ownership")),
    );
  const [sortOption, setSortOption] =
    useState<CollectionSortOption>("number-asc");
  const [editingCard, setEditingCard] = useState<CollectionCardModel | null>(
    null,
  );
  const { gridClass, pageSize } = useResponsiveGridPageSize(
    FOUR_COLUMN_CARD_GRID,
  );
  const activeCards = collectionCardsByView[activeView];
  const wishlistCardIdSet = useMemo(
    () => new Set(wishlistCardIds),
    [wishlistCardIds],
  );

  // The `ownership` deep-link param is consumed once into state above. Strip it
  // from the URL (via replace, so there's no extra history entry and no visible
  // change for the user) so the dropdown stays authoritative and a later reload
  // doesn't re-apply the stale param.
  useEffect(() => {
    if (!searchParams.has("ownership")) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("ownership");
    setSearchParams(nextParams, { replace: true });
  }, [searchParams, setSearchParams]);

  // Owned-variant count per card, computed once per render. Filtering, sorting,
  // and the card grid all read from this map instead of recomputing ownership
  // (which allocates a Set) for every card and every sort comparison.
  const ownedCountByCardId = useMemo(() => {
    const counts = new Map<string, number>();
    for (const card of activeCards) {
      counts.set(card.id, getOwnedVariantCount(card, ownedVariantsByCardId));
    }
    return counts;
  }, [activeCards, ownedVariantsByCardId]);

  const rarityFilterOptions = useMemo(() => {
    const presentRarities = new Set(activeCards.map((card) => card.rarity));

    return [
      { label: "All", value: "all" as const },
      ...collectionCardRarityOrder
        .filter((rarity) => presentRarities.has(rarity))
        .map((rarity) => ({
          label: collectionCardRarityLabels[rarity],
          value: rarity,
        })),
    ] satisfies readonly { label: string; value: CollectionRarityFilter }[];
  }, [activeCards]);

  const visibleCards = useMemo(() => {
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();
    const filteredCards = activeCards.filter((card) => {
      const searchableText = [
        card.name,
        card.number,
        `#${card.number}`,
        card.rarityLabel,
        card.typeLabel,
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch =
        normalizedSearchQuery.length === 0 ||
        searchableText.includes(normalizedSearchQuery);
      const matchesRarity =
        rarityFilter === "all" || card.rarity === rarityFilter;
      const matchesType = typeFilter === "all" || card.type === typeFilter;

      return (
        matchesSearch &&
        matchesRarity &&
        matchesType &&
        matchesOwnershipFilter(
          card,
          ownershipFilter,
          ownedCountByCardId.get(card.id) ?? 0,
        )
      );
    });

    return sortCollectionCards(filteredCards, sortOption, ownedCountByCardId);
  }, [
    activeCards,
    ownedCountByCardId,
    ownershipFilter,
    rarityFilter,
    searchQuery,
    sortOption,
    typeFilter,
  ]);

  const pagination = usePagination({
    items: visibleCards,
    pageSize,
  });

  // Reset to the first page whenever a filter/sort/tab changes, so a narrowed
  // result set never leaves the user stranded on a now-out-of-range page. This
  // replaces a repeated `goToPage(1)` in every filter/sort handler. `goToPage`
  // is read from a ref so the reset fires only on filter changes, not whenever
  // pagination's identity shifts (e.g. a responsive page-size change).
  const goToPageRef = useRef(pagination.goToPage);
  useEffect(() => {
    goToPageRef.current = pagination.goToPage;
  });
  useEffect(() => {
    goToPageRef.current(1);
  }, [activeView, ownershipFilter, rarityFilter, searchQuery, sortOption, typeFilter]);

  const gridPlaceholderCount =
    pagination.totalPages > 1
      ? Math.max(pagination.pageSize - pagination.currentItems.length, 0)
      : 0;
  const collectionGridKey = `${activeView}-${pagination.currentPage}`;
  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    rarityFilter !== "all" ||
    typeFilter !== "all" ||
    ownershipFilter !== "all";

  // Single source of truth for clearing the browser back to its default view.
  // Used both when switching tabs and by the "Clear filters" action so the two
  // paths can't drift on which filters they reset.
  const resetFilters = () => {
    setSearchQuery("");
    setRarityFilter("all");
    setTypeFilter("all");
    setOwnershipFilter("all");
  };

  const handleActiveViewChange = (nextView: CollectionViewId) => {
    onActiveViewChange(nextView);
    resetFilters();
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleRarityFilterChange = (value: CollectionRarityFilter) => {
    setRarityFilter(value);
  };

  const handleTypeFilterChange = (value: CollectionTypeFilter) => {
    setTypeFilter(value);
  };

  const handleOwnershipFilterChange = (value: CollectionOwnershipFilter) => {
    setOwnershipFilter(value);
  };

  const handleSortChange = (value: CollectionSortOption) => {
    setSortOption(value);
  };

  const handleClearFilters = () => {
    resetFilters();
  };

  const handleWishlistToggle = (cardId: string) => {
    onWishlistCardIdsChange((currentCardIds) =>
      toggleWishlistCard(currentCardIds, cardId),
    );
  };

  const handleToggleVariant = (variantId: string) => {
    if (!editingCard) {
      return;
    }

    const cardId = editingCard.id;
    onOwnedVariantsChange((current) =>
      toggleVariantOwnership(current, cardId, variantId),
    );
  };

  const handleSetAllOwned = (owned: boolean) => {
    if (!editingCard) {
      return;
    }

    const { id: cardId, variants } = editingCard;
    // `editingCard` is projected to the active set, so this only marks/clears
    // that set's variants and preserves the other set's ownership.
    onOwnedVariantsChange((current) =>
      setVariantSetOwnership(
        current,
        cardId,
        variants.map((variant) => variant.id),
        owned,
      ),
    );
  };

  const collectionFilters = [
    <DropdownSelect
      key="rarity"
      id="collection-rarity"
      label="Rarity"
      options={rarityFilterOptions}
      showLabel
      value={rarityFilter}
      onChange={handleRarityFilterChange}
    />,
    <DropdownSelect
      key="type"
      id="collection-type"
      label="Type"
      options={typeFilterOptions}
      showLabel
      value={typeFilter}
      onChange={handleTypeFilterChange}
    />,
    <DropdownSelect
      key="ownership"
      id="collection-ownership"
      label="Ownership"
      options={ownershipFilterOptions}
      showLabel
      value={ownershipFilter}
      onChange={handleOwnershipFilterChange}
    />,
  ] as const;

  return (
    <>
      <div className="surface-card grid gap-5 p-4 sm:p-6 lg:min-h-0 lg:grid-rows-[auto_minmax(0,1fr)]">
        <CollectionTabs
          activeTab={activeView}
          onTabChange={handleActiveViewChange}
        />

        <div
          aria-labelledby={getCollectionTabId(activeView)}
          className="grid gap-5 lg:min-h-0 lg:grid-rows-[auto_minmax(0,1fr)_auto]"
          id={COLLECTION_TAB_PANEL_ID}
          role="tabpanel"
          tabIndex={0}
        >
          <DataViewToolbar
                filters={collectionFilters}
                searchInputId="collection-search"
                searchLabel="Search cards"
                searchPlaceholder="Search cards..."
                searchValue={searchQuery}
                sortLabel="Sort"
                sortOptions={collectionSortOptions}
                sortSelectId="collection-sort"
                sortValue={sortOption}
                onSearchChange={handleSearchChange}
                onSortChange={handleSortChange}
              />

              {pagination.currentItems.length > 0 ? (
                <motion.div
                  key={collectionGridKey}
                  initial={{ opacity: 0.82 }}
                  animate={{ opacity: 1 }}
                  className={gridClass}
                  transition={collectionViewEnterTransition}
                >
                  {pagination.currentItems.map((card) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={collectionViewEnterTransition}
                    >
                      <CollectionCard
                        card={card}
                        collectionView={activeView}
                        isWishlisted={wishlistCardIdSet.has(card.id)}
                        ownedVariantCount={ownedCountByCardId.get(card.id) ?? 0}
                        onEditVariants={setEditingCard}
                        onWishlistToggle={handleWishlistToggle}
                      />
                    </motion.div>
                  ))}

                  {Array.from({ length: gridPlaceholderCount }, (_, index) => (
                    <div
                      key={`collection-placeholder-${index}`}
                      aria-hidden="true"
                      className={[
                        "invisible",
                        COLLECTION_GRID_CARD_FRAME_CLASS,
                      ].join(" ")}
                    />
                  ))}
                </motion.div>
              ) : (
                <div className="empty-state lg:h-full">
                  <p className="text-card text-text-primary">No cards found</p>
                  <p className="max-w-md text-sm font-medium text-text-secondary">
                    Try a different search term or adjust the filters to view
                    more cards.
                  </p>
                  {hasActiveFilters ? (
                    <button
                      className="btn-secondary mt-1"
                      type="button"
                      onClick={handleClearFilters}
                    >
                      Clear filters
                    </button>
                  ) : null}
                </div>
              )}

          <Pagination
            currentPage={pagination.currentPage}
            itemName="card"
            pageSize={pagination.pageSize}
            totalItems={pagination.totalItems}
            totalPages={pagination.totalPages}
            onPageChange={pagination.goToPage}
          />
        </div>
      </div>

      <VariantSelectorModal
        key={editingCard?.id ?? "closed"}
        card={editingCard}
        ownedVariantIds={
          editingCard
            ? getOwnedVariantIds(editingCard, ownedVariantsByCardId)
            : []
        }
        onClose={() => {
          setEditingCard(null);
        }}
        onSetAllOwned={handleSetAllOwned}
        onToggleVariant={handleToggleVariant}
      />
    </>
  );
}
