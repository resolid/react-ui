import type { CSSProperties, RefCallback } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

export type PopperPositionerContextValue = {
  setPositioner: RefCallback<HTMLElement> | null;
  positionerStyles: CSSProperties;
};

const dest = createSafeContext<PopperPositionerContextValue>({
  name: "PopperPositionerContext",
});

export const PopperPositionerContext: SafeContext<PopperPositionerContextValue> = dest[0];
export const usePopperPositioner: UseSafeContext<PopperPositionerContextValue> = dest[1];
