import type { VirtualItem } from "@tanstack/react-virtual";
import type { ListboxFlatItem } from "./use-listbox";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type ListboxVirtualizerContextValue = {
  virtualItems: VirtualItem[];
  flatItems: ListboxFlatItem[];
};

const [context, hook] = createSafeContext<ListboxVirtualizerContextValue>({
  name: "ListboxVirtualizerContext",
});

export const ListboxVirtualizerContext: SafeContext<ListboxVirtualizerContextValue> = context;
export const useListboxVirtualizer: UseSafeContext<ListboxVirtualizerContextValue> = hook;
