import type { PropsWithChildren, ReactNode } from "react";
import type { Locale } from "../../primitives/locale";
import enUS from "../../locales/en-US";
import { LocaleContext } from "./locale-context";

export type LocaleProviderProps = {
  locale?: Locale;
};

export function LocaleProvider({
  locale = enUS,
  children,
}: PropsWithChildren<LocaleProviderProps>): ReactNode {
  return <LocaleContext value={locale}>{children}</LocaleContext>;
}
