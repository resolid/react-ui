import type { PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";
import type { Locale } from "../../primitives";
import type { Direction } from "../../shared/types";
import { ToastProvider, type ToastProviderProps } from "../toast/toast-provider";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode-provider";
import { DirectionContext } from "./direction-context";
import { LocaleProvider } from "./locale-provider";

export type ConfigProviderProps = {
  dir?: Direction;
  locale?: Locale;
  colorMode?: ColorModeProviderProps;
  toastConfig?: ToastProviderProps;
};

export const ConfigProvider = ({
  dir = "ltr",
  locale,
  colorMode,
  toastConfig,
  children,
}: PropsWithChildren<ConfigProviderProps>): JSX.Element => {
  return (
    <LocaleProvider locale={locale}>
      <DirectionContext value={dir}>
        <ColorModeProvider {...colorMode}>
          <ToastProvider {...toastConfig}>{children}</ToastProvider>
        </ColorModeProvider>
      </DirectionContext>
    </LocaleProvider>
  );
};
