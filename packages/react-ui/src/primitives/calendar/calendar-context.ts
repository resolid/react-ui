import type { FirstWeekContains, MaybeDateInput, WeekStartsOn } from "@resolid/utils/date";
import type { Dispatch, DOMAttributes, ReactElement, SetStateAction } from "react";
import type { ElementProps } from "../polymorphic";
import type { CalendarColor, CalendarSize } from "./calendar.styles";
import type { CalendarView } from "./utils";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

export type CalendarContextValue = {
  /**
   * 是否禁用
   * @default false
   */
  disabled: boolean;

  /**
   * 大小
   * @default "md"
   */
  size: CalendarSize;

  /**
   * 颜色
   * @default "primary"
   */
  color: CalendarColor;

  /**
   * 是否静态显示
   */
  display: boolean;
};

const [context, hook] = createSafeContext<CalendarContextValue>({
  name: "CalendarContext",
});

export const CalendarContext: SafeContext<CalendarContextValue> = context;
export const useCalendar: UseSafeContext<CalendarContextValue> = hook;

export type CalendarWeekContextValue = {
  /**
   * 一周的第一天
   * `0` - 周日 `1` - 周一 `2` - 周二 `3` - 周三 `4` - 周四 `5` - 周五 `6` - 周六
   * @default 0
   */
  weekStartsOn: WeekStartsOn;

  /**
   * 一年第一周必须包含的最小日期
   * @default 1
   */
  firstWeekContains: FirstWeekContains;

  /**
   * 星期显示格式
   *
   * - "long": "Sunday", "Monday", "Tuesday", etc.
   * - "short": "Sun", "Mon", "Tue", etc.
   * - "narrow": "S", "M", "T", etc.
   * @default 'narrow'
   */
  weekdayFormat: Intl.DateTimeFormatOptions["weekday"];

  /**
   * 是否显示周数
   * @default false
   */
  showWeekNumbers: boolean;
};

const [weekContext, weekHook] = createSafeContext<CalendarWeekContextValue>({
  name: "CalendarWeekContext",
});

export const CalendarWeekContext: SafeContext<CalendarWeekContextValue> = weekContext;
export const useCalendarWeek: UseSafeContext<CalendarWeekContextValue> = weekHook;

const [viewContext, viewHook] = createSafeContext<CalendarView>({
  name: "CalendarViewContext",
});

export const CalendarViewContext: SafeContext<CalendarView> = viewContext;
export const useCalendarView: UseSafeContext<CalendarView> = viewHook;

export type CalenderViewBound = {
  /**
   * 最小日历视图
   * @default 'month'
   */
  minView: CalendarView;

  /**
   * 最大日历视图
   * @default 'decade'
   */
  maxView: CalendarView;
};

export type CalendarViewControlContextValue = CalenderViewBound & {
  setView: Dispatch<SetStateAction<CalendarView>>;
};

const [viewControlContext, viewControlHook] = createSafeContext<CalendarViewControlContextValue>({
  name: "CalendarViewControlContext",
});

export const CalendarViewControlContext: SafeContext<CalendarViewControlContextValue> =
  viewControlContext;
export const useCalendarViewControl: UseSafeContext<CalendarViewControlContextValue> =
  viewControlHook;

export type CalendarDateContextValue = {
  date: Date;
  today: Date;
};

const [dateContext, dateHook] = createSafeContext<CalendarDateContextValue>({
  name: "CalendarDateContext",
});

export const CalendarDateContext: SafeContext<CalendarDateContextValue> = dateContext;
export const useCalendarDate: UseSafeContext<CalendarDateContextValue> = dateHook;

export type CalenderDateBound = {
  /**
   * 最小日期
   */
  minDate?: MaybeDateInput;

  /**
   * 最大日期
   */
  maxDate?: MaybeDateInput;
};

export type CalendarDateControlContextValue = CalenderDateBound & {
  setDate: Dispatch<SetStateAction<Date>>;
};

const [dateControlContext, dateControlHook] = createSafeContext<CalendarDateControlContextValue>({
  name: "CalendarDateControlContext",
});

export const CalendarDateControlContext: SafeContext<CalendarDateControlContextValue> =
  dateControlContext;
export const useCalendarDateControl: UseSafeContext<CalendarDateControlContextValue> =
  dateControlHook;

export type CalendarCellRenderState = {
  date: Date;
  current: boolean;
  outside: boolean;
  disabled: boolean;
};

export type CalenderCellRender = (
  props: ElementProps<"div">,
  state: CalendarCellRenderState,
) => ReactElement;

export type CalendarCellContextValue = {
  /**
   * 判断日期是否禁用
   */
  isDateDisabled?: (date: Date, view: CalendarView) => boolean;

  /**
   * 自定义格子渲染
   */
  cellRender?: CalenderCellRender;

  /**
   * 点击或键盘确认选中日期时的回调
   */
  onCellClick?: (date: Date, view: CalendarView) => void;
};

const [calendarCellContext, calendarCellHook] = createSafeContext<CalendarCellContextValue>({
  name: "CalendarGridContext",
});

export const CalendarCellContext: SafeContext<CalendarCellContextValue> = calendarCellContext;
export const useCalendarCell: UseSafeContext<CalendarCellContextValue> = calendarCellHook;

export type CalendarButtonContextValue = {
  hideDisabledPrev?: boolean;
  hideDisabledNext?: boolean;
};

const [calendarButtonContext, calendarButtonHook] = createSafeContext<CalendarButtonContextValue>({
  name: "CalendarButtonContext",
});

export const CalendarButtonContext: SafeContext<CalendarButtonContextValue> = calendarButtonContext;
export const useCalendarButton: UseSafeContext<CalendarButtonContextValue> = calendarButtonHook;

export type CalendarGridContextValue = Omit<
  DOMAttributes<HTMLTableElement>,
  "onKeyDown" | "children" | "dangerouslySetInnerHTML"
>;

const [calendarGridContext, calendarGridHook] = createSafeContext<CalendarGridContextValue>({
  name: "CalendarGridContext",
});

export const CalendarGridContext: SafeContext<CalendarGridContextValue> = calendarGridContext;
export const useCalendarGrid: UseSafeContext<CalendarGridContextValue> = calendarGridHook;
