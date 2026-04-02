import type { PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";
import type { usePicker } from "./use-picker";
import { PopperFloatingContext } from "../../primitives/popper/popper-floating-context";
import { PopperPositionerContext } from "../../primitives/popper/popper-positioner-context";
import { PopperTransitionContext } from "../../primitives/popper/popper-transtion-context";
import { PopperTriggerContext } from "../../primitives/popper/popper-trigger-context";
import { PickerRootContext, PickerStatusContext } from "./picker-context";

export type PickerProviderProps = {
  value: Omit<ReturnType<typeof usePicker>, "handleClose">;
};

export function PickerProvider({
  value,
  children,
}: PropsWithChildren<PickerProviderProps>): JSX.Element {
  return (
    <PickerRootContext value={value.rootContextValue}>
      <PickerStatusContext value={value.statusContextValue}>
        <PopperTriggerContext value={value.triggerContextValue}>
          <PopperTransitionContext value={value.transitionContextValue}>
            <PopperPositionerContext value={value.positionerContextValue}>
              <PopperFloatingContext value={value.floatingContextValue}>
                {children}
              </PopperFloatingContext>
            </PopperPositionerContext>
          </PopperTransitionContext>
        </PopperTriggerContext>
      </PickerStatusContext>
    </PickerRootContext>
  );
}
