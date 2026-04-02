import type { JSX } from "react/jsx-runtime";
import { useRef } from "react";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { useMergeRefs } from "../../hooks";
import { InputItem } from "../../primitives/common/input-item";
import { inputItemSizeStyles } from "../../primitives/common/input-item.styles";
import { InputTrigger } from "../../primitives/common/input-trigger";
import { usePopperTrigger } from "../../primitives/popper/popper-trigger-context";
import { CalendarIcon } from "../../shared/icons";
import { tx } from "../../utils";
import { selectChevronStyle, selectSizeStyles } from "../select/select.styles";
import { useDatePickerState } from "./date-picker-context";
import { usePickerRoot, usePickerStatus } from "./picker-context";

export function DatePickerTrigger(
  props: PrimitiveProps<"div", EmptyObject, "tabIndex">,
): JSX.Element {
  const { className, children, ref, ...rest } = props;

  const triggerRef = useRef(null);

  const { context } = usePickerRoot();
  const { setReference, getReferenceProps } = usePopperTrigger();
  const { value, remove } = useDatePickerState();
  const { disabled, required, invalid, placeholder, size } = usePickerStatus();

  const refs = useMergeRefs(ref, triggerRef, setReference);

  const sizeStyle = selectSizeStyles[size];

  return (
    <InputTrigger
      ref={refs}
      active={context.open}
      disabled={disabled}
      required={required}
      invalid={invalid}
      size={size}
      sizeStyle={sizeStyle}
      className={tx("inline-flex", className)}
      {...getReferenceProps(rest)}
    >
      {value.length > 0 ? (
        Array.isArray(value) ? (
          <div className="inline-flex flex-wrap gap-1">
            {value.map((v) => (
              <InputItem
                key={v}
                size={size}
                finalRef={triggerRef}
                disabled={disabled}
                onDelete={() => {
                  remove(v);
                }}
                className="bg-bg-subtlest"
              >
                {v}
              </InputItem>
            ))}
          </div>
        ) : (
          <div className={inputItemSizeStyles[size]}>{value}</div>
        )
      ) : (
        <div className={tx("text-fg-placeholder", inputItemSizeStyles[size])}>{placeholder}</div>
      )}
      <span className={tx(selectChevronStyle, sizeStyle.chevron)}>
        {children ?? <CalendarIcon className="text-fg-subtle" />}
      </span>
    </InputTrigger>
  );
}
