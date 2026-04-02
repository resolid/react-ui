import type { DateRangeCalendarRootProps } from "./date-range-calendar-root";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type DateRangePickerStateContextValue = {
  value: string;
};

const [stateContext, stateHook] = createSafeContext<DateRangePickerStateContextValue>({
  name: "DateRangePickerStateContext",
});

export const DateRangePickerStateContext: SafeContext<DateRangePickerStateContextValue> =
  stateContext;
export const useDateRangePickerState: UseSafeContext<DateRangePickerStateContextValue> = stateHook;

export type DateRangePickerCalendarContextValue = Omit<DateRangeCalendarRootProps, "color">;

const [calendarContext, calendarHook] = createSafeContext<DateRangePickerCalendarContextValue>({
  name: "DateRangePickerCalendarContext",
});

export const DateRangePickerCalendarContext: SafeContext<DateRangePickerCalendarContextValue> =
  calendarContext;
export const useDateRangePickerCalendar: UseSafeContext<DateRangePickerCalendarContextValue> =
  calendarHook;
