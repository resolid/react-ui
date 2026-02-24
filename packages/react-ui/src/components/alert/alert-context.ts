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

const [context, hook] = createSafeContext<AlertContextValue>({
  name: "AlertContext",
});

export const AlertContext: SafeContext<AlertContextValue> = context;
export const useAlert: UseSafeContext<AlertContextValue> = hook;
