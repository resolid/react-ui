import type { VirtualItem } from "@tanstack/react-virtual";
import type { ListboxFlatItem } from "./use-listbox";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type ListboxVirtualizerContextValue = {
  virtualItems: VirtualItem[];
  flatItems: ListboxFlatItem[];
};

const dest = createSafeContext<ListboxVirtualizerContextValue>({
  name: "ListboxVirtualizerContext",
});

export const ListboxVirtualizerContext: SafeContext<ListboxVirtualizerContextValue> = dest[0];
export const useListboxVirtualizer: UseSafeContext<ListboxVirtualizerContextValue> = dest[1];
