import { runIf } from "@resolid/utils";
import { type SetStateAction, useState } from "react";

export type UseControllableStateOptions<T> = {
  value?: T;
  defaultValue?: T | (() => T);
  onChange?: (value: T) => void;
  shouldUpdate?: (prev: T, next: T) => boolean;
};

export const useControllableState = <T>(
  options: UseControllableStateOptions<T>,
): readonly [T, (value: SetStateAction<T>) => void] => {
  const { value, defaultValue, onChange, shouldUpdate = (prev, next) => prev !== next } = options;

  const [uncontrolledState, setUncontrolledState] = useState(defaultValue as T);

  const controlled = value !== undefined;
  const currentValue = controlled ? value : uncontrolledState;

  const setValue = (value: SetStateAction<T>) => {
    const nextValue = runIf(value, currentValue);

    if (!shouldUpdate(currentValue, nextValue)) {
      return;
    }

    if (!controlled) {
      setUncontrolledState(nextValue);
    }

    onChange?.(nextValue);
  };

  return [currentValue, setValue] as const;
};
