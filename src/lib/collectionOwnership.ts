import type {
  CollectionCard,
  CollectionPreferences,
  CollectionProgress,
  CollectionViewId,
  OwnedVariantsByCardId,
} from "../types/collection";

const collectionViewIds: readonly CollectionViewId[] = [
  "master",
  "grandmaster",
];

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export const isStringArray = (value: unknown): value is string[] => {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
};

export const isOwnedVariantsByCardId = (
  value: unknown,
): value is OwnedVariantsByCardId => {
  return isRecord(value) && Object.values(value).every(isStringArray);
};

// Returns the next wishlist card-id list with `cardId` toggled (added if absent,
// removed if present). Shared by the collection browser and the card detail page
// so the toggle semantics stay in one place.
export const toggleWishlistCard = (
  wishlistCardIds: readonly string[],
  cardId: string,
): string[] =>
  wishlistCardIds.includes(cardId)
    ? wishlistCardIds.filter((id) => id !== cardId)
    : [...wishlistCardIds, cardId];

export const isCollectionPreferences = (
  value: unknown,
): value is CollectionPreferences => {
  return (
    isRecord(value) &&
    collectionViewIds.includes(value.activeView as CollectionViewId)
  );
};

export const getOwnedVariantIds = (
  card: CollectionCard,
  ownedVariantsByCardId: OwnedVariantsByCardId,
) => {
  const ownedVariantIds = ownedVariantsByCardId[card.id] ?? [];
  const validVariantIdSet = new Set(card.variants.map((variant) => variant.id));

  return ownedVariantIds.filter((variantId) =>
    validVariantIdSet.has(variantId),
  );
};

export const getOwnedVariantCount = (
  card: CollectionCard,
  ownedVariantsByCardId: OwnedVariantsByCardId,
) => {
  return getOwnedVariantIds(card, ownedVariantsByCardId).length;
};

// Returns the next ownership map with `variantId` toggled for `cardId`. Cards
// with no owned variants are removed so the store stays tidy.
export const toggleVariantOwnership = (
  ownedVariantsByCardId: OwnedVariantsByCardId,
  cardId: string,
  variantId: string,
): OwnedVariantsByCardId => {
  const currentOwned = ownedVariantsByCardId[cardId] ?? [];
  const nextOwned = currentOwned.includes(variantId)
    ? currentOwned.filter((id) => id !== variantId)
    : [...currentOwned, variantId];

  return setCardOwnership(ownedVariantsByCardId, cardId, nextOwned);
};

// Returns the next ownership map after marking/clearing all of `setVariantIds`
// for `cardId`, while preserving owned variants outside that set. Used by the
// per-tab "mark all / clear all" so editing one set doesn't wipe the other.
export const setVariantSetOwnership = (
  ownedVariantsByCardId: OwnedVariantsByCardId,
  cardId: string,
  setVariantIds: readonly string[],
  isOwned: boolean,
): OwnedVariantsByCardId => {
  const setVariantIdSet = new Set(setVariantIds);
  const current = ownedVariantsByCardId[cardId] ?? [];
  const outsideSet = current.filter((id) => !setVariantIdSet.has(id));
  const nextOwned = isOwned ? [...outsideSet, ...setVariantIds] : outsideSet;

  return setCardOwnership(ownedVariantsByCardId, cardId, nextOwned);
};

// Returns the next ownership map with `cardId` set to exactly `variantIds`
// (empty clears the card).
const setCardOwnership = (
  ownedVariantsByCardId: OwnedVariantsByCardId,
  cardId: string,
  variantIds: readonly string[],
): OwnedVariantsByCardId => {
  const next = { ...ownedVariantsByCardId };

  if (variantIds.length > 0) {
    next[cardId] = [...variantIds];
  } else {
    delete next[cardId];
  }

  return next;
};

// Owned-variant completion as a rounded 0..100 percentage. Centralizes the
// rounding rule shared by the card detail page and the variant selector modal.
export const getCompletionPercentage = (
  ownedCount: number,
  totalCount: number,
): number => (totalCount > 0 ? Math.round((ownedCount / totalCount) * 100) : 0);

export const getCollectionProgress = (
  cards: readonly CollectionCard[],
  ownedVariantsByCardId: OwnedVariantsByCardId,
): CollectionProgress => {
  let total = 0;
  let collected = 0;

  for (const card of cards) {
    total += card.variants.length;
    collected += getOwnedVariantCount(card, ownedVariantsByCardId);
  }

  const remaining = Math.max(total - collected, 0);
  const percentage = total > 0 ? Math.round((collected / total) * 100) : 0;

  return {
    collected,
    percentage,
    remaining,
    total,
  };
};
