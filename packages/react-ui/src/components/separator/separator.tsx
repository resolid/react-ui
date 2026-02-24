import type { CSSProperties } from "react";
import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { type SeparatorStyleProps, separatorStyles } from "./separator.styles";

export type SeparatorProps = {
  /**
   * 外观
   * @default "solid"
   */
  variant?: SeparatorStyleProps["variant"];

  /**
   * 颜色
   * @default "neutral"
   */
  color?: SeparatorStyleProps["color"];

  /**
   * 布局方向
   * @default "horizontal"
   */
  orientation?: SeparatorStyleProps["orientation"];

  /**
   * 大小
   * @default 1
   */
  size?: number;

  /**
   * 文字位置
   * @default "center"
   */
  position?: "left" | "right" | "center";
};

export const Separator = (props: PrimitiveProps<"div", SeparatorProps, "role">): JSX.Element => {
  const {
    color = "neutral",
    orientation = "horizontal",
    size = 1,
    variant = "solid",
    position = "center",
    className,
    children,
    ...rest
  } = props;

  const hasLabel = !!children && orientation == "horizontal";

  return (
    <div
      role="separator"
      tabIndex={-1}
      aria-orientation={orientation}
      style={
        {
          "--sv": `${size}px`,
        } as CSSProperties
      }
      className={tx(
        separatorStyles({ color, variant, orientation, label: hasLabel, position }),
        className,
      )}
      {...rest}
    >
      {hasLabel && children}
    </div>
  );
};
