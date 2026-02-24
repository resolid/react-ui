import type { PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";
import type { usePopover } from "./use-popover";
import { PopperAnchorContext } from "../../primitives/popper/popper-anchor-context";
import { PopperAriaContext } from "../../primitives/popper/popper-aria-context";
import { PopperArrowContext } from "../../primitives/popper/popper-arrow-context";
import { PopperDispatchContext } from "../../primitives/popper/popper-dispatch-context";
import { PopperFloatingContext } from "../../primitives/popper/popper-floating-context";
import { PopperPositionerContext } from "../../primitives/popper/popper-positioner-context";
import { PopperStateContext } from "../../primitives/popper/popper-state-context";
import { PopperTransitionContext } from "../../primitives/popper/popper-transtion-context";
import { PopperTriggerContext } from "../../primitives/popper/popper-trigger-context";
import { PopoverRootContext } from "./popover-root-context";

export type PopoverProviderProps = {
  value: ReturnType<typeof usePopover>;
};

export const PopoverProvider = ({
  value,
  children,
}: PropsWithChildren<PopoverProviderProps>): JSX.Element => {
  return (
    <PopperAriaContext value={value.ariaContext}>
      <PopperArrowContext value={value.arrowContext}>
        <PopperStateContext value={value.stateContext}>
          <PopperTriggerContext value={value.referenceContext}>
            <PopperAnchorContext value={value.anchorContext}>
              <PopoverRootContext value={value.popoverRootContext}>
                <PopperDispatchContext value={value.dispatchContext}>
                  <PopperTransitionContext value={value.transitionContext}>
                    <PopperPositionerContext value={value.positionerContext}>
                      <PopperFloatingContext value={value.floatingContext}>
                        {children}
                      </PopperFloatingContext>
                    </PopperPositionerContext>
                  </PopperTransitionContext>
                </PopperDispatchContext>
              </PopoverRootContext>
            </PopperAnchorContext>
          </PopperTriggerContext>
        </PopperStateContext>
      </PopperArrowContext>
    </PopperAriaContext>
  );
};
