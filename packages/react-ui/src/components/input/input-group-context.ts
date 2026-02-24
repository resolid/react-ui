import type { InputSize } from "./input.styles";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type InputGroupContextValue = {
  /**
   * 大小
   * @default "md"
   */
  size: InputSize;
};

const [context, hook] = createSafeContext<InputGroupContextValue>({
  name: "InputGroupContext",
});

export const InputGroupContext: SafeContext<InputGroupContextValue> = context;
export const useInputGroup: UseSafeContext<InputGroupContextValue> = hook;
