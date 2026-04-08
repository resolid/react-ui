import type { PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";
import type { UsePopperReturnContexts } from "./use-popper";
import { PopperAnchorContext } from "./popper-anchor-context";
import { PopperArrowContext } from "./popper-arrow-context";
import { PopperDispatchContext } from "./popper-dispatch-context";
import { PopperPositionerContext } from "./popper-positioner-context";
import { PopperStateContext } from "./popper-state-context";
import { PopperTransitionContext } from "./popper-transtion-context";

export type PopperProviderProps = {
  value: UsePopperReturnContexts;
};

export function PopperProvider({
  value,
  children,
}: PropsWithChildren<PopperProviderProps>): JSX.Element {
  return (
    <PopperArrowContext value={value.arrowContext}>
      <PopperStateContext value={value.stateContext}>
        <PopperAnchorContext value={value.anchorContext}>
          <PopperTransitionContext value={value.transitionContext}>
            <PopperPositionerContext value={value.positionerContext}>
              <PopperDispatchContext value={value.dispatchContext}>
                {children}
              </PopperDispatchContext>
            </PopperPositionerContext>
          </PopperTransitionContext>
        </PopperAnchorContext>
      </PopperStateContext>
    </PopperArrowContext>
  );
}
