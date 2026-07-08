import { noop } from "@resolid/utils";
import { type ImgHTMLAttributes, useEffectEvent, useState } from "react";
import { useIsomorphicEffect } from "../use-isomorphic-effect";

type NativeImageProps = ImgHTMLAttributes<HTMLImageElement>;

export type UseImageLoadOptions = {
  src?: NativeImageProps["src"];
  srcSet?: NativeImageProps["srcSet"];
  sizes?: NativeImageProps["sizes"];
  crossOrigin?: NativeImageProps["crossOrigin"];
  referrerPolicy?: NativeImageProps["referrerPolicy"];
  delayLoad?: boolean;
};

export type ImageLoadStatus = "idle" | "loading" | "loaded" | "error";

export function useImageLoad(options: UseImageLoadOptions): ImageLoadStatus {
  const { src, srcSet, sizes, crossOrigin, referrerPolicy } = options;

  const [loadStatus, setLoadStatus] = useState<ImageLoadStatus>("idle");

  const setLoadStatusEffect = useEffectEvent((status: ImageLoadStatus) => {
    setLoadStatus(status);
  });

  useIsomorphicEffect(() => {
    if (!src && !srcSet) {
      // oxlint-disable-next-line react-hooks/rules-of-hooks,react-doctor/rules-of-hooks
      setLoadStatusEffect("error");
      return noop;
    }

    const image = new window.Image();

    // oxlint-disable-next-line react-hooks/rules-of-hooks,react-doctor/rules-of-hooks
    setLoadStatusEffect("loading");

    // oxlint-disable-next-line react-hooks/rules-of-hooks,react-doctor/rules-of-hooks
    image.onload = () => setLoadStatusEffect("loaded");
    // oxlint-disable-next-line react-hooks/rules-of-hooks,react-doctor/rules-of-hooks
    image.onerror = () => setLoadStatusEffect("error");

    if (crossOrigin) {
      image.crossOrigin = crossOrigin;
    }
    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }
    if (sizes) {
      image.sizes = sizes;
    }
    if (srcSet) {
      image.srcset = srcSet;
    }
    if (src) {
      image.src = src;
    }

    if (image.complete) {
      setLoadStatus(image.naturalWidth > 0 ? "loaded" : "error");
    }

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [src, srcSet, sizes, crossOrigin, referrerPolicy]);

  return loadStatus;
}
