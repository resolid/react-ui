import type { JSX } from "react/jsx-runtime";
import { endOfMonth, endOfYear, isAfter, setYear, subMonths, subYears } from "@resolid/utils/date";
import type { CalendarButtonProps } from "./utils";
import { useLocale } from "../../components/provider/locale-context";
import { AngleLeftIcon } from "../../shared/icons";
import { tx } from "../../utils";
import {
  useCalendar,
  useCalendarButton,
  useCalendarDate,
  useCalendarDateControl,
  useCalendarView,
} from "./calendar-context";
import { CalendarNavButton } from "./calendar-nav-button";

export function CalendarPrev(props: CalendarButtonProps): JSX.Element {
  const { className, ...rest } = props;

  const { t } = useLocale();
  const { disabled, color } = useCalendar();
  const view = useCalendarView();
  const { date } = useCalendarDate();
  const { setDate, minDate } = useCalendarDateControl();
  const buttonContext = useCalendarButton(true);

  const prevDate =
    view === "decade"
      ? setYear(date, Math.floor(date.getFullYear() / 10) * 10 - 10)
      : view === "year"
        ? subYears(date, 1)
        : subMonths(date, 1);

  const isDisabled =
    disabled ||
    (minDate != null &&
      !isAfter(view == "month" ? endOfMonth(prevDate) : endOfYear(prevDate), minDate));

  const handleClick = () => {
    setDate(prevDate);
  };

  return (
    <CalendarNavButton
      disabled={isDisabled}
      color={color}
      aria-label={t(`calendar.previous.${view}`)}
      className={tx(
        "size-8",
        isDisabled && ["text-fg-subtle", buttonContext?.hideDisabledPrev && "invisible"],
        className,
      )}
      onClick={handleClick}
      {...rest}
    >
      <AngleLeftIcon />
    </CalendarNavButton>
  );
}
