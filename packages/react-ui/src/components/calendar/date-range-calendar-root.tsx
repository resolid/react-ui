import type { JSX } from "react/jsx-runtime";
import { noop } from "@resolid/utils";
import { formatDate, isAfter, isBefore, parseDate } from "@resolid/utils/date";
import { type Dispatch, type SetStateAction, useState } from "react";
import type { PrimitiveProps } from "../../primitives";
import { useControllableState } from "../../hooks/use-controllable-state";
import {
  CalendarButtonContext,
  CalendarGridContext,
  CalendarViewControlContext,
  type CalendarViewControlContextValue,
  type CalendarCellRenderState,
  type CalendarGridContextValue,
  type CalenderCellRender,
} from "../../primitives/calendar/calendar-context";
import { CalendarRoot } from "../../primitives/calendar/calendar-root";
import {
  calendarInBoundStrategy,
  calendarIsSameStrategy,
  returnFalse,
  type CalendarView,
  calendarIsSamePanelStrategy,
} from "../../primitives/calendar/utils";
import { tx } from "../../utils/clsx";
import { ariaAttr } from "../../utils/dom";
import { Separator } from "../separator/separator";
import { calendarColorStyles } from "./calendar.styles";
import {
  getRangeFocusedValue,
  type CalendarBaseProps,
  dateRangeStrategy,
  type RangeDate,
  getValidRangeDate,
  type CalendarFormatProps,
} from "./utils";

export type DateRangeCalendarRootProps = {
  view?: CalendarView;
  value: RangeDate;
  setValue: Dispatch<SetStateAction<RangeDate>>;
  disabled: boolean;
  readOnly: boolean;
  dualPanel?: boolean;
  onRangeSelect?: () => void;
} & Required<CalendarFormatProps> &
  CalendarBaseProps;

