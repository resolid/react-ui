import { noop } from "@resolid/utils";
import { useSyncExternalStore } from "react";

export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => noop,
    () => true,
    () => false,
  );
}
