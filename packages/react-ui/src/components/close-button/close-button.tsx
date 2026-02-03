import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { CloseIcon } from "../../shared/icons";
import type { Radius } from "../../shared/utils";
import { tx } from "../../utils";
import { Button } from "../button/button";
import type { ButtonStyleProps } from "../button/button.styles";
import { useLocale } from "../provider/locale-context";

export type CloseButtonProps = {
  /**
   * 外观
   * @default "ghost"
   */
  variant?: ButtonStyleProps["variant"];

  /**
   * 颜色
   * @default "neutral"
   */
  color?: ButtonStyleProps["color"];

  /**
   * 大小
   * @default "1.5em"
   */
  size?: string;

  /**
   * 圆角
   * @default "full"
   */
  radius?: Radius;

  /**
   * 无内边距
   * @default false
   */
  noPadding?: boolean;
};

export const CloseButton = (
  props: PrimitiveProps<"button", CloseButtonProps, "type">,
): JSX.Element => {
  const { t } = useLocale();

  const {
    className,
    disabled,
    noPadding = false,
    variant = "ghost",
    color = "neutral",
    size = "1.125em",
    radius = "full",
    "aria-label": ariaLabel = t("closeButton.label"),
    children,
    ...rest
  } = props;

  return (
    <Button
      type={"button"}
      disabled={disabled}
      variant={variant}
      color={color}
      iconOnly
      noPadding
      radius={radius}
      aria-label={ariaLabel}
      className={tx(!noPadding && "p-1", className)}
      {...rest}
    >
      {children || <CloseIcon className={"-mb-[.1em]"} size={size} />}
    </Button>
  );
};
