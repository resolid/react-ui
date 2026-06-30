import type { AnyObject } from "../polymorphic";
import { createSafeContext, type SafeContext } from "../../primitives/context";

export type CollectionFlatContextValue<T extends AnyObject = AnyObject> = {
  flatItems: T[];
};

const [context, hook] = createSafeContext<CollectionFlatContextValue>({
  name: "CollectionFlatContext",
});

export const CollectionFlatContext: SafeContext<CollectionFlatContextValue> = context;

export function useCollectionFlat<T extends AnyObject>() {
  return hook() as CollectionFlatContextValue<T>;
}
