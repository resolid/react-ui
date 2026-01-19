import { get } from "@resolid/utils";
import { createSafeContext, type Locale, type SafeContext } from "../../primitives";

const desc = createSafeContext<Locale>({
  name: "LocaleContext",
});

export const LocaleContext: SafeContext<Locale> = desc[0];

type Translator = (path: string, option?: Record<string, string | number>) => string;

export const useLocale = (): {
  name: string;
  code: string;
  t: Translator;
} => {
  const locale = desc[1]();

  return {
    name: locale.name,
    code: locale.code,
    t: (path, option) => {
      const prop = get(locale, `messages.${path}`, path);

      return prop.replace(/\{(\w+)}/g, (_, key) => `${option?.[key] ?? `{${key}}`}`);
    },
  };
};
