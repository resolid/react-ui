import type { Dispatch, SetStateAction } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

export type CompositeContextValue = {
  activeIndex: number | undefined;
  setActiveIndex: Dispatch<SetStateAction<number | undefined>>;
  setActiveElement?: Dispatch<SetStateAction<HTMLElement | null>>;
};

const [context, hook] = createSafeContext<CompositeContextValue>({ name: "CompositeContext" });

export const CompositeContext: SafeContext<CompositeContextValue> = context;
export const useComposite: UseSafeContext<CompositeContextValue> = hook;
