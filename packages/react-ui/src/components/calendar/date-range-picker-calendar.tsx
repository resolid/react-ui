import type { JSX } from "react/jsx-runtime";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { usePopperFloating } from "../../primitives/popper/popper-floating-context";
import { DateRangeCalendarRoot } from "./date-range-calendar-root";
import { useDateRangePickerCalendar } from "./date-range-picker-context";
import { PickerContent } from "./picker-content";

export function DateRangePickerCalendar(
  props: PrimitiveProps<"div", EmptyObject, "color">,
): JSX.Element | null {
  const { children, ...rest } = props;

  const { getFloatingProps } = usePopperFloating();
  const calendarProps = useDateRangePickerCalendar();

  return (
    <PickerContent>
      <DateRangeCalendarRoot color="primary" {...calendarProps} {...getFloatingProps(rest)}>
        {children}
      </DateRangeCalendarRoot>
    </PickerContent>
  );
}
