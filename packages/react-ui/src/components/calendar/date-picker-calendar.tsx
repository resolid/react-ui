import type { ReactNode } from "react";
import type { EmptyObject, PrimitiveProps } from "../../primitives/polymorphic";
import { usePopperFloating } from "../../primitives/popper/popper-floating-context";
import { DateCalendarRoot } from "./date-calendar-root";
import { useDatePickerCalendar } from "./date-picker-context";
import { PickerContent } from "./picker-content";

export function DatePickerCalendar(props: PrimitiveProps<"div", EmptyObject, "color">): ReactNode {
  const { children, ...rest } = props;

  const { getFloatingProps } = usePopperFloating();

  const calendarProps = useDatePickerCalendar();

  return (
    <PickerContent>
      <DateCalendarRoot color="primary" {...calendarProps} {...getFloatingProps(rest)}>
        {children}
      </DateCalendarRoot>
    </PickerContent>
  );
}
