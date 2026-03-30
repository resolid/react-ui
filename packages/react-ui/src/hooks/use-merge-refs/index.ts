import type { Ref, RefCallback } from "react";
import { useMergeRefs as useFloatingUiMergeRefs } from "@floating-ui/react";

type OptionalRef<T> = Ref<T> | undefined;

export function useMergeRefs<T>(...refs: OptionalRef<T>[]): RefCallback<T> | null {
  return useFloatingUiMergeRefs([...refs]);
}
