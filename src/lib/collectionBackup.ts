import { mastersetOptions } from "../data/mastersetOptions";
import { notifyLocalStorageChange } from "../hooks/useLocalStorageState";
import type { OwnedVariantsByCardId } from "../types/collection";
import { isOwnedVariantsByCardId, isStringArray } from "./collectionOwnership";
import { buildSetStorageKeys } from "./storageKeys";

const BACKUP_VERSION = 1;

// One master set's saved data inside a backup.
export interface SetBackup {
  collection: OwnedVariantsByCardId;
  wishlist: string[];
}

// A full backup: every master set's data, keyed by set id. This shape scales to
// any number of sets without a format change.
export interface CollectionBackup {
  sets: Record<string, SetBackup>;
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const readStoredJson = (key: string): unknown => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as unknown) : null;
  } catch {
    return null;
  }
};

// Reads one set's saved collection + wishlist, falling back to empties.
const readSetBackup = (setId: string): SetBackup => {
  const keys = buildSetStorageKeys(setId);
  const collection = readStoredJson(keys.collection);
  const wishlist = readStoredJson(keys.wishlist);

  return {
    collection: isOwnedVariantsByCardId(collection) ? collection : {},
    wishlist: isStringArray(wishlist) ? wishlist : [],
  };
};

const setBackupHasData = (set: SetBackup): boolean => {
  return Object.keys(set.collection).length > 0 || set.wishlist.length > 0;
};

// True when any known master set has owned variants or wishlisted cards saved.
export const hasExistingCollectionData = (): boolean => {
  return mastersetOptions.some((option) =>
    setBackupHasData(readSetBackup(option.id)),
  );
};

// Downloads every set's collection + wishlist as a JSON backup file. Sets with
// no data are omitted to keep the file lean.
export const downloadCollectionBackup = (): void => {
  const sets: Record<string, SetBackup> = {};
  for (const option of mastersetOptions) {
    const set = readSetBackup(option.id);
    if (setBackupHasData(set)) {
      sets[option.id] = set;
    }
  }

  const backup = {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    sets,
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `masterset-tracker-backup-${new Date()
    .toISOString()
    .slice(0, 10)}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};

// Validates a single set entry from a parsed backup. Returns null on bad shape.
const parseSetBackup = (value: unknown): SetBackup | null => {
  if (!isRecord(value)) {
    return null;
  }

  const collection = value.collection ?? {};
  const wishlist = value.wishlist ?? [];
  if (!isOwnedVariantsByCardId(collection) || !isStringArray(wishlist)) {
    return null;
  }

  return { collection, wishlist };
};

// Parses pasted/uploaded backup text. Returns null when it isn't a valid
// backup (so callers can show an error). Unknown set ids are accepted so a
// newer backup can be restored on an older build.
export const parseCollectionBackup = (
  text: string,
): CollectionBackup | null => {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return null;
  }

  if (!isRecord(data) || !isRecord(data.sets)) {
    return null;
  }

  const sets: Record<string, SetBackup> = {};
  for (const [setId, value] of Object.entries(data.sets)) {
    const set = parseSetBackup(value);
    if (!set) {
      return null;
    }
    sets[setId] = set;
  }

  if (Object.keys(sets).length === 0) {
    return null;
  }

  return { sets };
};

// Writes an imported backup to localStorage, replacing the data for each set
// present in the backup. Sets not in the backup are left untouched.
export const applyCollectionBackup = (backup: CollectionBackup): void => {
  for (const [setId, set] of Object.entries(backup.sets)) {
    const keys = buildSetStorageKeys(setId);
    window.localStorage.setItem(
      keys.collection,
      JSON.stringify(set.collection),
    );
    window.localStorage.setItem(keys.wishlist, JSON.stringify(set.wishlist));
    // Notify live useLocalStorageState consumers so the UI reflects the import
    // even without a reload.
    notifyLocalStorageChange(keys.collection);
    notifyLocalStorageChange(keys.wishlist);
  }
};
