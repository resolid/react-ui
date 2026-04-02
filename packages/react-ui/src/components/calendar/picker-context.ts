import type { FloatingRootContext } from "@floating-ui/react";
import type { InputTriggerBaseProps } from "../../primitives/common/input-trigger";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type PickerStatusContextValue = InputTriggerBaseProps & {
  placeholder?: string;
};

const [statusContext, statusHook] = createSafeContext<PickerStatusContextValue>({
  name: "PickerStatusContext",
});

export const PickerStatusContext: SafeContext<PickerStatusContextValue> = statusContext;
export const usePickerStatus: UseSafeContext<PickerStatusContextValue> = statusHook;

export type PickerRootContextValue = {
  context: FloatingRootContext;
};

const [rootContext, rootHook] = createSafeContext<PickerRootContextValue>({
  name: "PickerRootContext",
});

export const PickerRootContext: SafeContext<PickerRootContextValue> = rootContext;
export const usePickerRoot: UseSafeContext<PickerRootContextValue> = rootHook;
