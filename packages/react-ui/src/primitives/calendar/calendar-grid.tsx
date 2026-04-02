import type { JSX } from "react/jsx-runtime";
import { tokenValues } from "@resolid/utils/date";
import { type KeyboardEvent, useRef } from "react";
import { useDirection } from "../../components/provider/direction-context";
import { useLocale } from "../../components/provider/locale-context";
import { ariaAttr, tx } from "../../utils";
import { type EmptyObject, Polymorphic, type PrimitiveProps } from "../polymorphic";
import {
  type CalendarCellRenderState,
  type CalenderCellRender,
  useCalendar,
  useCalendarDate,
  useCalendarDateControl,
  useCalendarCell,
  useCalendarView,
  useCalendarViewControl,
  useCalendarWeek,
  useCalendarGrid,
} from "./calendar-context";
import {
  calendarBaseStyles,
  calendarColorStyles,
  calendarCurrentStyles,
  calendarSizeStyles,
} from "./calendar.styles";
import {
  calendarInBoundStrategy,
  calendarIsSameStrategy,
  type CalendarView,
  calendarViewStrategy,
  returnFalse,
  getActiveIndex,
  getPreviousView,
  calendarIsSamePanelStrategy,
  calendarAddUnitStrategy,
  calendarAddPageStrategy,
} from "./utils";

