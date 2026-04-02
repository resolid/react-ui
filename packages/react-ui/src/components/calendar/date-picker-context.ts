import type { DateCalendarRootProps } from "./date-calendar-root";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type DatePickerStateContextValue = {
  value: string | string[];
  remove: (value: string) => void;
};

const [stateContext, stateHook] = createSafeContext<DatePickerStateContextValue>({
  name: "DatePickerStateContext",
});

export const DatePickerStateContext: SafeContext<DatePickerStateContextValue> = stateContext;
export const useDatePickerState: UseSafeContext<DatePickerStateContextValue> = stateHook;

export type DatePickerCalendarContextValue = Omit<DateCalendarRootProps, "color">;

const [calendarContext, calendarHook] = createSafeContext<DatePickerCalendarContextValue>({
  name: "DatePickerCalendarContext",
});

export const DatePickerCalendarContext: SafeContext<DatePickerCalendarContextValue> =
  calendarContext;
export const useDatePickerCalendar: UseSafeContext<DatePickerCalendarContextValue> = calendarHook;
