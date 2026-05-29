import { useCallback, useEffect, useRef, useState } from "react";

type LocalStorageValidator<TValue> = (value: unknown) => value is TValue;

// Dispatched after a write so other hook instances using the same key (e.g. the
// collection page, the nav progress, the dashboard stats) re-read and stay in
// sync within the same tab. The native "storage" event only fires across tabs.
const LOCAL_STORAGE_SYNC_EVENT = "local-storage-state-sync";

const readLocalStorageValue = <TValue,>(
  key: string,
  initialValue: TValue,
  validateValue?: LocalStorageValidator<TValue>,
) => {
  if (typeof window === "undefined") {
    return initialValue;
  }

  try {
    const storedValue = window.localStorage.getItem(key);

    if (!storedValue) {
      return initialValue;
    }

    const parsedValue = JSON.parse(storedValue) as unknown;

    if (validateValue && !validateValue(parsedValue)) {
      return initialValue;
    }

    return parsedValue as TValue;
  } catch {
    return initialValue;
  }
};

export function useLocalStorageState<TValue>(
  key: string,
  initialValue: TValue,
  validateValue?: LocalStorageValidator<TValue>,
) {
  const [value, setValue] = useState(() =>
    readLocalStorageValue(key, initialValue, validateValue),
  );

  // Keep the latest value/initial/validator in refs so the setter and the sync
  // effect stay stable (depending only on `key`). Updated in an effect rather
  // than during render.
  const valueRef = useRef(value);
  const initialValueRef = useRef(initialValue);
  const validateValueRef = useRef(validateValue);

  useEffect(() => {
    valueRef.current = value;
    initialValueRef.current = initialValue;
    validateValueRef.current = validateValue;
  });

  const setStoredValue = useCallback(
    (nextValue: TValue | ((currentValue: TValue) => TValue)) => {
      const resolvedValue =
        typeof nextValue === "function"
          ? (nextValue as (currentValue: TValue) => TValue)(valueRef.current)
          : nextValue;

      setValue(resolvedValue);

      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(key, JSON.stringify(resolvedValue));
          window.dispatchEvent(
            new CustomEvent(LOCAL_STORAGE_SYNC_EVENT, { detail: key }),
          );
        } catch {
          // Keep the in-memory state usable even if storage is unavailable.
        }
      }
    },
    [key],
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const syncFromStorage = () => {
      setValue(
        readLocalStorageValue(
          key,
          initialValueRef.current,
          validateValueRef.current,
        ),
      );
    };

    const handleSyncEvent = (event: Event) => {
      if ((event as CustomEvent<string>).detail === key) {
        syncFromStorage();
      }
    };

    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === key) {
        syncFromStorage();
      }
    };

    window.addEventListener(LOCAL_STORAGE_SYNC_EVENT, handleSyncEvent);
    window.addEventListener("storage", handleStorageEvent);

    return () => {
      window.removeEventListener(LOCAL_STORAGE_SYNC_EVENT, handleSyncEvent);
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, [key]);

  return [value, setStoredValue] as const;
}
