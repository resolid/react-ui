import type { HTMLProps, RefObject } from "react";
import type { ListboxBaseProps, ListboxItem, UseListboxResult } from "./use-listbox";
import {
  type AnyObject,
  type SafeContext,
  type UseSafeContext,
  createSafeContext,
} from "../../primitives";

export type ListboxItemContextValue = {
  activeIndex: number | null;
  selectedIndices: number[];
  getItemProps: (userProps?: HTMLProps<HTMLElement>) => AnyObject;
  elementsRef: RefObject<(HTMLDivElement | null)[]>;
  typingRef: RefObject<boolean>;
  focusItemOnOpen?: boolean;
  virtual?: boolean;
} & Required<Pick<ListboxBaseProps<ListboxItem>, "renderItem">> &
  Required<Pick<UseListboxResult<ListboxItem>, "handleSelect">>;

const [context, hook] = createSafeContext<ListboxItemContextValue>({
  name: "ListboxItemContext",
});

export const ListboxItemContext: SafeContext<ListboxItemContextValue> = context;
export const useListboxItem: UseSafeContext<ListboxItemContextValue> = hook;
