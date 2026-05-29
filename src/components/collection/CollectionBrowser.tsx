import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

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
  isCollectionViewComingSoon,
} from "../../data/collectionCards";
import { usePagination } from "../../hooks/usePagination";
import {
  getCardCompletion,
  getOwnedVariantCount,
  getOwnedVariantIds,
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

const COLLECTION_GRID_ROWS_PER_PAGE = 3;
const COLLECTION_MOBILE_GRID_ROWS_PER_PAGE = 2;
const COLLECTION_GRID_CARD_FRAME_CLASS =
  "mx-auto aspect-[63/88] w-full max-w-[280px] rounded-md";

const COLLECTION_GRID_COLUMN_BREAKPOINTS = [
  { columns: 4, minWidth: 960 },
  { columns: 3, minWidth: 640 },
] as const;
const COLLECTION_GRID_DEFAULT_COLUMN_COUNT = 2;

const getViewportColumnCount = () => {
  if (typeof window === "undefined") {
    return COLLECTION_GRID_DEFAULT_COLUMN_COUNT;
  }

  const match = COLLECTION_GRID_COLUMN_BREAKPOINTS.find(
    ({ minWidth }) => window.matchMedia(`(min-width: ${minWidth}px)`).matches,
  );

  return match?.columns ?? COLLECTION_GRID_DEFAULT_COLUMN_COUNT;
};
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
  ownedVariantsByCardId: OwnedVariantsByCardId,
) => {
  const ownedVariantCount = getOwnedVariantCount(card, ownedVariantsByCardId);
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

const sortCollectionCards = (
  cardsToSort: readonly CollectionCardModel[],
  sortOption: CollectionSortOption,
  ownedVariantsByCardId: OwnedVariantsByCardId,
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
        getCardCompletion(secondCard, ownedVariantsByCardId) -
        getCardCompletion(firstCard, ownedVariantsByCardId)
      );
    }

    if (sortOption === "completion-low") {
      return (
        getCardCompletion(firstCard, ownedVariantsByCardId) -
        getCardCompletion(secondCard, ownedVariantsByCardId)
      );
    }

    return firstCard.number.localeCompare(secondCard.number, undefined, {
      numeric: true,
    });
  });
};

const getGridPageSize = (columnCount: number) => {
  const normalizedColumnCount = Math.max(columnCount, 2);
  const rowCount =
    normalizedColumnCount <= 2
      ? COLLECTION_MOBILE_GRID_ROWS_PER_PAGE
      : COLLECTION_GRID_ROWS_PER_PAGE;

  return normalizedColumnCount * rowCount;
};

export function CollectionBrowser({
  activeView,
  ownedVariantsByCardId,
  wishlistCardIds,
  onActiveViewChange,
  onOwnedVariantsChange,
  onWishlistCardIdsChange,
}: CollectionBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [rarityFilter, setRarityFilter] =
    useState<CollectionRarityFilter>("all");
  const [typeFilter, setTypeFilter] = useState<CollectionTypeFilter>("all");
  const [ownershipFilter, setOwnershipFilter] =
    useState<CollectionOwnershipFilter>("all");
  const [sortOption, setSortOption] =
    useState<CollectionSortOption>("number-asc");
  const [editingCard, setEditingCard] = useState<CollectionCardModel | null>(
    null,
  );
  const [gridColumnCount, setGridColumnCount] = useState(
    getViewportColumnCount,
  );
  const pageSize = getGridPageSize(gridColumnCount);
  const isComingSoon = isCollectionViewComingSoon(activeView);
  const activeCards = collectionCardsByView[activeView];
  const wishlistCardIdSet = useMemo(
    () => new Set(wishlistCardIds),
    [wishlistCardIds],
  );

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
        matchesOwnershipFilter(card, ownershipFilter, ownedVariantsByCardId)
      );
    });

    return sortCollectionCards(
      filteredCards,
      sortOption,
      ownedVariantsByCardId,
    );
  }, [
    activeCards,
    ownedVariantsByCardId,
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

  const handleActiveViewChange = (nextView: CollectionViewId) => {
    onActiveViewChange(nextView);
    setRarityFilter("all");
    setTypeFilter("all");
    pagination.goToPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    pagination.goToPage(1);
  };

  const handleRarityFilterChange = (value: CollectionRarityFilter) => {
    setRarityFilter(value);
    pagination.goToPage(1);
  };

  const handleTypeFilterChange = (value: CollectionTypeFilter) => {
    setTypeFilter(value);
    pagination.goToPage(1);
  };

  const handleOwnershipFilterChange = (value: CollectionOwnershipFilter) => {
    setOwnershipFilter(value);
    pagination.goToPage(1);
  };

  const handleSortChange = (value: CollectionSortOption) => {
    setSortOption(value);
    pagination.goToPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setRarityFilter("all");
    setTypeFilter("all");
    setOwnershipFilter("all");
    pagination.goToPage(1);
  };

  const handleWishlistToggle = (cardId: string) => {
    onWishlistCardIdsChange((currentCardIds) => {
      if (currentCardIds.includes(cardId)) {
        return currentCardIds.filter(
          (currentCardId) => currentCardId !== cardId,
        );
      }

      return [...currentCardIds, cardId];
    });
  };

  const handleVariantSave = (cardId: string, variantIds: string[]) => {
    onOwnedVariantsChange((currentOwnedVariantsByCardId) => {
      const nextOwnedVariantsByCardId = { ...currentOwnedVariantsByCardId };

      if (variantIds.length > 0) {
        nextOwnedVariantsByCardId[cardId] = variantIds;
      } else {
        delete nextOwnedVariantsByCardId[cardId];
      }

      return nextOwnedVariantsByCardId;
    });
    setEditingCard(null);
  };

  useEffect(() => {
    const updateColumnCount = () => {
      setGridColumnCount(getViewportColumnCount());
    };

    const mediaQueries = COLLECTION_GRID_COLUMN_BREAKPOINTS.map(
      ({ minWidth }) => window.matchMedia(`(min-width: ${minWidth}px)`),
    );

    mediaQueries.forEach((mediaQuery) => {
      mediaQuery.addEventListener("change", updateColumnCount);
    });

    return () => {
      mediaQueries.forEach((mediaQuery) => {
        mediaQuery.removeEventListener("change", updateColumnCount);
      });
    };
  }, []);

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
          className={
            isComingSoon
              ? "grid lg:min-h-0"
              : "grid gap-5 lg:min-h-0 lg:grid-rows-[auto_minmax(0,1fr)_auto]"
          }
          id={COLLECTION_TAB_PANEL_ID}
          role="tabpanel"
          tabIndex={0}
        >
          {isComingSoon ? (
            <div className="empty-state lg:h-full">
              <p className="text-card text-text-primary">
                Grandmaster Set coming soon
              </p>
              <p className="max-w-md text-sm font-medium text-text-secondary">
                Grandmaster set tracking isn&apos;t available yet. Switch to the
                Master Set to track your Prismatic Evolutions collection.
              </p>
            </div>
          ) : (
            <>
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
                  className="grid min-h-0 grid-cols-2 content-start gap-3 sm:grid-cols-3 min-[960px]:grid-cols-4"
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
                        isWishlisted={wishlistCardIdSet.has(card.id)}
                        ownedVariantCount={getOwnedVariantCount(
                          card,
                          ownedVariantsByCardId,
                        )}
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
            </>
          )}
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
        onSave={handleVariantSave}
      />
    </>
  );
}
