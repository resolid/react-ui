import type { JSX } from "react/jsx-runtime";
import { useRef } from "react";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { useMergeRefs } from "../../hooks";
import { inputItemSizeStyles } from "../../primitives/common/input-item.styles";
import { usePopperTrigger } from "../../primitives/popper/popper-trigger-context";
import { CalendarRangeIcon } from "../../shared/icons";
import { inputTextShareStyles } from "../../shared/styles";
import { ariaAttr, dataAttr, tx } from "../../utils";
import { inputPyStyles, inputStyles, selectHeightStyles } from "../input/input.styles";
import { selectSizeStyles } from "../select/select.styles";
import { useDateRangePickerState } from "./date-range-picker-context";
import { usePickerRoot, usePickerStatus } from "./picker-context";

export function DateRangePickerTrigger(
  props: PrimitiveProps<"div", EmptyObject, "tabIndex">,
): JSX.Element {
  const { className, children, ref, ...rest } = props;

  const triggerRef = useRef(null);

  const { context } = usePickerRoot();
  const { setReference, getReferenceProps } = usePopperTrigger();
  const { value } = useDateRangePickerState();
  const { disabled, required, invalid, placeholder, size } = usePickerStatus();

  const refs = useMergeRefs(ref, triggerRef, setReference);

  const sizeStyle = selectSizeStyles[size];

  return (
    <div
      ref={refs}
      tabIndex={disabled ? -1 : 0}
      data-active={dataAttr(context.open)}
      aria-disabled={ariaAttr(disabled)}
      aria-required={ariaAttr(required)}
      className={tx(
        "inline-flex bg-bg-normal select-none",
        inputStyles({ disabled, invalid, active: context.open, focusable: true }),
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
      {...getReferenceProps(rest)}
    >
      {value.length > 0 ? (
        <div className={inputItemSizeStyles[size]}>{value}</div>
      ) : (
        <div className={tx("text-fg-placeholder", inputItemSizeStyles[size])}>{placeholder}</div>
      )}
      <span
        className={tx(
          "pointer-events-none absolute inset-e-0 top-0 bottom-0 flex items-center justify-center",
          sizeStyle.chevron,
        )}
      >
        {children ?? <CalendarRangeIcon className="text-fg-subtle" />}
      </span>
    </div>
  );
}
