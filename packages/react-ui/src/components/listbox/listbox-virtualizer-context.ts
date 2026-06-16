import type { VirtualItem } from "@tanstack/react-virtual";
import type { ListboxFlatItem } from "./use-listbox";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives/context";

export type ListboxVirtualizerContextValue = {
  virtualItems: VirtualItem[];
  flatItems: ListboxFlatItem[];
};

const [context, hook] = createSafeContext<ListboxVirtualizerContextValue>({
  name: "ListboxVirtualizerContext",
});

// react-doctor-disable-next-line deslop/unused-export
export const ListboxVirtualizerContext: SafeContext<ListboxVirtualizerContextValue> = context;
export const useListboxVirtualizer: UseSafeContext<ListboxVirtualizerContextValue> = hook;
