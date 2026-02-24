import type { FloatingRootContext } from "@floating-ui/react";
import type { PopperFocusProps } from "../../primitives/popper/utils";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type PopoverBaseProps = PopperFocusProps;

export type PopoverRootContextValue = PopoverBaseProps & {
  context: FloatingRootContext;
};

const dest = createSafeContext<PopoverRootContextValue>({
  name: "PopoverRootContext",
});

export const PopoverRootContext: SafeContext<PopoverRootContextValue> = dest[0];
export const usePopoverRoot: UseSafeContext<PopoverRootContextValue> = dest[1];
