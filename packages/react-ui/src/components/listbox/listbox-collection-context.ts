import type { ListboxNodeItem } from "./use-listbox";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type ListboxCollectionContextValue = {
  nodeItems: ListboxNodeItem[];
};

const desc = createSafeContext<ListboxCollectionContextValue>({
  name: "ListboxCollectionContext",
});

export const ListboxCollectionContext: SafeContext<ListboxCollectionContextValue> = desc[0];
export const useListboxCollection: UseSafeContext<ListboxCollectionContextValue> = desc[1];
