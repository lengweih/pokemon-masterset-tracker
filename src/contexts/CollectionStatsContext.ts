import { createContext, useContext } from "react";

import {
  getCollectionViewProgress,
  isCollectionViewComingSoon,
} from "../data/collectionCards";
import type {
  CollectionStatsSummary,
  OwnedVariantsByCardId,
} from "../types/collection";

export const CollectionStatsContext =
  createContext<CollectionStatsSummary | null>(null);

// Derives the collection progress shown outside the collection page (nav
// progress label, dashboard progress overview) from the persisted ownership
// store.
export const computeCollectionStats = (
  ownedVariantsByCardId: OwnedVariantsByCardId,
): CollectionStatsSummary => {
  const master = getCollectionViewProgress("master", ownedVariantsByCardId);
  const grandmaster = getCollectionViewProgress(
    "grandmaster",
    ownedVariantsByCardId,
  );

  return {
    master,
    grandmaster: {
      ...grandmaster,
      comingSoon: isCollectionViewComingSoon("grandmaster"),
    },
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
