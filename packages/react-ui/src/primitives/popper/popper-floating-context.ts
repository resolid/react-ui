import type { HTMLProps } from "react";
import { type AnyObject, createSafeContext, type SafeContext, type UseSafeContext } from "../index";

export type PopperFloatingContextValue = {
  setFloating?: (node: HTMLElement | null) => void;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement>) => AnyObject;
};

const [context, hook] = createSafeContext<PopperFloatingContextValue>({
  name: "PopperFloatingContext",
});

export const PopperFloatingContext: SafeContext<PopperFloatingContextValue> = context;
export const usePopperFloating: UseSafeContext<PopperFloatingContextValue> = hook;
