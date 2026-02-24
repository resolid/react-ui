import type { FloatingContext } from "@floating-ui/react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../index";

export type PopperArrowContextValue = {
  context: FloatingContext;
  setArrow: (node: SVGSVGElement) => void;
  arrowClassName?: string;
};

const [context, hook] = createSafeContext<PopperArrowContextValue>({
  name: "PopperArrowContext",
});

export const PopperArrowContext: SafeContext<PopperArrowContextValue> = context;
export const usePopperArrow: UseSafeContext<PopperArrowContextValue> = hook;
