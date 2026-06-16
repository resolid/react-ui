import type { ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
import type { FormInputFieldProps } from "../../shared/types";
import { inputTextShareStyles } from "../../shared/styles";
import { tx } from "../../utils/clsx";
import { inputPyStyles, inputStyles, selectHeightStyles } from "../input/input.styles";
import { SelectChevron } from "./select-chevron";
import { type SelectSize, selectSizeStyles } from "./select.styles";

export type NativeSelectProps = FormInputFieldProps & {
  /**
   * 大小
   * @default 'md'
   */
  size?: SelectSize;
};

export function NativeSelect(
  props: PrimitiveProps<"select", NativeSelectProps, "multiple">,
): ReactNode {
  const { size = "md", disabled = false, invalid = false, children, className, ...rest } = props;

  const sizeStyle = selectSizeStyles[size];

  return (
    <div className={tx("relative", inputTextShareStyles[size])}>
      <select
        disabled={disabled}
        className={tx(
          "appearance-none bg-bg-normal",
          inputStyles({ disabled, invalid, focusable: true }),
          inputPyStyles[size],
          selectHeightStyles[size],
          sizeStyle.select,
          sizeStyle.native,
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <SelectChevron className={sizeStyle.chevron} />
    </div>
  );
}
