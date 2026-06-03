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

export const getCardCompletion = (
  card: CollectionCard,
  ownedVariantsByCardId: OwnedVariantsByCardId,
) => {
  if (card.variants.length === 0) {
    return 0;
  }

  return (
    getOwnedVariantCount(card, ownedVariantsByCardId) / card.variants.length
  );
};

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
