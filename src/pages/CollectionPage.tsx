import { useCallback, useMemo } from "react";

import { CollectionBrowser } from "../components/collection/CollectionBrowser";
import { CollectionHero } from "../components/collection/CollectionHero";
import { collectionCardsByView } from "../data/collectionCards";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import {
  getCollectionProgress,
  isCollectionPreferences,
  isOwnedVariantsByCardId,
  isStringArray,
} from "../lib/collectionOwnership";
import { STORAGE_KEYS } from "../lib/storageKeys";
import type {
  CollectionPreferences,
  CollectionViewId,
  OwnedVariantsByCardId,
} from "../types/collection";

export function CollectionPage() {
  const [preferences, setPreferences] =
    useLocalStorageState<CollectionPreferences>(
      STORAGE_KEYS.preferences,
      { activeView: "master" },
      isCollectionPreferences,
    );
  const activeView = preferences.activeView;
  const setActiveView = useCallback(
    (nextView: CollectionViewId) => {
      setPreferences((currentPreferences) => ({
        ...currentPreferences,
        activeView: nextView,
      }));
    },
    [setPreferences],
  );
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
  const collectionProgress = useMemo(
    () =>
      getCollectionProgress(
        collectionCardsByView[activeView],
        ownedVariantsByCardId,
      ),
    [activeView, ownedVariantsByCardId],
  );

  return (
    <section className="grid w-full self-start gap-3 lg:h-full lg:min-h-0 lg:self-stretch lg:grid-rows-[auto_minmax(0,1fr)]">
      <CollectionHero progress={collectionProgress} />
      <CollectionBrowser
        activeView={activeView}
        ownedVariantsByCardId={ownedVariantsByCardId}
        wishlistCardIds={wishlistCardIds}
        onActiveViewChange={setActiveView}
        onOwnedVariantsChange={setOwnedVariantsByCardId}
        onWishlistCardIdsChange={setWishlistCardIds}
      />
    </section>
  );
}

export default CollectionPage;
