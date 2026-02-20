import type { Ref, RefCallback } from "react";

type OptionalRef<T> = Ref<T> | undefined;

import { useMergeRefs as useFloatingUiMergeRefs } from "@floating-ui/react";

export const useMergeRefs = <T>(...refs: OptionalRef<T>[]): RefCallback<T> | null => {
  return useFloatingUiMergeRefs([...refs]);
};
