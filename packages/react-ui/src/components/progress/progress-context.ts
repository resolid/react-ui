import type { progressBarSizeStyles } from "./progress-bar.styles";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type ProgressBaseContextValue = {
  /**
   * 大小
   * @default "md"
   */
  size: keyof typeof progressBarSizeStyles | number;

  vertical: boolean;
  radiusClass: string;
};

const [context, hook] = createSafeContext<ProgressBaseContextValue>({
  name: "ProgressBaseContext",
});

export const ProgressBaseContext: SafeContext<ProgressBaseContextValue> = context;
export const useProgressBase: UseSafeContext<ProgressBaseContextValue> = hook;
