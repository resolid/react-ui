import type { Dispatch, SetStateAction } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

export type CompositeContextValue = {
  activeIndex: number | undefined;
  setActiveIndex: Dispatch<SetStateAction<number | undefined>>;
  setActiveElement?: Dispatch<SetStateAction<HTMLElement | null>>;
};

const dest = createSafeContext<CompositeContextValue>({ name: "CompositeContext" });

export const CompositeContext: SafeContext<CompositeContextValue> = dest[0];
export const useComposite: UseSafeContext<CompositeContextValue> = dest[1];
