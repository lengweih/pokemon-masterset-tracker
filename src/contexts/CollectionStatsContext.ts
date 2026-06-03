import { createContext, useContext } from "react";

import {
  collectionCardsByView,
  getCollectionViewProgress,
  isCollectionViewComingSoon,
} from "../data/collectionCards";
import { getOwnedVariantCount } from "../lib/collectionOwnership";
import type {
  CollectionStatsSummary,
  OwnedVariantsByCardId,
} from "../types/collection";

export const CollectionStatsContext =
  createContext<CollectionStatsSummary | null>(null);

// Derives the collection progress shown outside the collection page (nav
// progress label, dashboard summary stats, progress overview) from the
// persisted ownership store.
export const computeCollectionStats = (
  ownedVariantsByCardId: OwnedVariantsByCardId,
): CollectionStatsSummary => {
  const masterCards = collectionCardsByView.master;
  const master = getCollectionViewProgress("master", ownedVariantsByCardId);
  const grandmaster = getCollectionViewProgress(
    "grandmaster",
    ownedVariantsByCardId,
  );

  let cardsOwned = 0;
  let missingCards = 0;

  for (const card of masterCards) {
    if (getOwnedVariantCount(card, ownedVariantsByCardId) > 0) {
      cardsOwned += 1;
    } else {
      missingCards += 1;
    }
  }

  return {
    master,
    grandmaster: {
      ...grandmaster,
      comingSoon: isCollectionViewComingSoon("grandmaster"),
    },
    cardsOwned,
    missingCards,
  };
};

// Reads the shared collection stats. Must be used under a
// <CollectionStatsProvider>.
export function useCollectionStats(): CollectionStatsSummary {
  const stats = useContext(CollectionStatsContext);

  if (stats === null) {
    throw new Error(
      "useCollectionStats must be used within a CollectionStatsProvider",
    );
  }

  return stats;
}
