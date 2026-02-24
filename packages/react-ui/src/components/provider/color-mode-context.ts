import type { Dispatch, SetStateAction } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type ColorMode = "auto" | "light" | "dark";

const [context, hook] = createSafeContext<ColorMode>({
  name: "ColorModeStateContext",
});

export const ColorModeStateContext: SafeContext<ColorMode> = context;
export const useColorModeState: UseSafeContext<ColorMode> = hook;

const [dispatchContext, dispatchHook] = createSafeContext<Dispatch<SetStateAction<ColorMode>>>({
  name: "ColorModeDispatchContext",
});

export const ColorModeDispatchContext: SafeContext<Dispatch<SetStateAction<ColorMode>>> =
  dispatchContext;
export const useColorModeDispatch: UseSafeContext<Dispatch<SetStateAction<ColorMode>>> =
  dispatchHook;
