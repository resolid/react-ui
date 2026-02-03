import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import type { Orientation } from "../../shared/types";
import { getRadiusStyleAndClass, hasWidthHeightBaseClass, type Radius } from "../../shared/utils";
import { tx } from "../../utils";
import { ProgressBaseContext, type ProgressBaseContextValue } from "./progress-context";

export type ProgressBarRootProps = Partial<
  Omit<ProgressBaseContextValue, "vertical" | "radiusClass">
> & {
  /**
   * 圆角
   * @default "full"
   */
  radius?: Radius;

  /**
   * 方向
   * @default "horizontal"
   */
  orientation?: Orientation;
};

export const ProgressBarRoot = (
  props: PrimitiveProps<"div", ProgressBarRootProps>,
): JSX.Element => {
  const {
    size = "md",
    radius = "full",
    orientation = "horizontal",
    className,
    children,
    style,
    ...rest
  } = props;

  const vertical = orientation == "vertical";
  const { radiusStyle, radiusClass } = getRadiusStyleAndClass(radius);

  const baseContextValue = {
    size,
    vertical,
    radiusClass,
  };

  const shouldApplyDefaultSize = !hasWidthHeightBaseClass(className);

  return (
    <div
      style={{ ...style, ...radiusStyle }}
      className={tx(
        "relative flex overflow-hidden bg-bg-subtle",
        vertical ? "flex-col-reverse" : "flex-row",
        shouldApplyDefaultSize && (vertical ? "h-full" : "w-full"),
        radiusClass,
        className,
      )}
      {...rest}
    >
      <ProgressBaseContext value={baseContextValue}>{children}</ProgressBaseContext>
    </div>
  );
};
