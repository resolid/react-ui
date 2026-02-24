import type { ReferenceType } from "@floating-ui/react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

export type PopperAnchorContextValue = {
  setPositionReference: (node: ReferenceType | null) => void;
};

const [context, hook] = createSafeContext<PopperAnchorContextValue>({
  name: "PopperAnchorContext",
});

export const PopperAnchorContext: SafeContext<PopperAnchorContextValue> = context;
export const usePopperAnchor: UseSafeContext<PopperAnchorContextValue> = hook;
