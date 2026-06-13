import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import { VariantOwnershipRow } from "../components/collection/VariantOwnershipRow";
import { WishlistButton } from "../components/collection/WishlistButton";
import {
  collectionCardsByView,
  getCollectionCardById,
} from "../data/collectionCards";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import {
  getCompletionPercentage,
  getOwnedVariantIds,
  isOwnedVariantsByCardId,
  isStringArray,
  setVariantSetOwnership,
  toggleVariantOwnership,
  toggleWishlistCard,
} from "../lib/collectionOwnership";
import { STORAGE_KEYS } from "../lib/storageKeys";
import { ROUTES } from "../routes/paths";
import type {
  CollectionCard,
  OwnedVariantsByCardId,
} from "../types/collection";

// SVP black-star promo cards share numbers with the master set's secret rares,
// so they're labeled as their own set to avoid confusion.
const isSvpCard = (card: CollectionCard) => card.id.startsWith("svp-");
const getCardSetName = (card: CollectionCard) =>
  isSvpCard(card) ? "Scarlet Violet Promo" : "Prismatic Evolutions";

// Preserves the `from` context so continued prev/next navigation stays within
// the same list the user was browsing.
const cardDetailHref = (cardId: string, from: string | null) =>
  `/collection/${cardId}${from ? `?from=${from}` : ""}`;

function NeighborLink({
  card,
  direction,
  from,
}: {
  card: CollectionCard | undefined;
  direction: "previous" | "next";
  from: string | null;
}) {
  const isPrevious = direction === "previous";
  const Icon = isPrevious ? ChevronLeft : ChevronRight;
  // Matches the collection page pagination prev/next buttons.
  const baseClass =
    "flex h-8 w-7 items-center justify-center rounded-lg border border-border-strong bg-surface transition-all duration-180 ease-premium 2xs:h-9 2xs:w-8";

  if (!card) {
    return (
      <span
        aria-hidden="true"
        className={`${baseClass} cursor-not-allowed text-text-secondary opacity-45`}
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
    );
  }

  return (
    <Link
      aria-label={`${isPrevious ? "Previous" : "Next"} card, #${card.number} ${card.name}`}
      className={`${baseClass} text-text-secondary hover:bg-surface-hover hover:text-text-primary`}
      to={cardDetailHref(card.id, from)}
    >
      <Icon className="h-5 w-5" strokeWidth={2} />
    </Link>
  );
}

