const STORAGE_NAMESPACE = "pokemon-masterset-tracker";

// The set whose data the app currently reads/writes. Storage is namespaced per
// set so future sets never share ownership data.
export const CURRENT_SET_ID = "prismatic-evolutions";

export interface SetStorageKeys {
  collection: string;
  wishlist: string;
  preferences: string;
}

// Builds the localStorage keys for a given master set.
export const buildSetStorageKeys = (setId: string): SetStorageKeys => {
  const prefix = `${STORAGE_NAMESPACE}.${setId}`;
  return {
    collection: `${prefix}.collection`,
    wishlist: `${prefix}.wishlist`,
    preferences: `${prefix}.preferences`,
  };
};

// Keys for the currently active master set (single-set for now).
export const STORAGE_KEYS = buildSetStorageKeys(CURRENT_SET_ID);
