import { Composite } from "@floating-ui/react";
import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { useControllableState } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import {
  CompositeContext,
  type CompositeContextValue,
} from "../../primitives/composite/composite-context";
import { inputTextShareStyles } from "../../shared/styles";
import type { FormInputFieldProps } from "../../shared/types";
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
  TagsInputBaseProps & {
    /**
     * 可控值
     */
    value?: string[];

    /**
     * 默认值
     * @default []
     */
    defaultValue?: string[];

    /**
     * onChange 回调
     */
    onChange?: (value: string[]) => void;

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

export const TagsInputRoot = (props: PrimitiveProps<"div", TagsInputRootProps>): JSX.Element => {
  const {
    value,
    defaultValue = [],
    onChange,
    placeholder,
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
    ...rest
  } = props;

  const direction = useDirection(true);

  const [valueState, setValueState] = useControllableState({ value, defaultValue, onChange });

  const addValue = (value: string | string[]) => {
    if (Array.isArray(value)) {
      if (value.length == 0) {
        return true;
      }

      const appends = value
        .filter((v) => !valueState.includes(v))
        .slice(0, max - valueState.length);

      if (appends.length == 0) {
        return true;
      }

      setValueState((prev) => [...prev, ...appends]);

      setActiveIndex((idx) => {
        return idx ? idx + appends.length : 1;
      });

      return true;
    }

    if (valueState.length >= max || valueState.includes(value)) {
      return false;
    }

    setValueState((prev) => [...prev, value]);

    setActiveIndex((idx) => {
      return idx ? idx + 1 : 1;
    });

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

  const rootContext: TagsInputRootContextValue = {
    disabled,
    readOnly,
    inputClassname: tagsInputSizeStyle.input,
    addOnBlur,
    addOnPaste,
    delimiter,
    placeholder,
    valueCount: valueState.length,
    onAdd: addValue,
    onDelete: deleteValue,
  };

  return (
    <>
      <Composite
        rtl={direction == "rtl"}
        orientation={"horizontal"}
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
        render={(props) => <div {...props} aria-orientation={undefined} />}
      >
        <TagsInputRootContext value={rootContext}>
          <CompositeContext value={context}>
            {valueState.map((value, index) => (
              <TagsInputItem
                key={index}
                value={value}
                className={tagsInputSizeStyle.item}
                disabled={disabled || readOnly}
                onDelete={deleteValue}
              />
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
};