export function CalendarGrid(
  props: PrimitiveProps<"table", EmptyObject, "children" | "role" | "color">,
): JSX.Element {
  const { className, ...rest } = props;

  const { t, code } = useLocale();

  const direction = useDirection(true);
  const gridContext = useCalendarGrid(true);

  const {
    isDateDisabled = returnFalse,
    cellRender = defaultCellRender,
    onCellClick,
  } = useCalendarCell();

  const view = useCalendarView();
  const { size, color, display, disabled } = useCalendar();
  const { date, today } = useCalendarDate();
  const { weekStartsOn, firstWeekContains, weekdayFormat, showWeekNumbers } = useCalendarWeek();
  const { setDate, minDate, maxDate } = useCalendarDateControl();
  const { minView, maxView, setView } = useCalendarViewControl();

  const weeks =
    minView == "month"
      ? tokenValues(weekdayFormat == "long" ? "dddd" : weekdayFormat == "short" ? "ddd" : "d", code)
      : [];

  const isSame = calendarIsSameStrategy[view];
  const isSamePanel = calendarIsSamePanelStrategy[view];
  const addUnit = calendarAddUnitStrategy[view];
  const { cols, getGrid, getText, showWeeks, getWeekNumbers, isOutside } =
    calendarViewStrategy[view];

  const { grid, dates, range } = getGrid(date, weekStartsOn);
  const isDisplay = disabled || (display && view == minView);
  const isInbound = (d: Date): boolean => calendarInBoundStrategy[view](d, minDate, maxDate);
  const isFocusable = (d: Date): boolean => !isDateDisabled(d, view) && isInbound(d);

  const activeIndex = getActiveIndex(date, dates, isSame);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cellClick = (d: Date, focus: boolean) => {
    const prevView = getPreviousView(view, minView, maxView);

    if (prevView == view) {
      if (isDisplay) {
        return;
      }

      onCellClick?.(d, view);
    } else {
      setView(prevView);

      if (focus) {
        focusToDate(d, prevView);
      }
    }
  };

  const navigateDate = (amount: number) => {
    let candidate = addUnit(date, amount);

    while (!isFocusable(candidate)) {
      if (!isInbound(candidate)) {
        return null;
      }

      candidate = addUnit(candidate, amount > 0 ? 1 : -1);
    }

    return candidate;
  };

  const navigatePage = (amount: number) => {
    let candidate = calendarAddPageStrategy[view](date, amount);

    while (!isFocusable(candidate)) {
      if (!isInbound(candidate)) {
        return null;
      }

      candidate = addUnit(candidate, amount > 0 ? 1 : -1);
    }

    return candidate;
  };

  const focusToDate = (d: Date, v?: CalendarView) => {
    const index = getActiveIndex(
      d,
      v || !isSamePanel(date, d)
        ? (v ? calendarViewStrategy[v].getGrid : getGrid)(d, weekStartsOn).dates
        : dates,
      v ? calendarIsSameStrategy[v] : isSame,
    );

    queueMicrotask(() => {
      itemRefs.current[index]?.focus();
    });
  };

  const moveToDate = (d: Date | null) => {
    if (d == null) {
      return;
    }

    setDate(d);
    focusToDate(d);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTableElement>) => {
    if (isDisplay) {
      return;
    }

    if (
      [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Enter",
        " ",
      ].includes(e.key)
    ) {
      e.preventDefault();
    }

    if (e.key == "Enter" || e.key == " ") {
      if (isFocusable(date)) {
        cellClick(date, true);
      }

      return;
    }

    if (e.key == "ArrowLeft") {
      moveToDate(navigateDate(direction == "rtl" ? 1 : -1));
      return;
    }

    if (e.key == "ArrowRight") {
      moveToDate(navigateDate(direction == "rtl" ? -1 : 1));
      return;
    }

    if (e.key == "ArrowUp") {
      moveToDate(navigateDate(-cols));
      return;
    }

    if (e.key == "PageUp") {
      moveToDate(navigatePage(-1));
      return;
    }

    if (e.key == "ArrowDown") {
      moveToDate(navigateDate(cols));
      return;
    }

    if (e.key == "PageDown") {
      moveToDate(navigatePage(1));
      return;
    }
  };

  const sizeStyle = calendarSizeStyles[size];
  const colorStyle = calendarColorStyles[color];
  const cellSizeProp = view == "month" ? "dayCellSize" : "monthCellSize";

  return (
    <table
      dir={direction}
      role="grid"
      tabIndex={-1}
      className={tx(sizeStyle.textSize, className)}
      onKeyDown={handleKeyDown}
      {...gridContext}
      {...rest}
    >
      {showWeeks && (
        <thead>
          <tr className="leading-8 text-fg-subtle">
            {showWeekNumbers && <th aria-label={t("calendar.weekNumber")}>#</th>}
            {weeks.map((week) => (
              <th key={week}>{week}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {grid.map((row, idx) => (
          <tr key={idx}>
            {showWeekNumbers && getWeekNumbers && (
              <td className="p-px">
                <div className={tx(calendarBaseStyles, sizeStyle.dayCellSize, "text-fg-subtle")}>
                  {getWeekNumbers(row[0]!, weekStartsOn, firstWeekContains)}
                </div>
              </td>
            )}
            {row.map((cellDate, cellIdx) => {
              const tdIndex = idx * cols + cellIdx;
              const focusable = isFocusable(cellDate);
              const notHover = disabled || isDisplay || !focusable;

              const state = {
                date: cellDate,
                current: isSame(cellDate, today),
                outside: isOutside(cellDate, range),
                disabled: disabled || !focusable,
              };

              const nodeRef = (node: HTMLDivElement) => {
                itemRefs.current[tdIndex] = node;
              };

              return (
                <td key={cellDate.toDateString()} className="p-px">
                  <Polymorphic<"div", CalendarCellRenderState>
                    as="div"
                    state={state}
                    render={cellRender}
                    ref={nodeRef}
                    tabIndex={tdIndex == activeIndex ? 0 : -1}
                    aria-disabled={ariaAttr(state.disabled)}
                    className={tx(
                      "outline-2 outline-offset-1",
                      calendarBaseStyles,
                      colorStyle.base,
                      !notHover && "hover:not-selected:bg-bg-neutral-hovered",
                      state.current && [colorStyle.today, calendarCurrentStyles],
                      state.outside && "opacity-50",
                      state.disabled && "not-selected:text-fg-subtle",
                      sizeStyle[cellSizeProp],
                    )}
                    onClick={(e) => {
                      if (e.defaultPrevented || state.disabled) {
                        return;
                      }

                      setDate(cellDate);
                      cellClick(cellDate, false);
                    }}
                  >
                    {getText(state.date, code)}
                  </Polymorphic>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function defaultCellRender(htmlProps: Parameters<CalenderCellRender>[0]) {
  return <div {...htmlProps} />;
}
