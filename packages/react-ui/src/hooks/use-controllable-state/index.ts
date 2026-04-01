import { runIf } from "@resolid/utils";
import { type Dispatch, type SetStateAction, useState } from "react";

export type UseControllableStateOptions<T> = {
  value?: T;
  defaultValue?: T | (() => T);
  onChange?: (value: T) => void;
  shouldUpdate?: (prev: T, next: T) => boolean;
};

export function useControllableState<T>(
  options: UseControllableStateOptions<T>,
): readonly [T, Dispatch<SetStateAction<T>>] {
  const { value, defaultValue, onChange, shouldUpdate = defaultShouldUpdate } = options;

  const [uncontrolledState, setUncontrolledState] = useState(() => defaultValue as T);

  const controlled = value !== undefined;
  const currentValue = controlled ? value : uncontrolledState;

  const setValue = (next: SetStateAction<T>) => {
    const nextValue = runIf(next, currentValue);

    if (!shouldUpdate(currentValue, nextValue)) {
      return;
    }

    if (!controlled) {
      setUncontrolledState(nextValue);
    }

    onChange?.(nextValue);
  };

  return [currentValue, setValue] as const;
}

function defaultShouldUpdate<T>(prev: T, next: T) {
  return prev !== next;
}
