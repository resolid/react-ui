import type { Dispatch, HTMLProps, RefObject, SetStateAction } from "react";
import {
  type AnyObject,
  createSafeContext,
  type SafeContext,
  type UseSafeContext,
} from "../../primitives";

export type ListboxFilterContextValue = {
  filterInputRef: RefObject<HTMLInputElement | null>;
  setFilterKeyword: Dispatch<SetStateAction<string | undefined>>;
  getNavigationProps: (userProps?: HTMLProps<HTMLElement> | undefined) => AnyObject;
};

const [context, hook] = createSafeContext<ListboxFilterContextValue>({
  name: "ListboxFilterContext",
});

export const ListboxFilterContext: SafeContext<ListboxFilterContextValue> = context;
export const useListboxFilter: UseSafeContext<ListboxFilterContextValue> = hook;
