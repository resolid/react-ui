import type { JSX } from "react/jsx-runtime";
import { clamp, isNumber } from "@resolid/utils";
import { type FocusEvent, type KeyboardEvent, useId, useRef, useState } from "react";
import type { PrimitiveProps } from "../../primitives";
import type { ValueProp } from "../../shared/types";
import { useControllableState, useEventListener, useMergeRefs } from "../../hooks";
import { Input, type InputProps } from "../input/input";
import { NumberInputControl } from "./number-input-control";

export type NumberInputProps = Omit<
  InputProps,
  "type" | "suffix" | "suffixWidth" | "value" | "defaultValue" | "onChange"
> &
  ValueProp<number | undefined> & {
    /**
     * 最小值
     * @default Number.MIN_SAFE_INTEGER
     */
    min?: number;

    /**
     * 最大值
     * @default Number.MAX_SAFE_INTEGER
     */
    max?: number;

    /**
     * 步进
     * @default 1
     */
    step?: number;

    /**
     * 小数精度, 默认跟随 step 小数精度
     */
    precision?: number;

    /**
     * 自定义显示格式
     */
    format?: (value: string) => string;

    /**
     * 如果使用自定义显示格式，转换为 parseFloat 可以处理的格式
     */
    parse?: (value: string) => string;

    /**
     * 提示用户可能输入的数据类型。它还确定了移动设备上向用户显示的键盘类型
     * @default "decimal"
     */
    inputMode?: "decimal" | "numeric";

    /**
     * 通过滚轮改变值
     * @default false
     */
    changeOnWheel?: boolean;
  };

export function NumberInput(
  props: PrimitiveProps<"input", NumberInputProps, "type" | "role">,
): JSX.Element {
  const {
    id,
    value,
    defaultValue,
    onChange,
    min,
    max,
    step = 1,
    precision,
    inputMode = "decimal",
    changeOnWheel = false,
    format: formatProp,
    parse: parseProp,
    disabled = false,
    readOnly = false,
    size = "md",
    onBlur,
    onFocus,
    ref,
    ...rest
  } = props;

  const format = formatProp ?? ((original) => original);
  const parse = parseProp ?? ((original) => original);

  const uid = useId();
  const inputId = id ?? uid;

  const minValue = isNumber(min) ? min : Number.MIN_SAFE_INTEGER;
  const maxValue = isNumber(max) ? max : Number.MAX_SAFE_INTEGER;
  const stepValue = Number.parseFloat(step.toString());
  const precisionValue = precision ?? getDecimalPrecisionLength(step);

  const [valueState, setValueState] = useControllableState<number | undefined>({
    value,
    defaultValue,
    onChange,
  });

  const [inputValue, setInputValue] = useState(
    isNumber(valueState) ? valueState.toFixed(precisionValue) : "",
  );

  const formattedValue = format(inputValue);

  const update = (next: number | undefined) => {
    if (next == valueState) {
      return;
    }

    setValueState(next);
  };

  const handleChange = (changed: string | number) => {
    const parsed = parse(changed.toString());

    setInputValue(parsed);

    if (changed == "" || changed == "-") {
      update(undefined);
    } else {
      const number = Number.parseFloat(parsed);

      if (!Number.isNaN(number)) {
        update(number);
      }
    }
  };

  const increment = (incrementStep = stepValue) => {
    if (valueState === undefined) {
      update(min ?? 0);
      setInputValue(min !== undefined ? min.toFixed(precisionValue) : "0");
    } else {
      const fixed = clamp(valueState + incrementStep, minValue, maxValue).toFixed(precisionValue);

      update(Number.parseFloat(fixed));
      setInputValue(fixed);
    }
  };

  const decrement = (decrementStep = stepValue) => {
    if (valueState === undefined) {
      update(min ?? 0);
      setInputValue(min !== undefined ? min.toFixed(precisionValue) : "0");
    } else {
      const fixed = clamp(valueState - decrementStep, minValue, maxValue).toFixed(precisionValue);

      update(Number.parseFloat(fixed));
      setInputValue(fixed);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) {
      return;
    }

    if (
      event.key.length == 1 &&
      !(event.ctrlKey || event.altKey || event.metaKey) &&
      !/^[Ee0-9+\-.]$/.test(event.key)
    ) {
      event.preventDefault();
    }

    if (event.key == "ArrowUp") {
      event.preventDefault();
      increment((event.metaKey || event.ctrlKey ? 0.1 : event.shiftKey ? 10 : 1) * stepValue);
    }

    if (event.key == "ArrowDown") {
      event.preventDefault();
      decrement((event.metaKey || event.ctrlKey ? 0.1 : event.shiftKey ? 10 : 1) * stepValue);
    }

    if (event.key == "Home") {
      event.preventDefault();
      update(min);
    }

    if (event.key == "End") {
      event.preventDefault();
      update(max);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const [focusState, setFocusState] = useState(false);

  useEventListener(
    "wheel",
    (event) => {
      if (!changeOnWheel || !focusState || readOnly) {
        return;
      }

      event.preventDefault();

      const direction = Math.sign(event.deltaY);

      if (direction == -1) {
        increment();
      } else if (direction == 1) {
        decrement();
      }
    },
    inputRef,
    { passive: false },
  );

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setFocusState(true);
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setInputValue("");
      update(undefined);
    } else {
      const parsed = clamp(
        Number.parseFloat(
          parse(event.target.value[0] == "." ? `0${event.target.value}` : event.target.value),
        ),
        minValue,
        maxValue,
      );

      if (!Number.isNaN(parsed)) {
        setInputValue(parsed.toFixed(precisionValue));
        update(Number.parseFloat(parsed.toFixed(precisionValue)));
      } else {
        setInputValue(valueState !== undefined ? valueState.toFixed(precisionValue) : "");
      }
    }

    setFocusState(false);
    onBlur?.(event);
  };

  const refs = useMergeRefs(ref, inputRef);

  return (
    <Input
      id={inputId}
      ref={refs}
      type="text"
      inputMode={inputMode}
      role="spinbutton"
      aria-valuemin={minValue}
      aria-valuemax={maxValue}
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      aria-valuenow={valueState}
      aria-valuetext={formattedValue != "" ? formattedValue : undefined}
      disabled={disabled}
      readOnly={readOnly}
      value={formattedValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      size={size}
      suffix={
        <span className="flex h-full w-[calc(var(--sw)-2px)] flex-col gap-px py-px ps-2">
          <NumberInputControl
            size={size}
            stepper="increment"
            inputId={inputId}
            onClick={(event) => {
              event.stopPropagation();
              increment();
              inputRef.current?.focus();
            }}
            disabled={disabled || readOnly || (valueState ?? 0) >= maxValue}
          />
          <NumberInputControl
            size={size}
            stepper="decrement"
            inputId={inputId}
            onClick={(event) => {
              event.stopPropagation();
              decrement();
              inputRef.current?.focus();
            }}
            disabled={disabled || readOnly || (valueState ?? 0) <= minValue}
          />
        </span>
      }
      {...rest}
    />
  );
}

function getDecimalPrecisionLength(n: number) {
  const split = n.toString().split(".");

  return split[1] ? split[1].length : 0;
}
