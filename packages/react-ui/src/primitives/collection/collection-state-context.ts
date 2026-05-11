import type { BinarySize } from "../../shared/styles";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type CollectionStateContextValue = {
  size: BinarySize;
  multiple: boolean;
  disabled: boolean;
  readOnly: boolean;
};

const [stateContext, stateHook] = createSafeContext<CollectionStateContextValue>({
  name: "CollectionStateContext",
});

export const CollectionStateContext: SafeContext<CollectionStateContextValue> = stateContext;
export const useCollectionState: UseSafeContext<CollectionStateContextValue> = stateHook;
