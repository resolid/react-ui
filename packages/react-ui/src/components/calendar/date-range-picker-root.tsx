import type { PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";
import type { DisclosureProps } from "../../shared/types";
import type { InputSize } from "../input/input.styles";
import type { DateRangeCalendarProps } from "./date-range-calendar";
import { VisuallyHiddenInput } from "../visually-hidden/visually-hidden-input";
import {
  DateRangePickerCalendarContext,
  type DateRangePickerCalendarContextValue,
  DateRangePickerStateContext,
  type DateRangePickerStateContextValue,
} from "./date-range-picker-context";
import { PickerProvider } from "./picker-provider";
import { useControllableDateRange } from "./use-controllable-date-range";
import { usePicker } from "./use-picker";
import { formatRangeDate, inputToCalendarSize } from "./utils";

export type DateRangePickerRootProps = DisclosureProps & {
  /**
   * 占位符
   */
  placeholder?: string;

  /**
   * 是否无效
   * @default false
   */
  invalid?: boolean;

  /**
   * 选中后关闭
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * 大小
   * @default "md"
   */
  size?: InputSize;
} & Omit<DateRangeCalendarProps, "color" | "size">;

export function DateRangePickerRoot(
  props: PropsWithChildren<DateRangePickerRootProps>,
): JSX.Element {
  const {
    open,
    defaultOpen,
    onOpenChange,
    duration,
    name,
    value,
    defaultValue,
    onChange,
    format = "YYYY-MM-DD",
    separator = " to ",
    required = false,
    readOnly = false,
    disabled = false,
    invalid = false,
    closeOnSelect = true,
    placeholder,
    size = "md",
    children,
    ...rest
  } = props;

  const pickerProviderValue = usePicker({
    open,
    defaultOpen,
    onOpenChange,
    duration,
    closeOnSelect,
    disabled,
    invalid,
    readOnly,
    required,
    placeholder,
    size,
  });

  const [valueState, setValue] = useControllableDateRange({
    value,
    defaultValue,
    onChange,
    format,
    separator,
  });

  const formatedValue = formatRangeDate(valueState, format, separator);

  const stateContextValue: DateRangePickerStateContextValue = {
    value: formatedValue,
  };

  const calendarContextValue: DateRangePickerCalendarContextValue = {
    value: valueState,
    setValue,
    size: inputToCalendarSize[size],
    disabled,
    readOnly,
    format,
    onRangeSelect: () => {
      if (closeOnSelect) {
        pickerProviderValue.rootContextValue.context.onOpenChange(false);
      }
    },
    ...rest,
  };

  return (
    <>
      <PickerProvider value={pickerProviderValue}>
        <DateRangePickerStateContext value={stateContextValue}>
          <DateRangePickerCalendarContext value={calendarContextValue}>
            {children}
          </DateRangePickerCalendarContext>
        </DateRangePickerStateContext>
      </PickerProvider>
      {name && (
        <VisuallyHiddenInput
          name={name}
          value={formatedValue}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
        />
      )}
    </>
  );
}
