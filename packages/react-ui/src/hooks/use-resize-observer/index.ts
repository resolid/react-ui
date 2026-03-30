import { isBrowser } from "@resolid/utils";
import { type RefObject, useEffectEvent } from "react";
import { useIsomorphicEffect } from "../use-isomorphic-effect";

export function useResizeObserver<T extends Element>(
  target: RefObject<T | null> | T | null,
  callback: (entry: ResizeObserverEntry) => void,
  options?: ResizeObserverOptions,
): void {
  const callbackEvent = useEffectEvent(callback);

  useIsomorphicEffect(() => {
    if (!isBrowser) {
      return;
    }

    const element = target && "current" in target ? target.current : target;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        callbackEvent(entries[0]);
      }
    });

    observer.observe(element, options);

    return () => {
      observer.disconnect();
    };
  }, [target, options]);
}
