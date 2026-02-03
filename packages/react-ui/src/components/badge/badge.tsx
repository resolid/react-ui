import type { JSX } from "react/jsx-runtime";
import { Polymorphic, type PolymorphicProps } from "../../primitives";
import { getRadiusStyleAndClass, type Radius } from "../../shared/utils";
import { tx } from "../../utils";
import { type BadgeStyleProps, badgeStyles } from "./badge.styles";

export type BadgeProps = {
  /**
   * 外观
   * @default "solid"
   */
  variant?: BadgeStyleProps["variant"];

  /**
   * 颜色
   * @default "primary"
   */
  color?: BadgeStyleProps["color"];

  /**
   * 圆角
   * @default "md"
   */
  radius?: Radius;
};

export const Badge = (props: PolymorphicProps<"span", BadgeProps>): JSX.Element => {
  const {
    render,
    color = "primary",
    variant = "solid",
    radius = "md",
    className,
    children,
    style,
    ...rest
  } = props;

  const { radiusStyle, radiusClass } = getRadiusStyleAndClass(radius);

  return (
    <Polymorphic<"span">
      as={"span"}
      render={render}
      style={{ ...style, ...radiusStyle }}
      className={tx(badgeStyles({ color, variant }), radiusClass, className)}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
};
