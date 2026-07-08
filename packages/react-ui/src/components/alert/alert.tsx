import type { ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
import { tx } from "../../utils/clsx";
import { CloseButton } from "../close-button/close-button";
import { AlertContext, type AlertContextValue, useAlert } from "./alert-context";
import { alertStyles } from "./alert.styles";

export type AlertProps = Partial<AlertContextValue>;

export function Alert(props: PrimitiveProps<"div", AlertProps, "role">): ReactNode {
  const { children, className, color = "primary", variant = "soft", ...rest } = props;
  return (
    <div role="alert" className={tx(alertStyles({ variant, color }), className)} {...rest}>
      <AlertContext value={{ variant, color }}>{children}</AlertContext>
    </div>
  );
}

export function AlertContent(props: PrimitiveProps<"div">): ReactNode {
  return <div {...props} />;
}

export function AlertTitle(props: PrimitiveProps<"div">): ReactNode {
  const { className, ...rest } = props;

  return <div className={tx("font-medium", className)} {...rest} />;
}

export function AlertDescription(props: PrimitiveProps<"div">): ReactNode {
  const { className, ...rest } = props;

  const { variant } = useAlert();

  return (
    <div
      className={tx(variant == "solid" ? "text-fg-emphasized" : "text-fg-normal", className)}
      {...rest}
    />
  );
}

export function AlertIndicator(props: PrimitiveProps<"span">): ReactNode {
  const { className, ...rest } = props;

  return <span className={tx("shrink-0", className)} {...rest} />;
}

export type AlertCloseButtonProps = {
  /**
   * 大小
   * @default "1.125em"
   */
  size?: string;
};

export function AlertCloseButton(
  props: PrimitiveProps<"button", AlertCloseButtonProps, "type" | "color">,
): ReactNode {
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
}
