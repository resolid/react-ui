import type { CollectionItem } from "./collection-types";
import { createSafeContext, type SafeContext } from "../../primitives/context";

export type CollectionFlatContextValue<T extends CollectionItem = CollectionItem> = {
  flatItems: T[];
};

const [context, hook] = createSafeContext<CollectionFlatContextValue>({
  name: "CollectionFlatContext",
});

export const CollectionFlatContext: SafeContext<CollectionFlatContextValue> = context;

export function useCollectionFlat<T extends CollectionItem>() {
  return hook() as CollectionFlatContextValue<T>;
}
