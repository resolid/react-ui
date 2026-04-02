import type { Dispatch, SetStateAction } from "react";
import { isDefined } from "@resolid/utils";
import type { MultipleValueProps } from "../../shared/types";
import { useControllableState } from "../../hooks";
import { type CalendarFormatProps, formatBaseDate, parseBaseDateValue } from "./utils";

type UseControllableValueOptions = Omit<MultipleValueProps<string>, "multiple"> & {
  multiple: boolean;
} & Required<CalendarFormatProps>;

export function useControllableValue(
  options: UseControllableValueOptions,
): readonly [Date | Date[] | null, Dispatch<SetStateAction<Date | Date[] | null>>] {
  const { value, defaultValue, multiple, format, onChange } = options;

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
