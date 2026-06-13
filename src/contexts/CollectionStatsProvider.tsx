import { useMemo } from "react";
import type { ReactNode } from "react";

import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { isOwnedVariantsByCardId } from "../lib/collectionOwnership";
import { STORAGE_KEYS } from "../lib/storageKeys";
import type { OwnedVariantsByCardId } from "../types/collection";
import {
  CollectionStatsContext,
  computeCollectionStats,
} from "./CollectionStatsContext";

// Computes collection progress once and shares it with every consumer so the
// localStorage read + full collection scan only runs a single time per render
// instead of once per useCollectionStats() consumer.
export function CollectionStatsProvider({ children }: { children: ReactNode }) {
  const [ownedVariantsByCardId] = useLocalStorageState<OwnedVariantsByCardId>(
    STORAGE_KEYS.collection,
    {},
    isOwnedVariantsByCardId,
  );

  const stats = useMemo(
    () => computeCollectionStats(ownedVariantsByCardId),
    [ownedVariantsByCardId],
  );

  return (
    <CollectionStatsContext.Provider value={stats}>
      {children}
    </CollectionStatsContext.Provider>
  );
}
