import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";
import type { progressBarSizeStyles } from "./progress-bar.styles";

export type ProgressBaseContextValue = {
  /**
   * 大小
   * @default "md"
   */
  size: keyof typeof progressBarSizeStyles | number;

  vertical: boolean;
  radiusClass: string;
};

const progressBaseContextTuple = createSafeContext<ProgressBaseContextValue>({
  name: "ProgressBaseContext",
});

export const ProgressBaseContext: SafeContext<ProgressBaseContextValue> =
  progressBaseContextTuple[0];

export const useProgressBase: UseSafeContext<ProgressBaseContextValue> =
  progressBaseContextTuple[1];
