import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

const [context, hook] = createSafeContext<boolean>({
  name: "OptionEmptyContext",
});

export const OptionEmptyContext: SafeContext<boolean> = context;
export const useOptionEmpty: UseSafeContext<boolean> = hook;
