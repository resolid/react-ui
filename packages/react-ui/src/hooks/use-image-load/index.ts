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

export function useImageLoad(options: UseImageLoadOptions): ImageLoadStatus {
  const { src, crossOrigin, referrerPolicy } = options;

  const [loadStatus, setLoadStatus] = useState<ImageLoadStatus>("idle");

  const setLoadStatusEffect = useEffectEvent((status: ImageLoadStatus) => {
    setLoadStatus(status);
  });

  useIsomorphicEffect(() => {
    if (!src || !isBrowser) {
      // react-doctor-disable-next-line react-doctor/rules-of-hooks
      setLoadStatusEffect("error");
      return;
    }

    const image = new window.Image();

    // react-doctor-disable-next-line react-doctor/rules-of-hooks
    setLoadStatusEffect("loading");

    // react-doctor-disable-next-line react-doctor/rules-of-hooks
    image.onload = () => setLoadStatusEffect("loaded");
    // react-doctor-disable-next-line react-doctor/rules-of-hooks
    image.onerror = () => setLoadStatusEffect("error");

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
}
