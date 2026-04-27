import type { Dispatch, RefObject, SetStateAction } from "react";
import type { JSX } from "react/jsx-runtime";
import { noop } from "@resolid/utils";
import { formatDate, parseDate } from "@resolid/utils/date";
import type { PrimitiveProps } from "../../primitives";
import { useMergeRefs } from "../../hooks";
import { useControllableState } from "../../hooks/use-controllable-state";
import {
  CalendarViewControlContext,
  type CalenderCellRender,
} from "../../primitives/calendar/calendar-context";
import { CalendarRoot } from "../../primitives/calendar/calendar-root";
import { calendarIsSameStrategy, returnFalse } from "../../primitives/calendar/utils";
import { tx } from "../../utils/clsx";
import { ariaAttr } from "../../utils/dom";
import { calendarStatusColorStyles } from "./calendar.styles";
import { useControllableView, type UseControllableViewOptions } from "./use-controllable-view";
import { getBaseFocusedValue, type CalendarBaseProps, type CalendarFormatProps } from "./utils";

export type DateCalendarRootProps = {
  value: Date | Date[] | null;
  setValue: Dispatch<SetStateAction<Date | Date[] | null>>;
  multiple: boolean;
  disabled: boolean;
  readOnly: boolean;
  onDateSelect?: () => void;
  setFocusedValueRef?: RefObject<Dispatch<SetStateAction<Date>> | null>;
} & Required<CalendarFormatProps> &
  CalendarBaseProps &
  Partial<UseControllableViewOptions>;

export function DateCalendarRoot(props: PrimitiveProps<"div", DateCalendarRootProps>): JSX.Element {
  const {
    value,
    setValue,
    format,
    multiple,
    disabled,
    readOnly,
    minValue,
    maxValue,
    view,
    defaultView,
    minView = "month",
    maxView = "decade",
    onViewChange,
    focusedValue,
    defaultFocusedValue,
    onFocusedValueChange,
    isDateUnavailable = returnFalse,
    color = "primary",
    onDateSelect = noop,
    setFocusedValueRef,
    children,
    ref,
    ...rest
  } = props;

  const [viewState, setView] = useControllableView({
    view,
    defaultView,
    onViewChange,
    minView,
    maxView,
  });

  const [focusedValueState, setFocusedValue] = useControllableState({
    value: focusedValue ? parseDate(focusedValue, format) : undefined,
    defaultValue: defaultFocusedValue
      ? parseDate(defaultFocusedValue, format)
      : getBaseFocusedValue(value, multiple),
    onChange: (d) => onFocusedValueChange?.(formatDate(d, format)),
  });

  const isSame = calendarIsSameStrategy[viewState];

  const isSelected = (d: Date) => {
    if (multiple) {
      return (value as Date[]).some((vd) => isSame(d, vd));
    }

    return value ? isSame(d, value as Date) : false;
  };

  const colorStyle = calendarStatusColorStyles[color];

  const handleCellClick = (d: Date) => {
    if (isDateUnavailable(d, viewState)) {
      return;
    }

    onDateSelect();

    if (multiple) {
      setValue((prev) => {
        const dates = prev as Date[];
        const index = dates.findIndex((dt) => isSame(d, dt));

        if (index === -1) {
          return [...dates, d];
        }

        return [...dates.slice(0, index), ...dates.slice(index + 1)];
      });
    } else {
      setValue((prev) => {
        return prev && isSame(prev as Date, d) ? null : d;
      });
    }
  };

  const cellRender = (
    htmlProps: Parameters<CalenderCellRender>[0],
    state: Parameters<CalenderCellRender>[1],
  ) => {
    const { className, ...rest } = htmlProps;
    const selected = isSelected(state.date);
    const unavailable = isDateUnavailable(state.date, viewState);

    return (
      <div
        aria-selected={ariaAttr(selected)}
        className={tx(
          selected
            ? ["text-fg-emphasized", colorStyle.selected, state.disabled && "opacity-70"]
            : !state.outside && unavailable && "text-fg-danger-hovered line-through",
          className,
        )}
        {...rest}
      />
    );
  };

  const minDate = minValue ? parseDate(minValue, format) : null;
  const maxDate = maxValue ? parseDate(maxValue, format) : null;

  const refs = useMergeRefs(ref, () => {
    if (setFocusedValueRef) {
      setFocusedValueRef.current = setFocusedValue;
    }

    return () => {
      if (setFocusedValueRef) {
        setFocusedValueRef.current = null;
      }
    };
  });

  return (
    <CalendarRoot
      ref={refs}
      view={viewState}
      date={focusedValueState}
      onDateChange={setFocusedValue}
      onCellClick={handleCellClick}
      cellRender={cellRender}
      color={color}
      display={readOnly}
      disabled={disabled}
      minDate={minDate}
      maxDate={maxDate}
      {...rest}
    >
      <CalendarViewControlContext value={{ setView, minView, maxView }}>
        {children}
      </CalendarViewControlContext>
    </CalendarRoot>
  );
}
