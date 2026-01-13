import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

const desc = createSafeContext<string>({
  name: "LocaleContext",
});

export const LocaleContext: SafeContext<string> = desc[0];
export const useLocale: UseSafeContext<string> = desc[1];
