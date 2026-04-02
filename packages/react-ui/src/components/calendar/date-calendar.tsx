import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import type { FormFieldProps, MultipleValueProps } from "../../shared/types";
import type { UseControllableViewOptions } from "./use-controllable-view";
import { VisuallyHiddenInput } from "../visually-hidden/visually-hidden-input";
import { DateCalendarRoot } from "./date-calendar-root";
import { useControllableValue } from "./use-controllable-value";
import { type CalendarBaseProps, type CalendarFormatProps, formatBaseDate } from "./utils";

export type DateCalendarProps = MultipleValueProps<string> &
  CalendarFormatProps &
  FormFieldProps &
  CalendarBaseProps &
  Partial<UseControllableViewOptions>;

export function DateCalendar(props: PrimitiveProps<"div", DateCalendarProps>): JSX.Element {
  const {
    name,
    value,
    defaultValue,
    onChange,
    format = "YYYY-MM-DD",
    multiple = false,
    required = false,
    readOnly = false,
    disabled = false,
    ...rest
  } = props;

  const [valueState, setValue] = useControllableValue({
    value,
    defaultValue,
    onChange,
    multiple,
    format,
  });

  return (
    <>
      <DateCalendarRoot
        value={valueState}
        setValue={setValue}
        format={format}
        multiple={multiple}
        disabled={disabled}
        readOnly={readOnly}
        {...rest}
      />
      {name && (
        <VisuallyHiddenInput
          name={name}
          value={formatBaseDate(valueState, format)}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
        />
      )}
    </>
  );
}
