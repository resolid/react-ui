import { isNumber } from "@resolid/utils";
import { type CSSProperties, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import type { ImageLoadStatus } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { hasBackgroundBaseClass } from "../../shared/utils";
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

  const {
    name,
    size = group?.size ?? 64,
    radius = group?.radius ?? "full",
    className,
    style,
    children,
    ...rest
  } = props;

  const sizeStyle = isNumber(size) ? `${size}px` : size;
  const radiusStyle = isNumber(radius) && radius > 0 ? `${radius}px` : undefined;
  const radiusClass = radiusStyle
    ? "rounded-(--rv)"
    : radius == "full"
      ? "rounded-full"
      : radius == true
        ? "rounded-md"
        : "";

  const [imageLoadStatus, setImageLoadStatus] = useState<ImageLoadStatus>("idle");

  return (
    <div
      style={{ ...style, "--sv": sizeStyle, "--rv": radiusStyle } as CSSProperties}
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
