import { chunk, clamp } from "@resolid/utils";
import {
  addDays,
  endOfMonth,
  startOfMonth,
  startOfWeek,
  toDate,
  type DateInput,
  type DateRange,
  type WeekStartsOn,
  isDateInRange,
  isSameDay,
  isSameMonth,
  isSameYear,
  startOfYear,
  formatDate,
  addMonths,
  addYears,
  endOfDay,
  startOfDay,
  endOfYear,
  weekOfYear,
  type MaybeDateInput,
  isBefore,
  isAfter,
  type FirstWeekContains,
} from "@resolid/utils/date";
import type { EmptyObject, PrimitiveProps } from "../polymorphic";

export type CalendarView = "month" | "year" | "decade";

const VIEWS: CalendarView[] = ["month", "year", "decade"];

export function clampView(
  view: CalendarView,
  minView: CalendarView,
  maxView: CalendarView,
): CalendarView {
  return VIEWS[clamp(VIEWS.indexOf(view), VIEWS.indexOf(minView), VIEWS.indexOf(maxView))]!;
}

export function getNextView(
  view: CalendarView,
  minView: CalendarView,
  maxView: CalendarView,
): CalendarView {
  return clampView(VIEWS[VIEWS.indexOf(view) + 1]!, minView, maxView);
}

export function getPreviousView(
  view: CalendarView,
  minView: CalendarView,
  maxView: CalendarView,
): CalendarView {
  return clampView(VIEWS[VIEWS.indexOf(view) - 1]!, minView, maxView);
}

export function getMonthRange(date: Date): DateRange {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date),
  };
}

export function getMonthDates(monthRange: DateRange, weekStartsOn: WeekStartsOn): Date[] {
  const dates: Date[] = [];

  let current = startOfWeek(monthRange.start, weekStartsOn);

  while (dates.length < 42) {
    dates.push(current);
    current = addDays(current, 1);
  }

  return dates;
}

export function getYearMonths(input: DateInput): Date[] {
  const year = toDate(input).getFullYear();

  return Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));
}

export type DecadeRange = {
  start: number;
  end: number;
};

export function getDecadeRange(input: DateInput): DecadeRange {
  const startYear = Math.floor(toDate(input).getFullYear() / 10) * 10;

  return {
    start: startYear,
    end: startYear + 9,
  };
}

export function getDecadeYears(range: DecadeRange): Date[] {
  return Array.from({ length: 12 }, (_, i) => new Date(range.start - 1 + i, 0, 1));
}

export function returnFalse() {
  return false;
}

export type CalendarCompareStrategy = (date: DateInput, compare: DateInput) => boolean;

export const calendarIsSameStrategy: Record<CalendarView, CalendarCompareStrategy> = {
  month: isSameDay,
  year: isSameMonth,
  decade: isSameYear,
};

export const calendarIsSamePanelStrategy: Record<CalendarView, CalendarCompareStrategy> = {
  month: isSameMonth,
  year: isSameYear,
  decade: (date, compare) =>
    Math.floor(toDate(date).getFullYear() / 10) === Math.floor(toDate(compare).getFullYear() / 10),
};

export type CalendarInBoundStrategy = (
  date: DateInput,
  minDate: MaybeDateInput | undefined,
  maxDate: MaybeDateInput | undefined,
) => boolean;

export const calendarInBoundStrategy: Record<CalendarView, CalendarInBoundStrategy> = {
  month: (date, minDate, maxDate) => isDateInBound(date, minDate, maxDate, startOfDay, endOfDay),
  year: (date, minDate, maxDate) => isDateInBound(date, minDate, maxDate, startOfMonth, endOfMonth),
  decade: (date, minDate, maxDate) => isDateInBound(date, minDate, maxDate, startOfYear, endOfYear),
};

export type CalendarAddUnitStrategy = (date: DateInput, amount: number) => Date;

export const calendarAddUnitStrategy: Record<CalendarView, CalendarAddUnitStrategy> = {
  month: addDays,
  year: addMonths,
  decade: addYears,
};

export const calendarAddPageStrategy: Record<CalendarView, CalendarAddUnitStrategy> = {
  month: addMonths,
  year: addYears,
  decade: (date, amount) => addYears(date, amount * 10),
};

function isDateInBound(
  date: DateInput,
  minDate: MaybeDateInput | undefined,
  maxDate: MaybeDateInput | undefined,
  normalizeMin: (min: DateInput) => Date,
  normalizeMax: (max: DateInput) => Date,
) {
  if (minDate && isBefore(date, normalizeMin(minDate))) {
    return false;
  }

  return !(maxDate && isAfter(date, normalizeMax(maxDate)));
}

export type CalenderViewStrategy = {
  cols: number;
  getGrid: (
    date: Date,
    weekStartsOn: WeekStartsOn,
  ) => { grid: Date[][]; dates: Date[]; range: DateRange | DecadeRange | null };
  isOutside: (date: Date, range: DateRange | DecadeRange | null) => boolean;
  getText: (date: Date, locale: string) => string | number;
  showWeeks: boolean;
  getWeekNumbers?: (
    date: Date,
    weekStartsOn: WeekStartsOn,
    firstWeekContains: FirstWeekContains,
  ) => number;
};

export const calendarViewStrategy: Record<CalendarView, CalenderViewStrategy> = {
  month: {
    cols: 7,
    getGrid: (date, weekStartsOn) => {
      const range = getMonthRange(date);
      const dates = getMonthDates(range, weekStartsOn);

      return {
        grid: chunk(dates, 7),
        dates,
        range,
      };
    },
    isOutside: (date, range) => !isDateInRange(date, range as DateRange),
    getText: (date) => date.getDate(),
    showWeeks: true,
    getWeekNumbers: (date, weekStartsOn, firstWeekContains) => {
      return weekOfYear(date, weekStartsOn, firstWeekContains);
    },
  },
  year: {
    cols: 3,
    getGrid: (date) => {
      const dates = getYearMonths(date);

      return {
        grid: chunk(dates, 3),
        dates,
        range: null,
      };
    },
    isOutside: () => false,
    getText: (date, locale) => formatDate(date, "MMM", { locale }),
    showWeeks: false,
  },
  decade: {
    cols: 3,
    getGrid: (date) => {
      const range = getDecadeRange(date);
      const dates = getDecadeYears(range);

      return {
        grid: chunk(dates, 3),
        dates,
        range,
      };
    },
    isOutside: (date, range) =>
      date.getFullYear() < (range as DecadeRange).start ||
      date.getFullYear() > (range as DecadeRange).end,
    getText: (date) => date.getFullYear(),
    showWeeks: false,
  },
};

export function getActiveIndex(date: Date, dates: Date[], isSame: CalendarCompareStrategy): number {
  return dates.findIndex((d) => isSame(d, date));
}

export type CalendarButtonProps = PrimitiveProps<
  "button",
  EmptyObject,
  "children" | "color" | "disabled" | "type" | "aria-label"
>;
