import type {
  CollectionCard,
  CollectionPreferences,
  CollectionProgress,
  CollectionViewId,
  OwnedVariantsByCardId,
} from "../types/collection";

const collectionViewIds: readonly CollectionViewId[] = ["master", "grandmaster"];

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export const isStringArray = (value: unknown): value is string[] => {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
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

export const getCardCompletion = (
  card: CollectionCard,
  ownedVariantsByCardId: OwnedVariantsByCardId,
) => {
  if (card.variants.length === 0) {
    return 0;
  }

  return getOwnedVariantCount(card, ownedVariantsByCardId) / card.variants.length;
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
