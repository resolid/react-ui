import type { CollectionFields } from "./types";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives/context";

export type CollectionFieldsContextValue = CollectionFields;

const [context, hook] = createSafeContext<CollectionFieldsContextValue>({
  name: "CollectionFieldsContext",
});

export const CollectionFieldsContext: SafeContext<CollectionFieldsContextValue> = context;
export const useCollectionFields: UseSafeContext<CollectionFieldsContextValue> = hook;
