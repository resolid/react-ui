import type { PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";
import type { DisclosureProps } from "../../shared/types";
import type { InputSize } from "../input/input.styles";
import type { DateCalendarProps } from "./date-calendar";
import { VisuallyHiddenInput } from "../visually-hidden/visually-hidden-input";
import {
  DatePickerCalendarContext,
  type DatePickerCalendarContextValue,
  DatePickerStateContext,
  type DatePickerStateContextValue,
} from "./date-picker-context";
import { PickerProvider } from "./picker-provider";
import { useControllableValue } from "./use-controllable-value";
import { usePicker } from "./use-picker";
import { formatBaseDate, inputToCalendarSize } from "./utils";

export type DatePickerRootProps = DisclosureProps & {
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
} & Omit<DateCalendarProps, "color" | "size">;

export function DatePickerRoot(props: PropsWithChildren<DatePickerRootProps>): JSX.Element {
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
    multiple = false,
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

  const pickProviderValue = usePicker({
    open,
    defaultOpen,
    onOpenChange,
    duration,
    closeOnSelect,
    disabled,
    invalid,
    readOnly,
    required,
    multiple,
    placeholder,
    size,
  });

  const [valueState, setValue] = useControllableValue({
    value,
    defaultValue,
    onChange,
    multiple,
    format,
  });

  const formatedValue = formatBaseDate(valueState, format);

  const stateContextValue: DatePickerStateContextValue = {
    value: formatedValue,
    remove: (v) => {
      setValue((prev) => {
        if (Array.isArray(prev)) {
          return prev.filter((p) => {
            return formatBaseDate(p, format) != v;
          });
        }

        return prev;
      });
    },
  };

  const calendarContextValue: DatePickerCalendarContextValue = {
    value: valueState,
    setValue,
    size: inputToCalendarSize[size],
    disabled,
    readOnly,
    multiple,
    format,
    onDateSelect: () => {
      if (closeOnSelect && !multiple) {
        pickProviderValue.rootContextValue.context.onOpenChange(false);
      }
    },
    ...rest,
  };

  return (
    <>
      <PickerProvider value={pickProviderValue}>
        <DatePickerStateContext value={stateContextValue}>
          <DatePickerCalendarContext value={calendarContextValue}>
            {children}
          </DatePickerCalendarContext>
        </DatePickerStateContext>
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
