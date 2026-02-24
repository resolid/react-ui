import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

export type IndicatorContextValue = {
  listElement: HTMLElement | null;
  itemElement: HTMLElement | null;
};

const [context, hook] = createSafeContext<IndicatorContextValue>({
  name: "IndicatorContext",
});

export const IndicatorContext: SafeContext<IndicatorContextValue> = context;
export const useIndicator: UseSafeContext<IndicatorContextValue> = hook;
