import type { ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils/clsx";
import { ButtonGroupContext, type ButtonGroupContextValue } from "./button-group-context";

export type ButtonGroupProps = ButtonGroupContextValue;

export function ButtonGroup(props: PrimitiveProps<"div", ButtonGroupProps, "role">): ReactNode {
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
      // react-doctor-disable-next-line react-doctor/prefer-tag-over-role
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
}
