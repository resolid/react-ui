import { useEffect, useEffectEvent, useRef } from "react";
import { useLatestRef } from "../use-latest-ref";

export function useTimeout(
  callback: () => void,
  delay: number | null,
): {
  clear: () => void;
  reset: () => void;
} {
  const ref = useLatestRef(callback);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const clear = (): void => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const reset = (): void => {
    clear();

    if (delay !== null) {
      timer.current = setTimeout(() => ref.current(), delay);
    }
  };

  const resetEvent = useEffectEvent(reset);

  useEffect(() => {
    resetEvent();

    return clear;
  }, []);

  return { clear, reset };
}
