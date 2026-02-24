import { noop } from "@resolid/utils";
import { useSyncExternalStore } from "react";

export const useHydrated = (): boolean =>
  useSyncExternalStore(
    () => noop,
    () => true,
    () => false,
  );
