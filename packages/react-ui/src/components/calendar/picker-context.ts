import type { FloatingRootContext } from "@floating-ui/react";
import type { InputSize } from "../input/input.styles";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type PickerStatusContextValue = {
  placeholder?: string;
  disabled: boolean;
  required: boolean;
  invalid: boolean;
  size: InputSize;
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
