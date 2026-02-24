import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { ButtonGroupContext, type ButtonGroupContextValue } from "./button-group-context";

export type ButtonGroupProps = ButtonGroupContextValue;

export const ButtonGroup = (
  props: PrimitiveProps<"div", ButtonGroupProps, "role">,
): JSX.Element => {
  const {
    children,
    orientation = "horizontal",
    variant,
    color,
    size,
    disabled,
    className,
    ...rest
  } = props;

  return (
    <div
      role="group"
      className={tx(
        "inline-flex",
        orientation == "horizontal" ? "flex-row" : "flex-col",
        className,
      )}
      {...rest}
    >
      <ButtonGroupContext value={{ variant, color, size, disabled, orientation }}>
        {children}
      </ButtonGroupContext>
    </div>
  );
};
