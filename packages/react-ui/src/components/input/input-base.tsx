import { type ChangeEvent, type CSSProperties, type ReactNode, useRef } from "react";
import type { JSX } from "react/jsx-runtime";
import { useControllableState, useMergeRefs } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { inputTextShareStyles } from "../../shared/styles";
import type { FormInputFieldProps } from "../../shared/types";
import { tx } from "../../utils";
import { InputAffix } from "./input-affix";
import { type InputGroupContextValue, useInputGroup } from "./input-group-context";
import {
  inputAffixDefaultSizes,
  inputGroupStyles,
  inputHeightStyles,
  inputPxStyles,
  inputPyStyles,
  inputStyles,
} from "./input.styles";

export type InputBaseProps = Partial<InputGroupContextValue> &
  FormInputFieldProps & {
    /**
     * 可控值
     */
    value?: string | number;

    /**
     * 默认值
     * @default ""
     */
    defaultValue?: string | number;

    /**
     * onChange 回调
     */
    onChange?: (value: string | number) => void;

    /**
     * 前置元素
     */
    prefix?: ReactNode;

    /**
     * 前置元素宽度
     */
    prefixWidth?: number;

    /**
     * 后置元素
     */
    suffix?: ReactNode;

    /**
     * 后置元素宽度
     */
    suffixWidth?: number;

    /**
     * 输入框类型
     * @default "text"
     */
    type?: "text" | "email" | "number" | "password" | "search" | "tel" | "url";

    focusable?: boolean;
  };

export const InputBase = (
  props: PrimitiveProps<"input", InputBaseProps, "children">,
): JSX.Element => {
  const group = useInputGroup(true);

  const {
    size = group?.size ?? "md",
    invalid = false,
    disabled = false,
    required = false,
    readOnly = false,
    className,
    value,
    defaultValue = "",
    onChange,
    placeholder,
    prefix,
    prefixWidth,
    suffix,
    suffixWidth,
    type,
    inputMode,
    focusable = true,
    ref,
    ...rest
  } = props;

  const [valueState, setValueState] = useControllableState({ value, defaultValue, onChange });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (inputMode == "decimal" && (event.nativeEvent as InputEvent).isComposing) {
      return;
    }

    if (readOnly || disabled) {
      event.preventDefault();
      return;
    }

    setValueState(event.target.value);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const refs = useMergeRefs(inputRef, ref);

  const affixSize = inputAffixDefaultSizes[size];

  return (
    <div
      className={tx(
        inputStyles({ disabled, invalid, focusable }),
        group && [inputGroupStyles, "focus-within:z-1"],
        className,
      )}
      style={
        {
          "--pw": prefix ? (prefixWidth ? `${prefixWidth}px` : affixSize) : undefined,
          "--sw": suffix ? (suffixWidth ? `${suffixWidth}px` : affixSize) : undefined,
        } as CSSProperties
      }
    >
      {prefix && <InputAffix className={"start-0 w-(--pw)"}>{prefix}</InputAffix>}
      <input
        ref={refs}
        className={tx(
          "w-full resize-none appearance-none text-start align-middle outline-none",
          "rounded-md bg-bg-normal transition-colors",
          disabled && "bg-bg-subtlest/60",
          inputPxStyles[size],
          inputPyStyles[size],
          inputHeightStyles[size],
          inputTextShareStyles[size],
          prefix && "ps-(--pw)",
          suffix && "pe-(--sw)",
        )}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        type={type}
        inputMode={inputMode}
        value={valueState}
        onChange={handleChange}
        {...rest}
      />
      {suffix && <InputAffix className={"end-0 w-(--sw)"}>{suffix}</InputAffix>}
    </div>
  );
};
