import type { CSSProperties, RefCallback } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

export type PopperPositionerContextValue = {
  setPositioner: RefCallback<HTMLElement> | null;
  positionerStyles: CSSProperties;
};

const [context, hook] = createSafeContext<PopperPositionerContextValue>({
  name: "PopperPositionerContext",
});

export const PopperPositionerContext: SafeContext<PopperPositionerContextValue> = context;
export const usePopperPositioner: UseSafeContext<PopperPositionerContextValue> = hook;