export function DateRangeCalendarRoot(
  props: PrimitiveProps<"div", DateRangeCalendarRootProps>,
): JSX.Element {
  const {
    value,
    setValue,
    format,
    disabled,
    readOnly,
    minValue,
    maxValue,
    view = "month",
    focusedValue,
    defaultFocusedValue,
    onFocusedValueChange,
    isDateDisabled = returnFalse,
    isDateUnavailable = returnFalse,
    color = "primary",
    dualPanel = false,
    onRangeSelect = noop,
    children,
    ...rest
  } = props;

  const minDate = minValue ? parseDate(minValue, format) : null;
  const maxDate = maxValue ? parseDate(maxValue, format) : null;
  const isSame = calendarIsSameStrategy[view];
  const isSamePanel = calendarIsSamePanelStrategy[view];
  const isInbound = (d: Date): boolean => calendarInBoundStrategy[view](d, minDate, maxDate);
  const dateRange = dateRangeStrategy[view];

  const defaultFocusedDate = defaultFocusedValue ? parseDate(defaultFocusedValue, format) : null;

  const [initLeftFocused, initRightFocused] = defaultFocusedDate
    ? [defaultFocusedDate, dateRange.startOf(dateRange.addUnit(defaultFocusedDate, 1))]
    : getRangeFocusedValue(value, isSamePanel, dateRange);

  const [leftFocused, setLeftFocused] = useControllableState({
    value: focusedValue ? parseDate(focusedValue, format) : undefined,
    defaultValue: initLeftFocused,
    onChange: (d) => onFocusedValueChange?.(formatDate(d, format)),
  });

  const [rightFocused, setRightFocused] = useState(initRightFocused);

  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const isSelected = (d: Date) => {
    return (
      Boolean(value.start && isSame(d, value.start)) || Boolean(value.end && isSame(d, value.end))
    );
  };

  const isRanged = (d: Date) => {
    const { start, end } = value;

    if (start && end) {
      const validLast = getValidRangeDate(
        start,
        end,
        view,
        isDateDisabled,
        isDateUnavailable,
        isInbound,
      );
      const rangeStart = isBefore(validLast, start) ? validLast : start;
      const rangeEnd = isBefore(validLast, start) ? start : validLast;

      return !isBefore(d, rangeStart) && !isAfter(d, rangeEnd);
    }

    if (start && hoverDate) {
      const validHover = getValidRangeDate(
        start,
        hoverDate,
        view,
        isDateDisabled,
        isDateUnavailable,
        isInbound,
      );
      const rangeStart = isBefore(validHover, start) ? validHover : start;
      const rangeEnd = isBefore(validHover, start) ? start : validHover;

      return !isBefore(d, rangeStart) && !isAfter(d, rangeEnd);
    }

    return false;
  };

  const colorStyle = calendarColorStyles[color];

  const handleCellMouseEnter = (state: CalendarCellRenderState) => {
    if (!state.disabled && !isDateUnavailable(state.date, view)) {
      setHoverDate(state.date);
    }
  };

  const cellRender = (
    htmlProps: Parameters<CalenderCellRender>[0],
    state: Parameters<CalenderCellRender>[1],
  ) => {
    const { className, ...rest } = htmlProps;
    const selected = isSelected(state.date);
    const unavailable = isDateUnavailable(state.date, view);
    const ranged = isRanged(state.date);

    return (
      <div
        aria-selected={ariaAttr(selected || ranged)}
        className={tx(
          selected
            ? ["text-fg-emphasized", colorStyle.selected, state.disabled && "opacity-70"]
            : [
                ranged && colorStyle.ranged,
                !state.outside && unavailable && "text-fg-danger-hovered line-through",
              ],
          className,
        )}
        onMouseEnter={() => {
          handleCellMouseEnter(state);
        }}
        {...rest}
      />
    );
  };

  const handleCellClick = (d: Date) => {
    if (isDateUnavailable(d, view)) {
      return;
    }

    setValue((prev) => {
      const { start, end } = prev;

      if (!start || end) {
        if (start && end && isSame(start, d) && isSame(end, d)) {
          onRangeSelect();

          return { start: null, end: null };
        }

        return { start: d, end: null };
      }

      const validLast = getValidRangeDate(
        start,
        d,
        view,
        isDateDisabled,
        isDateUnavailable,
        isInbound,
      );

      if (!isSame(validLast, d)) {
        return { start: d, end: null };
      }

      onRangeSelect();

      if (isBefore(d, start)) {
        return { start: d, end: start };
      }

      return { start, end: d };
    });
  };

  const gridContextValue: CalendarGridContextValue = {
    onMouseLeave: () => {
      setHoverDate(null);
    },
  };

  const isGap = dualPanel ? dateRange.getIsGap(leftFocused, rightFocused) : false;
  const leftMax = dualPanel ? dateRange.endOf(dateRange.addUnit(rightFocused, -1)) : maxDate;
  const rightMin = dualPanel ? dateRange.startOf(dateRange.addUnit(leftFocused, 1)) : null;

  const viewContextValue: CalendarViewControlContextValue = {
    setView: noop,
    minView: view,
    maxView: view,
  };

  return (
    <div className="flex gap-1.5">
      <CalendarRoot
        view={view}
        minDate={minDate}
        maxDate={leftMax}
        date={leftFocused}
        onDateChange={(d) => {
          setLeftFocused(d);
          setHoverDate(d);
        }}
        onCellClick={handleCellClick}
        cellRender={cellRender}
        color={color}
        isDateDisabled={isDateDisabled}
        disabled={disabled}
        display={readOnly}
        {...rest}
      >
        <CalendarViewControlContext value={viewContextValue}>
          <CalendarGridContext value={gridContextValue}>
            <CalendarButtonContext value={{ hideDisabledNext: dualPanel }}>
              {children}
            </CalendarButtonContext>
          </CalendarGridContext>
        </CalendarViewControlContext>
      </CalendarRoot>
      {dualPanel && (
        <>
          <Separator
            className={tx("mt-9 mb-1", !isGap && "invisible")}
            orientation="vertical"
            variant="dotted"
            size={2}
          />
          <CalendarRoot
            view={view}
            minDate={rightMin}
            maxDate={maxDate}
            date={rightFocused}
            onDateChange={(d) => {
              setRightFocused(d);
              setHoverDate(d);
            }}
            onCellClick={handleCellClick}
            cellRender={cellRender}
            color={color}
            isDateDisabled={isDateDisabled}
            disabled={disabled}
            display={readOnly}
            {...rest}
          >
            <CalendarViewControlContext value={viewContextValue}>
              <CalendarGridContext value={gridContextValue}>
                <CalendarButtonContext value={{ hideDisabledPrev: true }}>
                  {children}
                </CalendarButtonContext>
              </CalendarGridContext>
            </CalendarViewControlContext>
          </CalendarRoot>
        </>
      )}
    </div>
  );
}
