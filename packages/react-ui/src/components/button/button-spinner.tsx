import type { ReactNode } from "react";
import type { Dict, PrimitiveProps } from "../../primitives/polymorphic";
import type { ButtonStyleProps } from "./button.styles";
import { tx } from "../../utils/clsx";
import { Spinner } from "../spinner/spinner";

export type ButtonSpinnerProps = {
  size: NonNullable<ButtonStyleProps["size"]>;
  label?: string;
};

const SpinnerSizes: Dict<ButtonSpinnerProps["size"]> = {
  xs: "xs",
  sm: "xs",
  md: "sm",
  lg: "md",
  xl: "lg",
};

export function ButtonSpinner(props: PrimitiveProps<"span", ButtonSpinnerProps>): ReactNode {
  const { label, size, className, children: childrenProp, ...rest } = props;

  const children = childrenProp ?? <Spinner size={SpinnerSizes[size]} />;

  return (
    <span
      className={tx("flex items-center justify-center", label ? "relative" : "absolute", className)}
      {...rest}
    >
      {children}
    </span>
  );
}