export function CardDetailPage() {
  const { cardId } = useParams<{ cardId: string }>();
  const [searchParams] = useSearchParams();
  const fromContext = searchParams.get("from");
  const card = cardId ? getCollectionCardById(cardId) : undefined;

  const [ownedVariantsByCardId, setOwnedVariantsByCardId] =
    useLocalStorageState<OwnedVariantsByCardId>(
      STORAGE_KEYS.collection,
      {},
      isOwnedVariantsByCardId,
    );
  const [wishlistCardIds, setWishlistCardIds] = useLocalStorageState<string[]>(
    STORAGE_KEYS.wishlist,
    [],
    isStringArray,
  );

  // The ordered list prev/next walks, matching where the user came from so
  // navigation mirrors that grid (and never crosses master <-> SVP).
  const neighborCards = useMemo<readonly CollectionCard[]>(() => {
    if (fromContext === "wishlist") {
      return wishlistCardIds
        .map((id) => getCollectionCardById(id))
        .filter((neighbor): neighbor is CollectionCard => Boolean(neighbor));
    }
    if (fromContext === "grandmaster") {
      return collectionCardsByView.grandmaster;
    }
    if (fromContext === "master") {
      return collectionCardsByView.master;
    }
    // No/unknown context: fall back to the card's own set list.
    return cardId?.startsWith("svp-")
      ? collectionCardsByView.grandmaster
      : collectionCardsByView.master;
  }, [fromContext, wishlistCardIds, cardId]);

  if (!card) {
    return (
      <section className="grid w-full self-start gap-3">
        <div className="empty-state lg:h-full">
          <p className="text-card text-text-primary">Card not found</p>
          <p className="max-w-md text-sm font-medium text-text-secondary">
            We couldn&apos;t find that card. It may have been removed or the
            link is incorrect.
          </p>
          <Link className="btn-primary mt-1" to={ROUTES.collection}>
            Back to Collection
          </Link>
        </div>
      </section>
    );
  }

  const currentIndex = neighborCards.findIndex(
    (neighbor) => neighbor.id === card.id,
  );
  const previousCard =
    currentIndex > 0 ? neighborCards[currentIndex - 1] : undefined;
  const nextCard =
    currentIndex >= 0 && currentIndex < neighborCards.length - 1
      ? neighborCards[currentIndex + 1]
      : undefined;
  const backTo =
    fromContext === "wishlist" ? ROUTES.wishlist : ROUTES.collection;
  const backLabel =
    fromContext === "wishlist" ? "Back to Wishlist" : "Back to Collection";

  // Tells the user which list the prev/next buttons cycle through (and where in
  // it they are), so it's clear the detail view is scoped to that tab.
  const browsingContextLabel =
    fromContext === "grandmaster"
      ? "Grandmaster set"
      : fromContext === "master"
        ? "Master set"
        : fromContext === "wishlist"
          ? "Wishlist"
          : null;
  const browsingPosition = currentIndex >= 0 ? currentIndex + 1 : null;

  const ownedVariantIds = getOwnedVariantIds(card, ownedVariantsByCardId);
  const ownedVariantIdSet = new Set(ownedVariantIds);
  const ownedCount = ownedVariantIds.length;
  const totalCount = card.variants.length;
  const completionPercentage = getCompletionPercentage(ownedCount, totalCount);
  const isWishlisted = wishlistCardIds.includes(card.id);

  // Variants split into their sets so each can be edited independently. A
  // section is only shown when the card has variants of that set.
  const variantSections = (
    [
      { set: "master", title: "Master set" },
      { set: "grandmaster", title: "Grandmaster set" },
    ] as const
  )
    .map((section) => ({
      ...section,
      variants: card.variants.filter((variant) => variant.set === section.set),
    }))
    .filter((section) => section.variants.length > 0);

  const toggleVariant = (variantId: string) => {
    setOwnedVariantsByCardId((current) =>
      toggleVariantOwnership(current, card.id, variantId),
    );
  };

  const toggleSectionAllOwned = (
    sectionVariantIds: readonly string[],
    isAllOwned: boolean,
  ) => {
    setOwnedVariantsByCardId((current) =>
      setVariantSetOwnership(current, card.id, sectionVariantIds, !isAllOwned),
    );
  };

  const toggleWishlist = () => {
    setWishlistCardIds((current) => toggleWishlistCard(current, card.id));
  };

  return (
    <section
      aria-labelledby="card-detail-title"
      className="grid w-full self-start gap-3"
    >
      <div className="surface-card p-6 sm:p-8">
        <div className="flex flex-col items-start gap-3 2xs:flex-row 2xs:items-start 2xs:justify-between">
          <Link
            className="-ml-2 inline-flex h-9 items-center gap-1.5 rounded-button px-2 text-label text-text-secondary transition-colors duration-180 ease-premium hover:bg-surface-hover hover:text-text-primary"
            to={backTo}
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            {backLabel}
          </Link>

          <div className="flex w-full flex-col items-center gap-2 2xs:w-auto 2xs:items-end 2xs:gap-1.5">
            {browsingContextLabel && browsingPosition ? (
              <span className="flex items-center gap-1.5 whitespace-nowrap px-1 text-[11px] font-semibold uppercase tracking-wide">
                <span className="text-brand-violet">
                  {browsingContextLabel}
                </span>
                <span className="tabular-nums text-text-secondary">
                  {browsingPosition} / {neighborCards.length}
                </span>
              </span>
            ) : null}
            <div className="flex items-center gap-2">
              <NeighborLink
                card={previousCard}
                direction="previous"
                from={fromContext}
              />
              <span className="px-1 text-sm font-semibold tabular-nums text-text-secondary">
                #{card.number}
              </span>
              <NeighborLink
                card={nextCard}
                direction="next"
                from={fromContext}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-10">
          <div className="mx-auto w-full max-w-[300px] [container-type:inline-size]">
            <img
              alt={card.imageAlt}
              className="aspect-[63/88] w-full rounded-[5.25cqw] object-cover shadow-soft-md"
              decoding="async"
              src={card.imageUrl}
            />
          </div>

          <div className="min-w-0">
            <p className="text-label uppercase tracking-[0.18em] text-brand-blue">
              {getCardSetName(card)}
            </p>
            <h1
              id="card-detail-title"
              className="mt-1 text-2xl font-bold leading-tight text-text-primary sm:text-3xl"
            >
              {card.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="badge bg-surface-secondary text-text-secondary">
                #{card.number}
              </span>
              <span className="badge bg-surface-secondary text-text-secondary">
                {card.rarityLabel}
              </span>
              <span className="badge bg-surface-secondary text-text-secondary">
                {card.typeLabel}
              </span>
            </div>

            <div className="mt-6 max-w-sm">
              <div className="flex items-center justify-between text-[13px] font-semibold text-text-secondary">
                <span>Variants owned</span>
                <span className="tabular-nums text-text-primary">
                  {ownedCount} / {totalCount}
                </span>
              </div>
              <div className="progress-track mt-2">
                <div
                  className="progress-fill"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            <WishlistButton
              cardName={card.name}
              className="mt-6 h-12 w-44 px-5 text-sm"
              isWishlisted={isWishlisted}
              onClick={toggleWishlist}
            />

            {variantSections.map((section) => {
              const sectionOwnedCount = section.variants.filter((variant) =>
                ownedVariantIdSet.has(variant.id),
              ).length;
              const sectionAllOwned =
                sectionOwnedCount === section.variants.length;

              return (
                <div key={section.set} className="mt-8">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <h2 className="whitespace-nowrap text-[13px] 2xs:text-card text-text-primary">
                      {section.title}
                      <span className="ml-2 whitespace-nowrap text-[13px] 2xs:text-sm font-semibold tabular-nums text-text-secondary">
                        {sectionOwnedCount} / {section.variants.length}
                      </span>
                    </h2>
                    <button
                      className="ml-auto shrink-0 rounded-button text-[13px] 2xs:text-sm font-semibold text-primary transition-colors duration-180 ease-premium hover:text-primary-hover"
                      type="button"
                      onClick={() =>
                        toggleSectionAllOwned(
                          section.variants.map((variant) => variant.id),
                          sectionAllOwned,
                        )
                      }
                    >
                      {sectionAllOwned ? "Clear all" : "Mark all owned"}
                    </button>
                  </div>

                  <div className="mt-3 grid gap-2.5">
                    {section.variants.map((variant) => (
                      <VariantOwnershipRow
                        key={variant.id}
                        isOwned={ownedVariantIdSet.has(variant.id)}
                        variant={variant}
                        onToggle={toggleVariant}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CardDetailPage;
