import type { Dispatch, HTMLProps, RefObject, SetStateAction } from "react";
import {
  type AnyObject,
  createSafeContext,
  type SafeContext,
  type UseSafeContext,
} from "../../primitives";

export type ListboxFilterContextValue = {
  filterInputRef: RefObject<HTMLInputElement | null>;
  setHasFilter: Dispatch<SetStateAction<boolean>>;
  setFilterKeyword: Dispatch<SetStateAction<string | undefined>>;
  getNavigationProps: (userProps?: HTMLProps<HTMLElement>) => AnyObject;
};

const [context, hook] = createSafeContext<ListboxFilterContextValue>({
  name: "ListboxFilterContext",
});

export const ListboxFilterContext: SafeContext<ListboxFilterContextValue> = context;
export const useListboxFilter: UseSafeContext<ListboxFilterContextValue> = hook;
