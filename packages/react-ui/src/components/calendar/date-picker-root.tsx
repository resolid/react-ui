import type { JSX } from "react/jsx-runtime";
import { type Dispatch, type PropsWithChildren, type SetStateAction, useRef } from "react";
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
import { useControllableDate } from "./use-controllable-date";
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

  const [valueState, setValue] = useControllableDate({
    value,
    defaultValue,
    onChange,
    multiple,
    format,
  });

  const setFocusedValueRef = useRef<Dispatch<SetStateAction<Date>> | null>(null);

  const formatedValue = formatBaseDate(valueState, format);

  const stateContextValue: DatePickerStateContextValue = {
    value: formatedValue,
    format: format,
    update: (d) => {
      if (setFocusedValueRef.current) {
        setFocusedValueRef.current(d);
      }

      setValue((prev) => {
        if (Array.isArray(prev)) {
          return [...prev.filter((p) => formatBaseDate(p, format) != formatBaseDate(d, format)), d];
        } else {
          return d;
        }
      });
    },
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
    setFocusedValueRef,
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
