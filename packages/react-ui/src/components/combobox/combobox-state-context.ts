import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives/context";

export type ComboboxStateContextValue = {
  required: boolean;
  invalid: boolean;
};

const [context, hook] = createSafeContext<ComboboxStateContextValue>({
  name: "ComboboxStateContext",
});

export const ComboboxStateContext: SafeContext<ComboboxStateContextValue> = context;
export const useComboboxState: UseSafeContext<ComboboxStateContextValue> = hook;
