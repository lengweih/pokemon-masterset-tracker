import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { VariantOwnershipRow } from "../components/collection/VariantOwnershipRow";
import { WishlistButton } from "../components/collection/WishlistButton";
import {
  getCollectionCardById,
  getCollectionCardNeighbors,
} from "../data/collectionCards";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import {
  getOwnedVariantIds,
  isOwnedVariantsByCardId,
  isStringArray,
  setVariantSetOwnership,
  toggleVariantOwnership,
} from "../lib/collectionOwnership";
import { STORAGE_KEYS } from "../lib/storageKeys";
import { ROUTES } from "../routes/paths";
import type {
  CollectionCard,
  OwnedVariantsByCardId,
} from "../types/collection";

function NeighborLink({
  card,
  direction,
}: {
  card: CollectionCard | undefined;
  direction: "previous" | "next";
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
      to={`/collection/${card.id}`}
    >
      <Icon className="h-5 w-5" strokeWidth={2} />
    </Link>
  );
}

export function CardDetailPage() {
  const { cardId } = useParams<{ cardId: string }>();
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

  const { previousCard, nextCard } = getCollectionCardNeighbors(card.id);
  const ownedVariantIds = getOwnedVariantIds(card, ownedVariantsByCardId);
  const ownedVariantIdSet = new Set(ownedVariantIds);
  const ownedCount = ownedVariantIds.length;
  const totalCount = card.variants.length;
  const completionPercentage =
    totalCount > 0 ? Math.round((ownedCount / totalCount) * 100) : 0;
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
    setWishlistCardIds((current) =>
      current.includes(card.id)
        ? current.filter((id) => id !== card.id)
        : [...current, card.id],
    );
  };

  return (
    <section
      aria-labelledby="card-detail-title"
      className="grid w-full self-start gap-3"
    >
      <div className="surface-card p-6 sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <Link
            className="-ml-2 inline-flex h-9 items-center gap-1.5 rounded-button px-2 text-label text-text-secondary transition-colors duration-180 ease-premium hover:bg-surface-hover hover:text-text-primary"
            to={ROUTES.collection}
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            Back to Collection
          </Link>

          <div className="flex items-center gap-2">
            <NeighborLink card={previousCard} direction="previous" />
            <span className="px-1 text-sm font-semibold tabular-nums text-text-secondary">
              #{card.number}
            </span>
            <NeighborLink card={nextCard} direction="next" />
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
              Prismatic Evolutions
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
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-card text-text-primary">
                      {section.title}
                      <span className="ml-2 text-sm font-semibold tabular-nums text-text-secondary">
                        {sectionOwnedCount} / {section.variants.length}
                      </span>
                    </h2>
                    <button
                      className="rounded-button text-sm font-semibold text-primary transition-colors duration-180 ease-premium hover:text-primary-hover"
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
