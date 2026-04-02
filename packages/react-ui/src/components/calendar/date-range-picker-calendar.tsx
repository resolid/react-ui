import type { JSX } from "react/jsx-runtime";
import { FloatingFocusManager } from "@floating-ui/react";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { usePopperFloating } from "../../primitives/popper/popper-floating-context";
import { PopperPositioner } from "../../primitives/popper/popper-positioner";
import { usePopperTransition } from "../../primitives/popper/popper-transtion-context";
import { getPopperAnimationProps } from "../../primitives/popper/utils";
import { tx } from "../../utils";
import { Portal } from "../portal/portal";
import { DateRangeCalendarRoot } from "./date-range-calendar-root";
import { useDateRangePickerCalendar } from "./date-range-picker-context";
import { usePickerRoot } from "./picker-context";

export function DateRangePickerCalendar(
  props: PrimitiveProps<"div", EmptyObject, "color">,
): JSX.Element | null {
  const { children, ...rest } = props;

  const { context } = usePickerRoot();
  const { status, mounted, duration } = usePopperTransition();
  const { getFloatingProps } = usePopperFloating();

  const calendarProps = useDateRangePickerCalendar();

  if (!mounted) {
    return null;
  }

  const animationProps = getPopperAnimationProps({ status, duration });

  return (
    <Portal>
      <PopperPositioner
        style={animationProps.style}
        className={tx(
          "rounded-md border  border-bd-normal bg-bg-normal p-2 shadow-sm",
          animationProps.className,
        )}
      >
        <FloatingFocusManager
          disabled={!context.open}
          context={context}
          modal={false}
          returnFocus={false}
        >
          <DateRangeCalendarRoot color="primary" {...calendarProps} {...getFloatingProps(rest)}>
            {children}
          </DateRangeCalendarRoot>
        </FloatingFocusManager>
      </PopperPositioner>
    </Portal>
  );
}
