import { get } from "@resolid/utils";
import { createSafeContext, type Locale, type SafeContext } from "../../primitives";

const [context, hook] = createSafeContext<Locale>({
  name: "LocaleContext",
});

export const LocaleContext: SafeContext<Locale> = context;

type Translator = (path: string, option?: Record<string, string | number>) => string;

export function useLocale(): {
  name: string;
  code: string;
  t: Translator;
} {
  const locale = hook();

  return {
    name: locale.name,
    code: locale.code,
    t: (path, option) => {
      const prop = get(locale, `messages.${path}`, path);

      return prop.replace(/\{(\w+)}/g, (_, key) => `${option?.[key] ?? `{${key}}`}`);
    },
  };
}
