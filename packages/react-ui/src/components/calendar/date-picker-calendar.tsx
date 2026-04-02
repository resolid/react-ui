import type { JSX } from "react/jsx-runtime";
import { FloatingFocusManager } from "@floating-ui/react";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { usePopperFloating } from "../../primitives/popper/popper-floating-context";
import { PopperPositioner } from "../../primitives/popper/popper-positioner";
import { usePopperTransition } from "../../primitives/popper/popper-transtion-context";
import { getPopperAnimationProps } from "../../primitives/popper/utils";
import { tx } from "../../utils";
import { Portal } from "../portal/portal";
import { DateCalendarRoot } from "./date-calendar-root";
import { useDatePickerCalendar } from "./date-picker-context";
import { usePickerRoot } from "./picker-context";

export function DatePickerCalendar(
  props: PrimitiveProps<"div", EmptyObject, "color">,
): JSX.Element | null {
  const { children, ...rest } = props;

  const { context } = usePickerRoot();
  const { status, mounted, duration } = usePopperTransition();
  const { getFloatingProps } = usePopperFloating();

  const calendarProps = useDatePickerCalendar();

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
          <DateCalendarRoot color="primary" {...calendarProps} {...getFloatingProps(rest)}>
            {children}
          </DateCalendarRoot>
        </FloatingFocusManager>
      </PopperPositioner>
    </Portal>
  );
}
