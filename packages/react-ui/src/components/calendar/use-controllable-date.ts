import type { Dispatch, SetStateAction } from "react";
import { isDefined } from "@resolid/utils";
import type { MultipleValueProps } from "../../shared/types";
import { useControllableState } from "../../hooks";
import { type CalendarFormatProps, formatBaseDate, parseBaseDateValue } from "./utils";

type UseControllableDateOptions = Omit<MultipleValueProps<string>, "multiple"> & {
  multiple: boolean;
} & Required<CalendarFormatProps>;

export function useControllableDate(
  options: UseControllableDateOptions,
): readonly [Date | Date[] | null, Dispatch<SetStateAction<Date | Date[] | null>>] {
  const { value, defaultValue, onChange, multiple, format } = options;

  return useControllableState<Date | Date[] | null>({
    value: isDefined(value) ? parseBaseDateValue(value, format, multiple) : undefined,
    defaultValue: defaultValue
      ? parseBaseDateValue(defaultValue, format, multiple)
      : multiple
        ? []
        : null,
    onChange: (d) => onChange?.(formatBaseDate(d, format)),
  });
}
