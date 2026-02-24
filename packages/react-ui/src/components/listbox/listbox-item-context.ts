import type { HTMLProps, RefObject } from "react";
import type { AnyObject, SafeContext, UseSafeContext } from "../../primitives";
import type { ListboxBaseProps, ListboxItem, UseListboxResult } from "./use-listbox";
import { createSafeContext } from "../../primitives";

export type ListboxItemContextValue = {
  activeIndex: number | null;
  selectedIndices: number[];
  getItemProps: (userProps?: HTMLProps<HTMLElement> | undefined) => AnyObject;
  elementsRef: RefObject<(HTMLDivElement | null)[]>;
  typingRef: RefObject<boolean>;
  focusItemOnOpen?: boolean;
  virtual?: boolean;
} & Required<Pick<ListboxBaseProps<ListboxItem>, "renderItem">> &
  Required<Pick<UseListboxResult<ListboxItem>, "handleSelect">>;

const dest = createSafeContext<ListboxItemContextValue>({
  name: "ListboxItemContext",
});

export const ListboxItemContext: SafeContext<ListboxItemContextValue> = dest[0];
export const useListboxItem: UseSafeContext<ListboxItemContextValue> = dest[1];
