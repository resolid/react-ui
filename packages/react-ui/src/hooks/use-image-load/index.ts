import { isBrowser } from "@resolid/utils";
import { type ImgHTMLAttributes, useEffectEvent, useState } from "react";
import { useIsomorphicEffect } from "../use-isomorphic-effect";

type NativeImageProps = ImgHTMLAttributes<HTMLImageElement>;

export type UseImageLoadOptions = {
  src?: NativeImageProps["src"];
  crossOrigin?: NativeImageProps["crossOrigin"];
  referrerPolicy?: NativeImageProps["referrerPolicy"];
  delayLoad?: boolean;
};

export type ImageLoadStatus = "idle" | "loading" | "loaded" | "error";

export const useImageLoad = (options: UseImageLoadOptions): ImageLoadStatus => {
  const { src, crossOrigin, referrerPolicy } = options;

  const [loadStatus, setLoadStatus] = useState<ImageLoadStatus>("idle");

  const handleStatus = useEffectEvent((status: ImageLoadStatus) => {
    setLoadStatus(status);
  });

  useIsomorphicEffect(() => {
    if (!src || !isBrowser) {
      handleStatus("error");
      return;
    }

    const image = new window.Image();

    handleStatus("loading");

    image.onload = () => handleStatus("loaded");
    image.onerror = () => handleStatus("error");

    if (crossOrigin) {
      image.crossOrigin = crossOrigin;
    }
    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }

    image.src = src;

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [src, crossOrigin, referrerPolicy]);

  return loadStatus;
};
