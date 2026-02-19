import { type RefObject, useRef } from "react";
import { useIsomorphicEffect } from "../use-isomorphic-effect";

export const useLatestRef = <T>(value: T): RefObject<T> => {
  const ref = useRef(value);

  useIsomorphicEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
};
