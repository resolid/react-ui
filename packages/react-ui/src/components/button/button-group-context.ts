import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";
import type { Orientation } from "../../shared/types";
import type { ButtonStyleProps } from "./button.styles";

export type ButtonBaseProps = {
  /**
   * 外观
   * @default "solid"
   */
  variant?: ButtonStyleProps["variant"];

  /**
   * 颜色
   * @default "primary"
   */
  color?: ButtonStyleProps["color"];

  /**
   * 大小
   * @default "md"
   */
  size?: ButtonStyleProps["size"];

  /**
   * 按钮圆角
   * @default true
   */
  radius?: number | boolean | "full";

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
};

export type ButtonGroupContextValue = ButtonBaseProps & {
  /**
   * 方向
   * @default "horizontal"
   */
  orientation?: Orientation;
};

const desc = createSafeContext<ButtonGroupContextValue>({
  name: "ButtonGroupContext",
});

export const ButtonGroupContext: SafeContext<ButtonGroupContextValue> = desc[0];
export const useButtonGroup: UseSafeContext<ButtonGroupContextValue> = desc[1];
