import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../polymorphic";
import { tx } from "../../utils";
import { calendarBaseStyles, type CalendarColor, calendarColorStyles } from "./calendar.styles";

export function CalendarNavButton(
  props: PrimitiveProps<"button", { color: CalendarColor }>,
): JSX.Element {
  const { className, disabled, color, ...rest } = props;

  const colorStyle = calendarColorStyles[color];

  return (
    <button
      type="button"
      disabled={disabled}
      className={tx(
        calendarBaseStyles,
        colorStyle.base,
        !disabled && "hover:bg-bg-neutral-hovered",
        className,
      )}
      {...rest}
    />
  );
}
