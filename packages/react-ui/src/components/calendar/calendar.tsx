import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { CalendarViewControlContext } from "../../primitives/calendar/calendar-context";
import { CalendarRoot, type CalendarRootProps } from "../../primitives/calendar/calendar-root";
import { useControllableView, type UseControllableViewOptions } from "./use-controllable-view";

export type CalendarProps = Omit<CalendarRootProps, "view"> & Partial<UseControllableViewOptions>;

export function Calendar(props: PrimitiveProps<"div", CalendarProps>): JSX.Element {
  const {
    view,
    defaultView,
    minView = "month",
    maxView = "decade",
    onViewChange,
    children,
    ...rest
  } = props;

  const [viewState, setView] = useControllableView({
    view,
    defaultView,
    onViewChange,
    minView,
    maxView,
  });

  return (
    <CalendarRoot view={viewState} {...rest}>
      <CalendarViewControlContext value={{ setView, minView, maxView }}>
        {children}
      </CalendarViewControlContext>
    </CalendarRoot>
  );
}

export { CalendarGrid } from "../../primitives/calendar/calendar-grid";
export { CalendarPrev } from "../../primitives/calendar/calendar-prev";
export { CalendarNext } from "../../primitives/calendar/calendar-next";
export { CalendarTitle } from "../../primitives/calendar/calendar-title";
export {
  type CalendarButtonContextValue,
  type CalendarGridContextValue,
  CalendarButtonContext,
  CalendarGridContext,
} from "../../primitives/calendar/calendar-context";
