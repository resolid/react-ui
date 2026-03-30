import type { JSX } from "react/jsx-runtime";
import { useLayoutEffect } from "react";
import type { PrimitiveProps } from "../../primitives";
import { useImageLoad } from "../../hooks";
import { tx } from "../../utils";
import { useAvatar, useAvatarStatus } from "./avatar-context";

export type AvatarImageProps = {
  /**
   * 头像图片的 URL
   */
  src?: string;
};

export function AvatarImage(
  props: PrimitiveProps<"img", AvatarImageProps, "alt" | "draggable">,
): JSX.Element | null {
  const { src, crossOrigin, referrerPolicy, className, ...rest } = props;

  const { name, radiusClass } = useAvatar();

  const { setImageLoadStatus } = useAvatarStatus();

  const imageLoadStatus = useImageLoad({
    src,
    crossOrigin,
    referrerPolicy,
  });

  useLayoutEffect(() => {
    if (imageLoadStatus != "idle") {
      setImageLoadStatus(imageLoadStatus);
    }
  }, [imageLoadStatus, setImageLoadStatus]);

  if (imageLoadStatus != "loaded") {
    return null;
  }

  return (
    <img
      alt={name}
      src={src}
      draggable={false}
      crossOrigin={crossOrigin}
      referrerPolicy={referrerPolicy}
      className={tx("h-full w-full object-cover", radiusClass, className)}
      {...rest}
    />
  );
}
