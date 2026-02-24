import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { CloseButton } from "../close-button/close-button";
import { AlertContext, type AlertContextValue, useAlert } from "./alert-context";
import { alertStyles } from "./alert.styles";

export type AlertProps = Partial<AlertContextValue>;

export const Alert = (props: PrimitiveProps<"div", AlertProps, "role">): JSX.Element => {
  const { children, className, color = "primary", variant = "soft", ...rest } = props;
  return (
    <div role="alert" className={tx(alertStyles({ variant, color }), className)} {...rest}>
      <AlertContext value={{ variant, color }}>{children}</AlertContext>
    </div>
  );
};

export const AlertContent = (props: PrimitiveProps<"div">): JSX.Element => <div {...props} />;

export const AlertTitle = (props: PrimitiveProps<"div">): JSX.Element => {
  const { className, ...rest } = props;

  return <div className={tx("font-medium", className)} {...rest} />;
};

export const AlertDescription = (props: PrimitiveProps<"div">): JSX.Element => {
  const { className, ...rest } = props;

  const { variant } = useAlert();

  return (
    <div
      className={tx(variant != "solid" ? "text-fg-normal" : "text-fg-emphasized", className)}
      {...rest}
    />
  );
};

export const AlertIndicator = (props: PrimitiveProps<"span">): JSX.Element => {
  const { className, ...rest } = props;

  return <span className={tx("shrink-0", className)} {...rest} />;
};

export type AlertCloseButtonProps = {
  /**
   * 大小
   * @default "1.125em"
   */
  size?: string;
};

export const AlertCloseButton = (
  props: PrimitiveProps<"button", AlertCloseButtonProps, "type" | "color">,
): JSX.Element => {
  const { size, ...rest } = props;

  const { variant, color } = useAlert();

  return (
    <CloseButton
      color={color}
      variant={variant === "outline" ? "ghost" : variant === "subtle" ? "soft" : variant}
      size={size}
      {...rest}
    />
  );
};
