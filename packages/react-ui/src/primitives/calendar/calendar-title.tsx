import type { JSX } from "react/jsx-runtime";
import { formatDate } from "@resolid/utils/date";
import { useLocale } from "../../components/provider/locale-context";
import { tx } from "../../utils";
import {
  useCalendar,
  useCalendarDate,
  useCalendarView,
  useCalendarViewControl,
} from "./calendar-context";
import { CalendarNavButton } from "./calendar-nav-button";
import { type CalendarButtonProps, getDecadeRange, getNextView } from "./utils";

export function CalendarTitle(props: CalendarButtonProps): JSX.Element {
  const { className, ...rest } = props;

  const { t } = useLocale();
  const { color, disabled } = useCalendar();
  const { date } = useCalendarDate();
  const view = useCalendarView();
  const { setView, minView, maxView } = useCalendarViewControl();

  const nextView = getNextView(view, minView, maxView);
  const lastView = view == nextView;
  const isDisabled = disabled || view == maxView;

  const handleClick = () => {
    setView(nextView);
  };

  return (
    <CalendarNavButton
      disabled={isDisabled}
      color={color}
      aria-label={!lastView ? t(`calendar.switchView.${nextView}`) : undefined}
      className={tx("flex-1", className)}
      onClick={handleClick}
      {...rest}
    >
      {view == "month"
        ? formatDate(date, "YYYY-MM")
        : view == "year"
          ? formatDate(date, "YYYY")
          : (({ start, end }) => `${start} - ${end}`)(getDecadeRange(date))}
    </CalendarNavButton>
  );
}
