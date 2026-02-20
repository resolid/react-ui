import type { JSX } from "react/jsx-runtime";
import type { Dict, PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { Spinner } from "../spinner/spinner";
import type { ButtonStyleProps } from "./button.styles";

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

export const ButtonSpinner = (props: PrimitiveProps<"span", ButtonSpinnerProps>): JSX.Element => {
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
};
