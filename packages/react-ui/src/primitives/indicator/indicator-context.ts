import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

export type IndicatorContextValue = {
  listElement: HTMLElement | null;
  itemElement: HTMLElement | null;
};

const dest = createSafeContext<IndicatorContextValue>({
  name: "IndicatorContext",
});

export const IndicatorContext: SafeContext<IndicatorContextValue> = dest[0];
export const useIndicator: UseSafeContext<IndicatorContextValue> = dest[1];
