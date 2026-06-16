import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives/context";

export type TooltipRootContextValue = {
  interactive: boolean;
  contentClassName?: string;
};

const [context, hook] = createSafeContext<TooltipRootContextValue>({
  name: "TooltipRootContext",
});

export const TooltipRootContext: SafeContext<TooltipRootContextValue> = context;
export const useTooltipRoot: UseSafeContext<TooltipRootContextValue> = hook;
