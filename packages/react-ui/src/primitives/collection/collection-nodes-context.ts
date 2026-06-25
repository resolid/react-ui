import type { CollectionItem } from "./types";
import { createSafeContext, type SafeContext } from "../../primitives/context";

export type CollectionNodesContextValue<T extends CollectionItem = CollectionItem> = {
  nodeItems: T[];
};

const [context, hook] = createSafeContext<CollectionNodesContextValue>({
  name: "ListboxCollectionContext",
});

export const CollectionNodesContext: SafeContext<CollectionNodesContextValue> = context;

export function useCollectionNodes<T extends CollectionItem>() {
  return hook() as CollectionNodesContextValue<T>;
}
