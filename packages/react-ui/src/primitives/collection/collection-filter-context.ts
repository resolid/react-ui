import type { Dispatch, HTMLProps, RefObject, SetStateAction } from "react";
import type { AnyObject } from "../../primitives/polymorphic";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives/context";

export type CollectionFilterContextValue = {
  filterInputRef: RefObject<HTMLInputElement | null>;
  setHasFilter: Dispatch<SetStateAction<boolean>>;
  setFilterKeyword: Dispatch<SetStateAction<string | undefined>>;
  getNavigationProps: (userProps?: HTMLProps<HTMLElement>) => AnyObject;
};

const [context, hook] = createSafeContext<CollectionFilterContextValue>({
  name: "CollectionFilterContext",
});

export const CollectionFilterContext: SafeContext<CollectionFilterContextValue> = context;
export const useCollectionFilter: UseSafeContext<CollectionFilterContextValue> = hook;
