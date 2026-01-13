import type { PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";
import type { Direction } from "../../shared/types";
import { ToastProvider, type ToastProviderProps } from "../toast/toast-provider";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode-provider";
import { DirectionContext } from "./direction-context";
import { LocaleContext } from "./locale-context";

export type ConfigProviderProps = {
  dir?: Direction;
  locale?: string;
  colorMode?: ColorModeProviderProps;
  toastConfig?: ToastProviderProps;
};

export const ConfigProvider = ({
  dir = "ltr",
  locale = "en-US",
  colorMode,
  toastConfig,
  children,
}: PropsWithChildren<ConfigProviderProps>): JSX.Element => {
  return (
    <LocaleContext value={locale}>
      <DirectionContext value={dir}>
        <ColorModeProvider {...colorMode}>
          <ToastProvider {...toastConfig}>{children}</ToastProvider>
        </ColorModeProvider>
      </DirectionContext>
    </LocaleContext>
  );
};
