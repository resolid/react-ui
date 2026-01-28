import { clamp } from "@resolid/utils";
import type { ValueType } from "./slider-context";

export const getNextValue = (
  value: number,
  min: number,
  max: number,
  step: number,
  precision: number,
  vertical: boolean,
): number => {
  return Number(
    (
      (value !== 0
        ? Math.round(vertical ? max - value : value / step) * step
        : vertical
          ? max
          : 0) + min
    ).toFixed(precision),
  );
};

export const getStepValue = (
  value: ValueType,
  step: number,
  min: number,
  max: number,
  thumbIndex?: number,
): ValueType => {
  if (Array.isArray(value)) {
    return getChangeValue(
      value,
      thumbIndex == 1 ? value[1] + step : value[0] + step,
      min,
      max,
      thumbIndex,
    );
  }

  return getChangeValue(value, value + step, min, max, thumbIndex);
};

export const getChangeValue = (
  value: ValueType,
  next: number,
  min: number,
  max: number,
  thumbIndex?: number,
): ValueType => {
  return Array.isArray(value)
    ? thumbIndex == 1
      ? [value[0], clamp(next, [value[0], max])]
      : [clamp(next, [min, value[1]]), value[1]]
    : clamp(next, [min, max]);
};

export const getPosition = (value: number, min: number, max: number): number => {
  return clamp((100 / (max - min)) * (value - min), [0, 100]);
};

export const linearScale = (
  input: readonly [number, number],
  output: readonly [number, number],
) => {
  return (value: number): number => {
    if (input[0] === input[1] || output[0] === output[1]) {
      return output[0];
    }

    const ratio = (output[1] - output[0]) / (input[1] - input[0]);

    return output[0] + ratio * (value - input[0]);
  };
};

export const getOffset = (half: number, offset: number, direction: number): number => {
  return (half - offset * direction) * direction;
};
