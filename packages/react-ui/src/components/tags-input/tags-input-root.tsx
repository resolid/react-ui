import type { JSX } from "react/jsx-runtime";
import { Composite } from "@floating-ui/react";
import { useRef, useState } from "react";
import type { PrimitiveProps } from "../../primitives";
import type { FormInputFieldProps, ValueProp } from "../../shared/types";
import { useControllableState } from "../../hooks";
import {
  CompositeContext,
  type CompositeContextValue,
} from "../../primitives/composite/composite-context";
import { inputTextShareStyles } from "../../shared/styles";
import { ariaAttr, tx } from "../../utils";
import {
  inputHeightStyles,
  inputPyStyles,
  type InputSize,
  inputStyles,
} from "../input/input.styles";
import { useDirection } from "../provider/direction-context";
import { VisuallyHiddenInput } from "../visually-hidden/visually-hidden-input";
import { TagsInputItem } from "./tags-input-item";
import {
  type TagsInputBaseProps,
  TagsInputRootContext,
  type TagsInputRootContextValue,
} from "./tags-input-root-context";
import { tagsInputSizeStyles } from "./tags-input.styles";

export type TagsInputRootProps = Omit<FormInputFieldProps, "placeholder"> &
  TagsInputBaseProps &
  ValueProp<string[]> & {
    /**
     * 大小
     * @default "md"
     */
    size?: InputSize;

    /**
     * 最大标签数量
     * @default Infinity
     */
    max?: number;
  };

export function TagsInputRoot(props: PrimitiveProps<"div", TagsInputRootProps>): JSX.Element {
  const {
    value,
    defaultValue = [],
    onChange,
    name,
    disabled = false,
    readOnly = false,
    invalid = false,
    required = false,
    delimiter = ",",
    addOnBlur = false,
    addOnPaste = false,
    size = "md",
    max = Infinity,
    className,
    tabIndex,
    style,
    children,
    ref,
    ...rest
  } = props;

  const direction = useDirection(true);

  const [valueState, setValueState] = useControllableState({ value, defaultValue, onChange });

  const addValue = (added: string | string[]) => {
    if (Array.isArray(added)) {
      if (added.length == 0) {
        return true;
      }

      const appends = added
        .filter((v) => !valueState.includes(v))
        .slice(0, max - valueState.length);

      if (appends.length == 0) {
        return true;
      }

      setValueState((prev) => [...prev, ...appends]);

      setActiveIndex((idx) => (idx ? idx + appends.length : 1));

      return true;
    }

    if (valueState.length >= max || valueState.includes(added)) {
      return false;
    }

    setValueState((prev) => [...prev, added]);

    setActiveIndex((idx) => (idx ? idx + 1 : 1));

    return true;
  };

  const deleteValue = (idx: number) => {
    setValueState((prev) => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
  };

  const tagsInputSizeStyle = tagsInputSizeStyles[size];

  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const context: CompositeContextValue = {
    activeIndex,
    setActiveIndex,
  };

  const inputRef = useRef(null);

  const rootContext: TagsInputRootContextValue = {
    disabled,
    readOnly,
    inputClassname: tagsInputSizeStyle.input,
    inputRef,
    addOnBlur,
    addOnPaste,
    delimiter,
    valueCount: valueState.length,
    onAdd: addValue,
    onDelete: deleteValue,
  };

  return (
    <>
      <Composite
        rtl={direction == "rtl"}
        orientation="horizontal"
        activeIndex={activeIndex}
        onNavigate={setActiveIndex}
        loop={false}
        className={tx(
          "flex-wrap gap-1 bg-bg-normal",
          inputStyles({ disabled, invalid, focusable: true }),
          tagsInputSizeStyle.root,
          inputPyStyles[size],
          inputHeightStyles[size],
          inputTextShareStyles[size],
          className,
        )}
        aria-disabled={ariaAttr(disabled)}
        aria-required={ariaAttr(required)}
        aria-readonly={ariaAttr(readOnly)}
        aria-invalid={ariaAttr(invalid)}
        tabIndex={tabIndex}
        style={style}
        {...rest}
        render={(htmlProps) => <div {...htmlProps} ref={ref} aria-orientation={undefined} />}
      >
        <TagsInputRootContext value={rootContext}>
          <CompositeContext value={context}>
            {valueState.map((state) => (
              <TagsInputItem
                key={state}
                size={size}
                disabled={disabled || readOnly}
                finalRef={inputRef}
                onDelete={deleteValue}
              >
                {state}
              </TagsInputItem>
            ))}
            {children}
          </CompositeContext>
        </TagsInputRootContext>
      </Composite>
      {name && (
        <VisuallyHiddenInput
          name={name}
          value={valueState}
          disabled={disabled}
          required={required}
        />
      )}
    </>
  );
}
