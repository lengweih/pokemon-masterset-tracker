import type { CollectionViewId } from "../../types/collection";

export const COLLECTION_TAB_PANEL_ID = "collection-tab-panel";

export const getCollectionTabId = (view: CollectionViewId) =>
  `collection-tab-${view}`;
