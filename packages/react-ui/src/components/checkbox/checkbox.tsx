import type { JSX } from "react/jsx-runtime";
import { type ChangeEvent, type CSSProperties, useRef } from "react";
import type { PrimitiveProps } from "../../primitives";
import type { CheckedValueProps } from "../../shared/types";
import { useControllableState, useIsomorphicEffect, useMergeRefs } from "../../hooks";
import { CheckedIcon, IndeterminateIcon } from "../../shared/icons";
import {
  binaryColorShareStyles,
  binarySizeShareStyles,
  inputTextShareStyles,
  toggleControlShareStyles,
  toggleLabelShareStyles,
} from "../../shared/styles";
import { ariaAttr, tx } from "../../utils";
import { type CheckboxBaseProps, useCheckboxGroup } from "./checkbox-group-context";

export type CheckboxProps = CheckedValueProps &
  CheckboxBaseProps & {
    /**
     * 是否无效
     * @default false
     */
    invalid?: boolean;

    /**
     * 值
     */
    value?: string | number;

    /**
     * 部分选中
     * @default false
     */
    indeterminate?: boolean;

    /**
     * 间距
     * @default "0.5em"
     */
    spacing?: string | number;
  };

export const Checkbox = (
  props: PrimitiveProps<"input", CheckboxProps, "role" | "type">,
): JSX.Element => {
  const group = useCheckboxGroup(true);

  const {
    name,
    size: sizeProp,
    color: colorProp,
    disabled: disabledProp,
    readOnly: readOnlyProp,
    required: requiredProp,
    invalid = false,
    spacing = "0.5em",
    checked,
    defaultChecked = false,
    onChange,
    indeterminate,
    value,
    style,
    className,
    children,
    ref,
    ...rest
  } = props;

  const size = sizeProp ?? group?.size ?? "md";
  const color = colorProp ?? group?.color ?? "primary";
  const disabled = disabledProp ?? group?.disabled ?? false;
  const readOnly = readOnlyProp ?? group?.readOnly ?? false;
  const required = requiredProp ?? group?.required ?? false;

  const inputRef = useRef<HTMLInputElement>(null);
  const groupChecked = group?.value && value ? group.value.includes(value) : undefined;

  const [checkedState, setCheckedState] = useControllableState({
    value: groupChecked ?? checked,
    defaultValue: defaultChecked,
    onChange,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (disabled || readOnly) {
      return;
    }

    setCheckedState(indeterminate ? true : e.target.checked);
    group?.onChange(e);
  };

  useIsomorphicEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  useIsomorphicEffect(() => {
    if (inputRef.current) {
      if (checkedState != inputRef.current.checked) {
        setCheckedState(inputRef.current.checked);
      }
    }
  }, [setCheckedState, checkedState]);

  const refs = useMergeRefs(inputRef, ref);

  const sizeStyle = binarySizeShareStyles[size];
  const colorStyle = binaryColorShareStyles[color];
  const labelSizeStyle = inputTextShareStyles[size];

  const htmlName = group?.name ? `${group.name}[]` : name;

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
        ref={refs}
        name={htmlName}
        className="peer sr-only"
        value={value}
        type="checkbox"
        checked={checkedState}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        aria-invalid={ariaAttr(invalid)}
        onChange={handleChange}
        {...rest}
      />
      <span
        aria-hidden="true"
        className={tx(
          "items-center justify-center rounded-md",
          toggleControlShareStyles,
          colorStyle.focus,
          invalid
            ? "border-bd-invalid"
            : checkedState || indeterminate
              ? colorStyle.border
              : "border-bd-normal",
          checkedState || indeterminate
            ? ["text-fg-emphasized", colorStyle.checked]
            : "bg-bg-normal",
          sizeStyle,
        )}
      >
        {checkedState && !indeterminate && <CheckedIcon size="80%" />}
        {indeterminate && <IndeterminateIcon size="80%" />}
      </span>
      {children && <div className={tx("select-none", labelSizeStyle)}>{children}</div>}
    </label>
  );
};
