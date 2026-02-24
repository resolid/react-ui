import type { AlertStyleProps } from "./alert.styles";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type AlertContextValue = {
  /**
   * 外观
   * @default "soft"
   */
  variant: AlertStyleProps["variant"];

  /**
   * 颜色
   * @default "primary"
   */
  color: AlertStyleProps["color"];
};

const desc = createSafeContext<AlertContextValue>({
  name: "AlertContext",
});

export const AlertContext: SafeContext<AlertContextValue> = desc[0];
export const useAlert: UseSafeContext<AlertContextValue> = desc[1];
