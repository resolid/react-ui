import type { Ref, RefCallback } from "react";
import { useMergeRefs as useFloatingUiMergeRefs } from "@floating-ui/react";

type OptionalRef<T> = Ref<T> | undefined;

export const useMergeRefs = <T>(...refs: OptionalRef<T>[]): RefCallback<T> | null =>
  useFloatingUiMergeRefs([...refs]);
