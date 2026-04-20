import { isDefined } from "@resolid/utils";
import {
  addMonths,
  addYears,
  type DateInput,
  endOfMonth,
  endOfYear,
  formatDate,
  isAfter,
  isBefore,
  parseDate,
  startOfMonth,
  startOfYear,
  toDate,
} from "@resolid/utils/date";
import type { CalendarShareProps } from "../../primitives/calendar/calendar-root";
import type { CalendarSize } from "../../primitives/calendar/calendar.styles";
import type { InputSize } from "../input/input.styles";
import {
  calendarAddUnitStrategy,
  type CalendarCompareStrategy,
  type CalendarView,
} from "../../primitives/calendar/utils";

export type CalendarFormatProps = {
  /**
   * 日期格式
   *
   * | Token | 示例 | 说明 |
   * |-------|------|------|
   * | `YYYY` | 2026 | 4 位年份 |
   * | `YY` | 26 | 2 位年份 |
   * |-------|------|------|
   * | `MMMM` | 三月/March | 完整月份名（本地化） |
   * | `MMM` | 3月/Mar | 缩写月份名（本地化） |
   * | `MM` | 03 | 2 位月份数字 |
   * | `M` | 3 | 月份数字 |
   * |-------|------|------|
   * | `DD` | 06 | 2 位日期数字 |
   * | `D` | 6 | 日期数字 |
   * |-------|------|------|
   * | `dddd` | 星期五/Friday | 完整星期名（本地化） |
   * | `ddd` | 周五/Fri | 缩写星期名（本地化） |
   * | `d` | 五/F | 单字符星期名（本地化） |
   *
   * @default "YYYY-MM-DD"
   */
  format?: string;
};

export type CalendarBaseProps = {
  /**
   * 最小值
   */
  minValue?: string | null;

  /**
   * 最大值
   */
  maxValue?: string | null;
} & Omit<CalendarShareProps, "display" | "disabled"> & {
    /**
     * 聚焦日期
     */
    focusedValue?: string | null;

    /**
     * 默认聚焦日期
     */
    defaultFocusedValue?: string | null;

    /**
     * 聚焦日期变化回调
     */
    onFocusedValueChange?: (date: string) => void;

    /**
     * 判断日期是否无效
     */
    isDateUnavailable?: (date: Date, view: CalendarView) => boolean;
  };

export function formatBaseDate(date: Date | Date[] | null, format: string): string | string[] {
  if (Array.isArray(date)) {
    return date.map((d) => tryFormatDate(d, format));
  }

  return tryFormatDate(date, format);
}

function tryFormatDate(date: Date | null, format: string): string {
  if (!isDefined(date)) {
    return "";
  }

  try {
    return formatDate(date, format);
  } catch {
    return "";
  }
}

export function tryParseDate(value: string | undefined, format: string): Date | null {
  if (!value || value.length == 0) {
    return null;
  }

  try {
    return parseDate(value, format);
  } catch {
    return null;
  }
}

export function parseBaseDateValue(
  value: string | string[],
  format: string,
  multiple: boolean,
): Date | Date[] | null {
  const isArray = Array.isArray(value);

  if (multiple) {
    if (isArray) {
      return value.map((v) => tryParseDate(v, format)).filter((d) => d != null);
    }

    throw new Error("Calendar: `value` must be an array when `multiple` is true.");
  }

  if (isArray) {
    throw new Error("Calendar: `value` not be an array when `multiple` is false.");
  }

  return tryParseDate(value, format);
}

export type RangeDate = {
  start: Date | null;
  end: Date | null;
};

export function formatRangeDate(range: RangeDate, format: string, separator: string): string {
  return [tryFormatDate(range.start, format), tryFormatDate(range.end, format)]
    .filter((s) => s.length > 0)
    .join(separator);
}

export function parseRangeDateValue(
  value: string | null | undefined,
  format: string,
  separator: string,
): RangeDate {
  if (!value) {
    return { start: null, end: null };
  }

  const [start, end] = value.split(separator);

  return {
    start: tryParseDate(start, format),
    end: tryParseDate(end, format),
  };
}

export function getBaseFocusedValue(
  value: DateInput | DateInput[] | null,
  multiple: boolean,
): Date {
  if (!value) {
    return toDate();
  }

  if (multiple) {
    if (Array.isArray(value)) {
      return toDate(value[0]);
    }

    throw new Error("Calendar: `value` must be an array when `multiple` is true.");
  }

  return toDate(value as DateInput);
}

export function getRangeFocusedValue(
  value: RangeDate,
  isSamePanel: CalendarCompareStrategy,
  rangeStrategy: DateRangeStrategy,
): [Date, Date] {
  if (value.start && value.end) {
    return [
      value.start,
      isSamePanel(value.start, value.end) ? rangeStrategy.addUnit(value.start, 1) : value.end,
    ];
  }

  if (value.start) {
    return [value.start, rangeStrategy.startOf(rangeStrategy.addUnit(value.start, 1))];
  }

  if (value.end) {
    return [rangeStrategy.endOf(rangeStrategy.addUnit(value.end, -1)), value.end];
  }

  return [toDate(), rangeStrategy.startOf(rangeStrategy.addUnit(toDate(), 1))];
}

type DateRangeStrategy = {
  startOf: (date: DateInput) => Date;
  endOf: (date: DateInput) => Date;
  addUnit: (date: DateInput, amount: number) => Date;
  getIsGap: (left: Date, right: Date) => boolean;
};

export const dateRangeStrategy: Record<CalendarView, DateRangeStrategy> = {
  month: {
    startOf: startOfMonth,
    endOf: endOfMonth,
    addUnit: addMonths,
    getIsGap: (left, right) =>
      (right.getFullYear() - left.getFullYear()) * 12 + (right.getMonth() - left.getMonth()) > 1,
  },
  year: {
    startOf: startOfYear,
    endOf: endOfYear,
    addUnit: addYears,
    getIsGap: (left, right) => right.getFullYear() - left.getFullYear() > 1,
  },
  decade: {
    startOf: (date) => {
      return new Date(Math.floor(toDate(date).getFullYear() / 10) * 10, 0, 1);
    },
    endOf: (date) => {
      return new Date(
        Math.floor(toDate(date).getFullYear() / 10) * 10 + 9,
        11,
        31,
        23,
        59,
        59,
        999,
      );
    },
    addUnit: (date, amount) => addYears(date, amount * 10),
    getIsGap: (left, right) =>
      Math.floor(right.getFullYear() / 10) - Math.floor(left.getFullYear() / 10) > 1,
  },
};

export function getValidRangeDate(
  from: Date,
  to: Date,
  view: CalendarView,
  isDateDisabled: (date: Date, view: CalendarView) => boolean,
  isDateUnavailable: (date: Date, view: CalendarView) => boolean,
  isInbound: (date: Date) => boolean,
): Date {
  const forward = !isBefore(to, from);
  let current = from;
  let last = from;

  for (;;) {
    current = calendarAddUnitStrategy[view](current, forward ? 1 : -1);

    if (forward ? isAfter(current, to) : isBefore(current, to)) {
      break;
    }

    if (isDateUnavailable(current, view) || isDateDisabled(current, view) || !isInbound(current)) {
      return last;
    }

    last = current;
  }

  return to;
}

export const inputToCalendarSize: Record<InputSize, CalendarSize> = {
  xs: "sm",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "lg",
};
