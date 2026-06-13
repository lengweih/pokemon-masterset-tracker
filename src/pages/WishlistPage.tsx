import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

import { WishlistCard } from "../components/wishlist/WishlistCard";
import { WishlistHero } from "../components/wishlist/WishlistHero";
import {
  DataViewToolbar,
  type DataViewSortOption,
} from "../components/ui/DataViewToolbar";
import { Pagination } from "../components/ui/Pagination";
import { getCollectionCardById } from "../data/collectionCards";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { usePagination } from "../hooks/usePagination";
import {
  getOwnedVariantIds,
  isOwnedVariantsByCardId,
  isStringArray,
} from "../lib/collectionOwnership";
import { STORAGE_KEYS } from "../lib/storageKeys";
import { ROUTES } from "../routes/paths";
import type {
  CollectionCard,
  OwnedVariantsByCardId,
} from "../types/collection";

type WishlistSortOption =
  | "recently-added"
  | "number-asc"
  | "number-desc"
  | "name-asc"
  | "name-desc";

const WISHLIST_PAGE_SIZE = 8;
const wishlistViewEnterTransition = {
  duration: 0.3,
  ease: [0.64, 0, 0.78, 0],
} as const;

const wishlistSortOptions = [
  {
    label: "Recently Added",
    value: "recently-added",
  },
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
] satisfies readonly DataViewSortOption<WishlistSortOption>[];

const sortWishlistCards = (
  cards: readonly CollectionCard[],
  sortOption: WishlistSortOption,
) => {
  if (sortOption === "recently-added") {
    // `cards` is in insertion order, so newest wishlisted appears last.
    return [...cards].reverse();
  }

  return [...cards].sort((firstCard, secondCard) => {
    if (sortOption === "name-asc") {
      return firstCard.name.localeCompare(secondCard.name);
    }

    if (sortOption === "name-desc") {
      return secondCard.name.localeCompare(firstCard.name);
    }

    if (sortOption === "number-desc") {
      return secondCard.number.localeCompare(firstCard.number, undefined, {
        numeric: true,
      });
    }

    return firstCard.number.localeCompare(secondCard.number, undefined, {
      numeric: true,
    });
  });
};

export function WishlistPage() {
  const [wishlistCardIds, setWishlistCardIds] = useLocalStorageState<string[]>(
    STORAGE_KEYS.wishlist,
    [],
    isStringArray,
  );
  const [ownedVariantsByCardId] = useLocalStorageState<OwnedVariantsByCardId>(
    STORAGE_KEYS.collection,
    {},
    isOwnedVariantsByCardId,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] =
    useState<WishlistSortOption>("recently-added");

  const wishlistCards = useMemo(
    () =>
      wishlistCardIds
        .map((cardId) => getCollectionCardById(cardId))
        .filter((card): card is CollectionCard => card !== undefined),
    [wishlistCardIds],
  );
  const totalVariants = useMemo(
    () =>
      wishlistCards.reduce((count, card) => count + card.variants.length, 0),
    [wishlistCards],
  );
  const hasWishlistedCards = wishlistCards.length > 0;

  const visibleWishlistCards = useMemo(() => {
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();
    const searchedCards =
      normalizedSearchQuery.length === 0
        ? wishlistCards
        : wishlistCards.filter((card) => {
            const searchableText = [
              card.name,
              card.number,
              `#${card.number}`,
              card.rarityLabel,
              card.typeLabel,
            ]
              .join(" ")
              .toLowerCase();

            return searchableText.includes(normalizedSearchQuery);
          });

    return sortWishlistCards(searchedCards, sortOption);
  }, [searchQuery, sortOption, wishlistCards]);

  const pagination = usePagination({
    items: visibleWishlistCards,
    pageSize: WISHLIST_PAGE_SIZE,
  });
  const wishlistResultsKey = `${sortOption}-${pagination.currentPage}`;

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    pagination.goToPage(1);
  };

  const handleSortChange = (value: WishlistSortOption) => {
    setSortOption(value);
    pagination.goToPage(1);
  };

  const handleRemoveFromWishlist = (cardId: string) => {
    setWishlistCardIds((currentCardIds) =>
      currentCardIds.filter((currentCardId) => currentCardId !== cardId),
    );
  };

  return (
    <section className="grid w-full self-start gap-3 lg:h-full lg:min-h-0 lg:self-stretch lg:grid-rows-[auto_minmax(0,1fr)]">
      <WishlistHero
        totalVariants={totalVariants}
        wishlistedCount={wishlistCards.length}
      />

      {hasWishlistedCards ? (
        <div className="surface-card grid gap-5 p-4 sm:p-6 lg:min-h-0 lg:grid-rows-[auto_minmax(0,1fr)_auto]">
          <DataViewToolbar
            searchInputId="wishlist-search"
            searchLabel="Search wishlist"
            searchPlaceholder="Search wishlist..."
            searchValue={searchQuery}
            sortLabel="Sort"
            sortOptions={wishlistSortOptions}
            sortSelectId="wishlist-sort"
            sortValue={sortOption}
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
          />

          {pagination.currentItems.length > 0 ? (
            <motion.div
              key={wishlistResultsKey}
              initial={{ opacity: 0.82 }}
              animate={{ opacity: 1 }}
              className="grid min-h-0 content-start gap-3"
              transition={wishlistViewEnterTransition}
            >
              {pagination.currentItems.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={wishlistViewEnterTransition}
                >
                  <WishlistCard
                    card={card}
                    ownedVariantIds={getOwnedVariantIds(
                      card,
                      ownedVariantsByCardId,
                    )}
                    onRemove={handleRemoveFromWishlist}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="empty-state lg:h-full">
              <p className="text-card text-text-primary">No cards found</p>
              <p className="max-w-md text-sm font-medium text-text-secondary">
                Try a different search term to find a wishlisted card.
              </p>
              {searchQuery ? (
                <button
                  className="btn-secondary mt-1"
                  type="button"
                  onClick={() => {
                    handleSearchChange("");
                  }}
                >
                  Clear search
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
      ) : (
        <div className="empty-state lg:h-full">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light text-brand-blue">
            <Heart aria-hidden="true" className="h-8 w-8" strokeWidth={2} />
          </div>
          <p className="text-card text-text-primary">Your wishlist is empty</p>
          <p className="max-w-md text-sm font-medium text-text-secondary">
            Browse the collection and tap the heart on any card to save it here.
          </p>
          <Link className="btn-primary mt-1" to={ROUTES.collection}>
            Browse Collection
          </Link>
        </div>
      )}
    </section>
  );
}

export default WishlistPage;
