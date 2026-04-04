import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import type { CalendarView } from "../../primitives/calendar/utils";
import type { FormFieldProps, ValueProp } from "../../shared/types";
import { VisuallyHiddenInput } from "../visually-hidden/visually-hidden-input";
import { DateRangeCalendarRoot } from "./date-range-calendar-root";
import { useControllableValueRange } from "./use-controllable-value-range";
import { type CalendarBaseProps, type CalendarFormatProps, formatRangeDate } from "./utils";

export type DateRangeCalendarProps = ValueProp<string | null, string> & {
  /**
   * 日期之间的分隔符
   * @default " to "
   */
  separator?: string;

  /**
   * 日历视图
   * @default "month"
   */
  view?: CalendarView;

  /**
   * 是否双面板
   * @default false
   */
  dualPanel?: boolean;
} & CalendarFormatProps &
  FormFieldProps &
  CalendarBaseProps;

export function DateRangeCalendar(
  props: PrimitiveProps<"div", DateRangeCalendarProps>,
): JSX.Element {
  const {
    name,
    required = false,
    readOnly = false,
    disabled = false,
    format = "YYYY-MM-DD",
    separator = " to ",
    value,
    defaultValue,
    onChange,
    ...rest
  } = props;

  const [valueState, setValue] = useControllableValueRange({
    value,
    defaultValue,
    onChange,
    format,
    separator,
  });

  return (
    <>
      <DateRangeCalendarRoot
        value={valueState}
        setValue={setValue}
        format={format}
        disabled={disabled}
        readOnly={readOnly}
        {...rest}
      />
      {name && (
        <VisuallyHiddenInput
          name={name}
          value={formatRangeDate(valueState, format, separator)}
          disabled={disabled}
          required={required}
        />
      )}
    </>
  );
}
