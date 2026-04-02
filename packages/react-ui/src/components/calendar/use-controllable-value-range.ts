import type { Dispatch, SetStateAction } from "react";
import { isDefined } from "@resolid/utils";
import type { ValueProp } from "../../shared/types";
import { useControllableState } from "../../hooks";
import {
  type CalendarFormatProps,
  formatRangeDate,
  parseRangeDateValue,
  type RangeDate,
} from "./utils";

export type UseControllableValueRangeOptions = ValueProp<string | null, string> & {
  separator: string;
} & Required<CalendarFormatProps>;

export function useControllableValueRange(
  options: UseControllableValueRangeOptions,
): readonly [RangeDate, Dispatch<SetStateAction<RangeDate>>] {
  const { value, defaultValue, onChange, format, separator } = options;

  return useControllableState<RangeDate>({
    value: isDefined(value) ? parseRangeDateValue(value, format, separator) : undefined,
    defaultValue: parseRangeDateValue(defaultValue, format, separator),
    onChange: (r) => onChange?.(formatRangeDate(r, format, separator)),
  });
}
