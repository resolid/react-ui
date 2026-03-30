import { isFunction, runIf } from "@resolid/utils";
import { type SetStateAction, useSyncExternalStore } from "react";
import { useIsomorphicEffect } from "../use-isomorphic-effect";

export function useLocalStorage<T>(
  key: string,
  initialValue?: (() => T) | T,
): readonly [T | undefined, (value: SetStateAction<T>) => void] {
  const initialResolved = isFunction(initialValue) ? initialValue() : initialValue;

  const getSnapshot = () => getLocalStorageItem(key);
  const getServerSnapshot = () => JSON.stringify(initialResolved);

  const store = useSyncExternalStore(localStorageSubscribe, getSnapshot, getServerSnapshot);

  const setValue = (value: SetStateAction<T>) => {
    const nextValue = runIf(value, store ? JSON.parse(store) : initialResolved);

    setLocalStorageItem(key, nextValue !== undefined ? JSON.stringify(nextValue) : undefined);
  };

  useIsomorphicEffect(() => {
    if (getLocalStorageItem(key) === undefined && initialResolved !== undefined) {
      setLocalStorageItem(key, JSON.stringify(initialResolved));
    }
  }, [key, initialResolved]);

  return [store !== undefined ? (JSON.parse(store) as T) : store, setValue] as const;
}

function getLocalStorageItem(key: string) {
  return window.localStorage.getItem(key) ?? undefined;
}

function setLocalStorageItem(key: string, value: string | undefined) {
  const oldValue = getLocalStorageItem(key);

  if (value === undefined) {
    window.localStorage.removeItem(key);
  } else {
    window.localStorage.setItem(key, value);
  }

  window.dispatchEvent(
    new StorageEvent("storage", {
      key,
      oldValue,
      newValue: value,
      storageArea: window.localStorage,
    }),
  );
}

function localStorageSubscribe(callback: () => void) {
  window.addEventListener("storage", callback);

  return () => window.removeEventListener("storage", callback);
}
