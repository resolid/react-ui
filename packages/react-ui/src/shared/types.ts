import type { UseDisclosureOptions } from "../hooks";

export type Direction = "ltr" | "rtl";

export type Orientation = "horizontal" | "vertical";

export type TransitionStatus = "unmounted" | "initial" | "open" | "close";

export type DisclosureProps = UseDisclosureOptions & {
  /**
   * 动画持续时间
   * @default 250
   */
  duration?: number;
};

export type ValueProp<T, D = T> = {
  /**
   * 受控值
   */
  value?: T;

  /**
   * 默认值
   */
  defaultValue?: D;

  /**
   * onChange 回调
   */
  onChange?: (value: T) => void;
};

export type MultipleValueProps<T, D = T> = {
  /**
   * 是否多个值
   * @default false
   */
  multiple?: boolean;

  /**
   * 受控值
   */
  value?: T[] | T | null;

  /**
   * 默认值
   * @default null | []
   */
  defaultValue?: D[] | D | null;

  /**
   * onChange 回调
   */
  onChange?: (value: T[] | T | null) => void;
};

export type CheckedValueProps = {
  /**
   * 可控值
   */
  checked?: boolean;

  /**
   * 默认值
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * onChange 回调
   */
  onChange?: (checked: boolean) => void;
};

export type FormFieldProps = {
  /**
   * 字段的名称, 提交表单时使用
   */
  name?: string;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否必需
   * @default false
   */
  required?: boolean;

  /**
   * 是否只读
   * @default false
   */
  readOnly?: boolean;
};

export type FormInputFieldProps = FormFieldProps & {
  /**
   * 是否无效
   * @default false
   */
  invalid?: boolean;

  /**
   * 占位符文本
   */
  placeholder?: string;
};
