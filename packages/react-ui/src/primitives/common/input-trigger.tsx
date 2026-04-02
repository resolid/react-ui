import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../polymorphic";
import {
  inputPyStyles,
  type InputSize,
  inputStyles,
  selectHeightStyles,
} from "../../components/input/input.styles";
import { inputTextShareStyles } from "../../shared/styles";
import { ariaAttr, dataAttr, tx } from "../../utils";

export type InputTriggerBaseProps = {
  disabled: boolean;
  required: boolean;
  invalid: boolean;
  size: InputSize;
};

export function InputTrigger(
  props: PrimitiveProps<
    "div",
    InputTriggerBaseProps & { active: boolean; sizeStyle: { select: string; root: string } },
    "tabIndex"
  >,
): JSX.Element {
  const { disabled, required, invalid, active, size, sizeStyle, className, ...rest } = props;
  return (
    <div
      tabIndex={disabled ? -1 : 0}
      data-active={dataAttr(active)}
      aria-disabled={ariaAttr(disabled)}
      aria-required={ariaAttr(required)}
      className={tx(
        "bg-bg-normal select-none",
        inputStyles({ disabled, invalid, active, focusable: true }),
        inputPyStyles[size],
        selectHeightStyles[size],
        inputTextShareStyles[size],
        sizeStyle.select,
        sizeStyle.root,
        disabled
          ? "opacity-60"
          : "active:border-bg-primary-emphasis active:outline-bg-primary-emphasis/70",
        className,
      )}
      {...rest}
    />
  );
}
