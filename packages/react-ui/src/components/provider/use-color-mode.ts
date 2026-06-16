import type { Dispatch, SetStateAction } from "react";
import {
  type ColorMode,
  useColorModeDispatch as useColorModeContextDispatch,
  useColorModeState as useColorModeContextState,
} from "./color-mode-context";

export type { ColorMode } from "./color-mode-context";

export function useColorModeState(): ColorMode {
  return useColorModeContextState(false);
}

export function useColorModeDispatch(): Dispatch<SetStateAction<ColorMode>> {
  return useColorModeContextDispatch(false);
}
