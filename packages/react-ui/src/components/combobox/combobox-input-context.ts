import type { RefObject } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type ComboboxInputContextValue = {
  name: string | undefined;
  inputRef: RefObject<HTMLElement | null>;
  inputValue: string;
};

const [context, hook] = createSafeContext<ComboboxInputContextValue>({
  name: "ComboboxInputContext",
});
export const ComboboxInputContext: SafeContext<ComboboxInputContextValue> = context;
export const useComboboxInput: UseSafeContext<ComboboxInputContextValue> = hook;
