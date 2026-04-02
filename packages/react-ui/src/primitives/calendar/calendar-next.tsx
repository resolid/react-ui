import type { JSX } from "react/jsx-runtime";
import {
  addMonths,
  addYears,
  isBefore,
  setYear,
  startOfMonth,
  startOfYear,
} from "@resolid/utils/date";
import type { CalendarButtonProps } from "./utils";
import { useLocale } from "../../components/provider/locale-context";
import { AngleRightIcon } from "../../shared/icons";
import { tx } from "../../utils";
import {
  useCalendar,
  useCalendarButton,
  useCalendarDate,
  useCalendarDateControl,
  useCalendarView,
} from "./calendar-context";
import { CalendarNavButton } from "./calendar-nav-button";

export function CalendarNext(props: CalendarButtonProps): JSX.Element {
  const { className, ...rest } = props;

  const { t } = useLocale();
  const { disabled, color } = useCalendar();
  const view = useCalendarView();
  const { date } = useCalendarDate();
  const { setDate, maxDate } = useCalendarDateControl();
  const buttonContext = useCalendarButton(true);

  const nextDate =
    view === "decade"
      ? setYear(date, Math.floor(date.getFullYear() / 10) * 10 + 10)
      : view === "year"
        ? addYears(date, 1)
        : addMonths(date, 1);

  const isDisabled =
    disabled ||
    (maxDate != null &&
      !isBefore(view == "month" ? startOfMonth(nextDate) : startOfYear(nextDate), maxDate));

  const handleClick = () => {
    setDate(nextDate);
  };

  return (
    <CalendarNavButton
      aria-label={t(`calendar.next.${view}`)}
      disabled={isDisabled}
      color={color}
      className={tx(
        "size-8",
        isDisabled && ["text-fg-subtle", buttonContext?.hideDisabledNext && "invisible"],
        className,
      )}
      onClick={handleClick}
      {...rest}
    >
      <AngleRightIcon />
    </CalendarNavButton>
  );
}
