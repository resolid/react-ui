import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type ComboboxPopupContextValue = {
  duration: number;
  setFloating: (node: HTMLElement) => void;
};

const [context, hook] = createSafeContext<ComboboxPopupContextValue>({
  name: "ComboboxRootContext",
});

export const ComboboxPopupContext: SafeContext<ComboboxPopupContextValue> = context;
export const useComboboxPopup: UseSafeContext<ComboboxPopupContextValue> = hook;
