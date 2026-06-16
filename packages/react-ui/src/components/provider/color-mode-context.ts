import type { Dispatch, SetStateAction } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives/context";

export type ColorMode = "auto" | "light" | "dark";

const [context, hook] = createSafeContext<ColorMode>({
  name: "ColorModeStateContext",
});

// react-doctor-disable-next-line deslop/unused-export
export const ColorModeStateContext: SafeContext<ColorMode> = context;
export const useColorModeState: UseSafeContext<ColorMode> = hook;

const [dispatchContext, dispatchHook] = createSafeContext<Dispatch<SetStateAction<ColorMode>>>({
  name: "ColorModeDispatchContext",
});

// react-doctor-disable-next-line deslop/unused-export
export const ColorModeDispatchContext: SafeContext<Dispatch<SetStateAction<ColorMode>>> =
  dispatchContext;
export const useColorModeDispatch: UseSafeContext<Dispatch<SetStateAction<ColorMode>>> =
  dispatchHook;
