import type { PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";
import enUS from "../../locales/en-US";
import type { Locale } from "../../primitives";
import { LocaleContext } from "./locale-context";

export type LocaleProviderProps = {
  locale?: Locale;
};

export function LocaleProvider({
  locale = enUS,
  children,
}: PropsWithChildren<LocaleProviderProps>): JSX.Element {
  return <LocaleContext value={locale}>{children}</LocaleContext>;
}
