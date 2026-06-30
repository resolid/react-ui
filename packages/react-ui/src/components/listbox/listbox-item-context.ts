import type { HTMLProps, RefObject } from "react";
import type { AnyObject } from "../../primitives/polymorphic";
import type { ListboxBaseProps, UseListboxResult } from "./use-listbox";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives/context";

export type ListboxItemContextValue<T extends AnyObject = AnyObject> = {
  firstIndex: number;
  activeIndex: number | null;
  selectedIndex: number | null;
  getItemProps: (userProps?: HTMLProps<HTMLElement>) => AnyObject;
  getItemValue: (item: T) => string | number;
  elementsRef: RefObject<(HTMLDivElement | null)[]>;
  labelsRef: RefObject<(string | null)[]>;
  typingRef: RefObject<boolean>;
  focusItemOnOpen?: boolean;
  virtual?: boolean;
} & Required<Pick<ListboxBaseProps<T>, "renderItem">> &
  Required<Pick<UseListboxResult<T>, "handleSelect">>;

const [context, hook] = createSafeContext<ListboxItemContextValue>({
  name: "ListboxItemContext",
});

export const ListboxItemContext: SafeContext<ListboxItemContextValue> = context;
export const useListboxItem: UseSafeContext<ListboxItemContextValue> = hook;
