import type { FloatingRootContext } from "@floating-ui/react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type ComboboxRootContextValue = {
  rootContext: FloatingRootContext;
};

const [context, hook] = createSafeContext<ComboboxRootContextValue>({
  name: "ComboboxRootContext",
});

export const ComboboxRootContext: SafeContext<ComboboxRootContextValue> = context;
export const useComboboxRoot: UseSafeContext<ComboboxRootContextValue> = hook;
