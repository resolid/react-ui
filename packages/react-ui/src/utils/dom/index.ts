import { type Booleanish, isObject } from "@resolid/utils";

export function dataAttr(condition: boolean | null | undefined) {
  return (condition ? "" : undefined) as Booleanish;
}

export function ariaAttr(condition: boolean | null | undefined): true | undefined {
  return condition ? true : undefined;
}

export function isInputEvent(value: unknown): value is { target: HTMLInputElement } {
  return !!value && isObject(value) && isObject(value.target);
}
