import type { ChangeEvent } from "react";
import type { BinarySize, ToggleColor } from "../../shared/styles";
import type { FormFieldProps } from "../../shared/types";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type CheckboxBaseProps = FormFieldProps & {
  /**
   * 颜色
   * @default "primary"
   */
  color?: ToggleColor;

  /**
   * 大小
   * @default "md"
   */
  size?: BinarySize;
};

export type CheckboxGroupBaseProps = {
  /**
   * 可控值
   */
  value?: (string | number)[];
} & CheckboxBaseProps;

export type CheckboxGroupContextValue = CheckboxGroupBaseProps & {
  onChange: (event: ChangeEvent<HTMLInputElement> | string | number) => void;
};

const [context, hook] = createSafeContext<CheckboxGroupContextValue>({
  name: "CheckboxGroupContext",
});

export const CheckboxGroupContext: SafeContext<CheckboxGroupContextValue> = context;
export const useCheckboxGroup: UseSafeContext<CheckboxGroupContextValue> = hook;
