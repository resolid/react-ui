import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

export type InputClearContextValue = {
  visible: boolean;
  disabled: boolean;
  onClear: () => void;
};

const [context, hook] = createSafeContext<InputClearContextValue>({
  name: "InputClearContext",
});

export const InputClearContext: SafeContext<InputClearContextValue> = context;
export const useInputClear: UseSafeContext<InputClearContextValue> = hook;
