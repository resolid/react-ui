import type { HTMLProps } from "react";
import type { AnyObject } from "../polymorphic";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

export type PopperFloatingContextValue = {
  setFloating?: (node: HTMLElement | null) => void;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement>) => AnyObject;
};

const [context, hook] = createSafeContext<PopperFloatingContextValue>({
  name: "PopperFloatingContext",
});

export const PopperFloatingContext: SafeContext<PopperFloatingContextValue> = context;
export const usePopperFloating: UseSafeContext<PopperFloatingContextValue> = hook;
