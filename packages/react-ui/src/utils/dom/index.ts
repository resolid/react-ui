import { type Booleanish, isObject } from "@resolid/utils";

export const dataAttr = (condition: boolean | null | undefined) =>
  (condition ? "" : undefined) as Booleanish;

export const ariaAttr = (condition: boolean | null | undefined): true | undefined =>
  condition ? true : undefined;

export const isInputEvent = (value: unknown): value is { target: HTMLInputElement } =>
  !!value && isObject(value) && isObject(value.target);
