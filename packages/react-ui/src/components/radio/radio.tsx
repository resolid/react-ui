import type { CSSProperties, ChangeEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import {
  binaryColorShareStyles,
  binarySizeShareStyles,
  inputTextShareStyles,
  toggleControlShareStyles,
  toggleLabelShareStyles,
} from "../../shared/styles";
import { tx } from "../../utils";
import { type RadioBaseProps, useRadioGroup } from "./radio-group-context";

export type RadioProps = RadioBaseProps & {
  /**
   * 值
   */
  value: string | number;

  /**
   * 间距
   * @default "0.5em"
   */
  spacing?: string | number;
};

export const Radio = (
  props: PrimitiveProps<
    "input",
    RadioProps,
    "name" | "role" | "type" | "checked" | "defaultChecked" | "onChange" | "readOnly" | "required"
  >,
): JSX.Element => {
  const group = useRadioGroup();

  const {
    size: sizeProp,
    color: colorProp,
    disabled: disabledProp,
    spacing = "0.5em",
    value,
    style,
    className,
    children,
    ...rest
  } = props;

  const size = sizeProp ?? group.size ?? "md";
  const color = colorProp ?? group.color ?? "primary";
  const disabled = disabledProp ?? group.disabled ?? false;

  const checked = group.value == value;
  const readOnly = group.readOnly;
  const required = group.required;
  const invalid = group.invalid;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    group.onChange(value);
  };

  const sizeStyle = binarySizeShareStyles[size];
  const colorStyle = binaryColorShareStyles[color];
  const labelSizeStyle = inputTextShareStyles[size];

  return (
    <label
      style={
        {
          "--sv": `${spacing}`,
          ...style,
        } as CSSProperties
      }
      className={tx(toggleLabelShareStyles, disabled && "opacity-60", className)}
    >
      <input
        name={group.name}
        className={"peer sr-only"}
        value={value}
        type={"radio"}
        checked={checked}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        onChange={handleChange}
        {...rest}
      />
      <span
        aria-hidden={true}
        className={tx(
          "items-center justify-center rounded-full",
          toggleControlShareStyles,
          colorStyle.focus,
          invalid ? "border-bd-invalid" : checked ? colorStyle.border : "border-bd-normal",
          checked ? ["text-fg-emphasized", colorStyle.checked] : "bg-bg-normal",
          sizeStyle,
          checked &&
            "before:relative before:inline-block before:h-5/9 before:w-5/9 before:rounded-full before:bg-current before:content-['']",
        )}
      />
      {children && <div className={tx("select-none", labelSizeStyle)}>{children}</div>}
    </label>
  );
};
