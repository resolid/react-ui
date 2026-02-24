import type { ListboxNodeItem } from "./use-listbox";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type ListboxCollectionContextValue = {
  nodeItems: ListboxNodeItem[];
};

const [context, hook] = createSafeContext<ListboxCollectionContextValue>({
  name: "ListboxCollectionContext",
});

export const ListboxCollectionContext: SafeContext<ListboxCollectionContextValue> = context;
export const useListboxCollection: UseSafeContext<ListboxCollectionContextValue> = hook;
