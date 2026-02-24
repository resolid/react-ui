import type { InputSize } from "./input.styles";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type InputGroupContextValue = {
  /**
   * 大小
   * @default "md"
   */
  size: InputSize;
};

const desc = createSafeContext<InputGroupContextValue>({
  name: "InputGroupContext",
});

export const InputGroupContext: SafeContext<InputGroupContextValue> = desc[0];
export const useInputGroup: UseSafeContext<InputGroupContextValue> = desc[1];
