import type { RefObject } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type ComboboxTriggerContextValue = {
  triggerRef: RefObject<HTMLButtonElement | null>;
};

const [context, hook] = createSafeContext<ComboboxTriggerContextValue>({
  name: "ComboboxTriggerContext",
});

export const ComboboxTriggerContext: SafeContext<ComboboxTriggerContextValue> = context;
export const useComboboxTrigger: UseSafeContext<ComboboxTriggerContextValue> = hook;
