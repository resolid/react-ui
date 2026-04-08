import type { PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";
import type { UsePopoverReturnContexts } from "./use-popover";
import { PopperAriaContext } from "../../primitives/popper/popper-aria-context";
import { PopperFloatingContext } from "../../primitives/popper/popper-floating-context";
import { PopperProvider } from "../../primitives/popper/popper-provider";
import { PopperTriggerContext } from "../../primitives/popper/popper-trigger-context";
import { PopoverRootContext } from "./popover-root-context";

export type PopoverProviderProps = {
  value: UsePopoverReturnContexts;
};

export function PopoverProvider({
  value,
  children,
}: PropsWithChildren<PopoverProviderProps>): JSX.Element {
  const { referenceContext, floatingContext, popoverRootContext, ariaContext, ...popperContexts } =
    value;

  return (
    <PopperProvider value={popperContexts}>
      <PopperAriaContext value={ariaContext}>
        <PopperTriggerContext value={referenceContext}>
          <PopoverRootContext value={popoverRootContext}>
            <PopperFloatingContext value={floatingContext}>{children}</PopperFloatingContext>
          </PopoverRootContext>
        </PopperTriggerContext>
      </PopperAriaContext>
    </PopperProvider>
  );
}
