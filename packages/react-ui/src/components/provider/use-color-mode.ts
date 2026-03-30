import type { Dispatch, SetStateAction } from "react";
import {
  useColorModeDispatch as useColorModeContextDispatch,
  useColorModeState as useColorModeContextState,
  type ColorMode,
} from "./color-mode-context";

export type { ColorMode } from "./color-mode-context";

export function useColorModeState(): ColorMode {
  return useColorModeContextState(false);
}

export function useColorModeDispatch(): Dispatch<SetStateAction<ColorMode>> {
  return useColorModeContextDispatch(false);
}
