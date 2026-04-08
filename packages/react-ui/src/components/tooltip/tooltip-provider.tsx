import type { PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";
import type { UseToolTipReturnContexts } from "./use-tooltip";
import { PopperFloatingContext } from "../../primitives/popper/popper-floating-context";
import { PopperProvider } from "../../primitives/popper/popper-provider";
import { PopperTriggerContext } from "../../primitives/popper/popper-trigger-context";
import { TooltipRootContext } from "./tooltip-root-context";

export type TooltipProviderProps = {
  value: UseToolTipReturnContexts;
};

export function TooltipProvider({
  value,
  children,
}: PropsWithChildren<TooltipProviderProps>): JSX.Element {
  const { referenceContext, floatingContext, tooltipRootContext, ...popperContexts } = value;

  return (
    <PopperProvider value={popperContexts}>
      <PopperTriggerContext value={referenceContext}>
        <TooltipRootContext value={tooltipRootContext}>
          <PopperFloatingContext value={floatingContext}>{children}</PopperFloatingContext>
        </TooltipRootContext>
      </PopperTriggerContext>
    </PopperProvider>
  );
}
