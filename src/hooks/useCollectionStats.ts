import { useMemo } from "react";

import {
  collectionCardsByView,
  isCollectionViewComingSoon,
} from "../data/collectionCards";
import {
  getCollectionProgress,
  getOwnedVariantCount,
  isOwnedVariantsByCardId,
} from "../lib/collectionOwnership";
import { STORAGE_KEYS } from "../lib/storageKeys";
import type {
  CollectionStatsSummary,
  OwnedVariantsByCardId,
} from "../types/collection";
import { useLocalStorageState } from "./useLocalStorageState";

// Single source of truth for collection progress shown outside the collection
// page (nav progress label, dashboard summary stats, progress overview). Reads
// the same persisted ownership store, so values stay accurate and update live.
export function useCollectionStats(): CollectionStatsSummary {
  const [ownedVariantsByCardId] = useLocalStorageState<OwnedVariantsByCardId>(
    STORAGE_KEYS.collection,
    {},
    isOwnedVariantsByCardId,
  );

  return useMemo(() => {
    const masterCards = collectionCardsByView.master;
    const master = getCollectionProgress(masterCards, ownedVariantsByCardId);
    const grandmaster = getCollectionProgress(
      collectionCardsByView.grandmaster,
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
  }, [ownedVariantsByCardId]);
}
