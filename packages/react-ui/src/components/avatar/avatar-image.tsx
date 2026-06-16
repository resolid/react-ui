import { type ReactNode, useLayoutEffect } from "react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
import { useImageLoad } from "../../hooks/use-image-load";
import { tx } from "../../utils/clsx";
import { useAvatar, useAvatarStatus } from "./avatar-context";

export type AvatarImageProps = {
  /**
   * 头像图片的 URL
   */
  src?: string;
};

export function AvatarImage(
  props: PrimitiveProps<"img", AvatarImageProps, "alt" | "draggable">,
): ReactNode {
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
