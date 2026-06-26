import type { VirtualItem } from "@tanstack/react-virtual";
import { createSafeContext, type SafeContext } from "../../primitives/context";

export type ConnectionVirtualizerContextValue = {
  virtualItems: VirtualItem[];
};

const [context, hook] = createSafeContext<ConnectionVirtualizerContextValue>({
  name: "ConnectionVirtualizerContext",
});

export const CollectionVirtualizerContext: SafeContext<ConnectionVirtualizerContextValue> = context;

export function useCollectionVirtualizer(): ConnectionVirtualizerContextValue | undefined {
  return hook(true);
}
