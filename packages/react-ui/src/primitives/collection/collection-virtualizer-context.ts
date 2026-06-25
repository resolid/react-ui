import type { VirtualItem } from "@tanstack/react-virtual";
import type { CollectionItem } from "./types";
import { createSafeContext, type SafeContext } from "../../primitives/context";

export type ConnectionVirtualizerContextValue<T extends CollectionItem = CollectionItem> = {
  virtualItems: VirtualItem[];
  flatItems: T[];
};

const [context, hook] = createSafeContext<ConnectionVirtualizerContextValue>({
  name: "ListboxVirtualizerContext",
});

export const CollectionVirtualizerContext: SafeContext<ConnectionVirtualizerContextValue> = context;

export function useCollectionVirtualizer<T extends CollectionItem>() {
  return hook(true) as ConnectionVirtualizerContextValue<T> | undefined;
}
