import type { JSX } from "react/jsx-runtime";
import { type DateInput, toDate, clampDate } from "@resolid/utils/date";
import type { PrimitiveProps } from "../polymorphic";
import type { CalendarView } from "./utils";
import { useControllableState } from "../../hooks";
import { ariaAttr } from "../../utils";
import {
  CalendarContext,
  type CalendarContextValue,
  CalendarDateContext,
  type CalendarDateContextValue,
  CalendarDateControlContext,
  type CalendarDateControlContextValue,
  CalendarCellContext,
  type CalendarCellContextValue,
  CalendarViewContext,
  CalendarWeekContext,
  type CalendarWeekContextValue,
  type CalenderDateBound,
} from "./calendar-context";

export type CalendarShareProps = Partial<CalendarContextValue> &
  Partial<CalendarWeekContextValue> &
  Omit<CalendarCellContextValue, "onCellClick" | "cellRender">;

export type CalendarRootProps = {
  view: CalendarView;
  /**
   * 日期
   * @default "today"
   */
  date?: DateInput;

  /**
   * 日期改变回调
   */
  onDateChange?: (date: Date) => void;
} & CalendarShareProps &
  Partial<CalenderDateBound> &
  CalendarCellContextValue;

export function CalendarRoot(props: PrimitiveProps<"div", CalendarRootProps>): JSX.Element {
  const {
    size = "md",
    color = "primary",
    disabled = false,
    display = false,
    date,
    onDateChange,
    minDate,
    maxDate,
    view,
    weekStartsOn = 0,
    firstWeekContains = 1,
    weekdayFormat = "narrow",
    showWeekNumbers = false,
    isDateDisabled,
    onCellClick,
    cellRender,
    children,
    ...rest
  } = props;

  const today = toDate();

  const [dateStatus, setDate] = useControllableState({
    value: date ? clampDate(date, minDate, maxDate) : undefined,
    defaultValue: clampDate(today, minDate, maxDate),
    onChange: onDateChange,
  });

  const contextValue: CalendarContextValue = {
    size,
    color,
    display,
    disabled,
  };

  const weekContextValue: CalendarWeekContextValue = {
    weekStartsOn,
    firstWeekContains,
    weekdayFormat,
    showWeekNumbers,
  };

  const dateContextValue: CalendarDateContextValue = {
    date: dateStatus,
    today,
  };

  const dateControlContextValue: CalendarDateControlContextValue = {
    setDate,
    minDate,
    maxDate,
  };

  const cellContextValue: CalendarCellContextValue = {
    isDateDisabled,
    onCellClick,
    cellRender,
  };

  return (
    <div role="application" aria-disabled={ariaAttr(disabled)} {...rest}>
      <CalendarContext value={contextValue}>
        <CalendarViewContext value={view}>
          <CalendarWeekContext value={weekContextValue}>
            <CalendarDateContext value={dateContextValue}>
              <CalendarDateControlContext value={dateControlContextValue}>
                <CalendarCellContext value={cellContextValue}>{children}</CalendarCellContext>
              </CalendarDateControlContext>
            </CalendarDateContext>
          </CalendarWeekContext>
        </CalendarViewContext>
      </CalendarContext>
    </div>
  );
}
