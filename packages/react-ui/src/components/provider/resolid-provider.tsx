import type { PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";
import { ToastProvider, type ToastProviderProps } from "../toast/toast-provider";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode-provider";

export type ResolidProviderProps = {
  colorMode?: ColorModeProviderProps;
  toastConfig?: ToastProviderProps;
};

export const ResolidProvider = ({
  children,
  colorMode,
  toastConfig,
}: PropsWithChildren<ResolidProviderProps>): JSX.Element => {
  return (
    <ColorModeProvider {...colorMode}>
      <ToastProvider {...toastConfig}>{children}</ToastProvider>
    </ColorModeProvider>
  );
};
