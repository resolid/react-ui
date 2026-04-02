import type { Dispatch, SetStateAction } from "react";
import type { CalenderViewBound } from "../../primitives/calendar/calendar-context";
import { useControllableState } from "../../hooks/use-controllable-state";
import { clampView, type CalendarView } from "../../primitives/calendar/utils";

export type UseControllableViewOptions = {
  /**
   * 受控日历视图 - `month` - 月视图 - `year` - 年视图 - `decade` - 十年视图
   */
  view?: CalendarView;

  /**
   * 默认日历视图
   * @default "month"
   */
  defaultView?: CalendarView;

  /**
   * 视图变化的回调
   */
  onViewChange?: (view: CalendarView) => void;
} & CalenderViewBound;

export function useControllableView(
  options: UseControllableViewOptions,
): readonly [CalendarView, Dispatch<SetStateAction<CalendarView>>] {
  const { view, defaultView = "month", onViewChange, minView, maxView } = options;

  return useControllableState({
    value: view !== undefined ? clampView(view, minView, maxView) : undefined,
    defaultValue: clampView(defaultView, minView, maxView),
    onChange: onViewChange,
  });
}
