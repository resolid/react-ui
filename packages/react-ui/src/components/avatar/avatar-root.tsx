import type { JSX } from "react/jsx-runtime";
import { isNumber } from "@resolid/utils";
import { type CSSProperties, useState } from "react";
import type { ImageLoadStatus } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { getRadiusStyleAndClass, hasBackgroundBaseClass } from "../../shared/utils";
import { tx } from "../../utils";
import { AvatarContext, AvatarStatusContext } from "./avatar-context";
import { type AvatarBaseProps, useAvatarGroup } from "./avatar-group-context";

export type AvatarRootProps = {
  /**
   * 头像的人名
   */
  name?: string;
} & AvatarBaseProps;

export const AvatarRoot = (props: PrimitiveProps<"div", AvatarRootProps>): JSX.Element => {
  const group = useAvatarGroup(true);

  const { name, size: sizeProp, radius: radiusProp, className, style, children, ...rest } = props;

  const size = sizeProp ?? group?.size ?? 64;
  const radius = radiusProp ?? group?.radius ?? "full";

  const sizeVariable = isNumber(size) ? `${size}px` : size;
  const { radiusStyle, radiusClass } = getRadiusStyleAndClass(radius);

  const [imageLoadStatus, setImageLoadStatus] = useState<ImageLoadStatus>("idle");

  return (
    <div
      style={{ ...style, ...radiusStyle, "--sv": sizeVariable } as CSSProperties}
      className={tx(
        "relative inline-flex h-(--sv) w-(--sv) shrink-0 items-center justify-center select-none",
        radiusClass,
        group && "border-2 border-bg-normal not-first:ms-(--pv)",
        !hasBackgroundBaseClass(className) && "bg-bg-subtlest",
        className,
      )}
      {...rest}
    >
      <AvatarContext value={{ name, radiusClass }}>
        <AvatarStatusContext value={{ imageLoadStatus, setImageLoadStatus }}>
          {children}
        </AvatarStatusContext>
      </AvatarContext>
    </div>
  );
};
