const STORAGE_PREFIX = "pokemon-masterset-tracker.prismatic-evolutions";

export const STORAGE_KEYS = {
  collection: `${STORAGE_PREFIX}.collection`,
  wishlist: `${STORAGE_PREFIX}.wishlist`,
  preferences: `${STORAGE_PREFIX}.preferences`,
} as const;
