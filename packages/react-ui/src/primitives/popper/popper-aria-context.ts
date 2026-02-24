import { createSafeContext, type SafeContext, type UseSafeContext } from "../index";

export type PopperAriaContextValue = {
  labelId: string;
  descriptionId: string;
};

const [context, hook] = createSafeContext<PopperAriaContextValue>({
  name: "PopperAriaContext",
});

export const PopperAriaContext: SafeContext<PopperAriaContextValue> = context;
export const usePopperAria: UseSafeContext<PopperAriaContextValue> = hook;
