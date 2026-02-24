import type { PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";
import type { useTooltip } from "./use-tooltip";
import { PopperAnchorContext } from "../../primitives/popper/popper-anchor-context";
import { PopperArrowContext } from "../../primitives/popper/popper-arrow-context";
import { PopperFloatingContext } from "../../primitives/popper/popper-floating-context";
import { PopperPositionerContext } from "../../primitives/popper/popper-positioner-context";
import { PopperStateContext } from "../../primitives/popper/popper-state-context";
import { PopperTransitionContext } from "../../primitives/popper/popper-transtion-context";
import { PopperTriggerContext } from "../../primitives/popper/popper-trigger-context";
import { TooltipRootContext } from "./tooltip-root-context";

export type TooltipProviderProps = {
  value: ReturnType<typeof useTooltip>;
};

export const TooltipProvider = ({
  value,
  children,
}: PropsWithChildren<TooltipProviderProps>): JSX.Element => {
  return (
    <PopperArrowContext value={value.arrowContext}>
      <PopperStateContext value={value.stateContext}>
        <PopperTriggerContext value={value.referenceContext}>
          <PopperAnchorContext value={value.anchorContext}>
            <TooltipRootContext value={value.tooltipRootContext}>
              <PopperTransitionContext value={value.transitionContext}>
                <PopperPositionerContext value={value.positionerContext}>
                  <PopperFloatingContext value={value.floatingContext}>
                    {children}
                  </PopperFloatingContext>
                </PopperPositionerContext>
              </PopperTransitionContext>
            </TooltipRootContext>
          </PopperAnchorContext>
        </PopperTriggerContext>
      </PopperStateContext>
    </PopperArrowContext>
  );
};
