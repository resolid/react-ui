import type { ScrollToOptions } from "@tanstack/react-virtual";
import type { RefObject } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

export type CollectionScrollTo = (index: number, options?: ScrollToOptions) => void;

export type CollectionScrollContextValue = {
  scrollRef: RefObject<HTMLElement | null>;
  scrollToRef: RefObject<CollectionScrollTo | null>;
};

const [context, hook] = createSafeContext<CollectionScrollContextValue>({
  name: "CollectionScrollContext",
});

export const CollectionScrollContext: SafeContext<CollectionScrollContextValue> = context;
export const useCollectionScroll: UseSafeContext<CollectionScrollContextValue> = hook;
