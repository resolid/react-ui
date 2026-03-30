import { type Context, createContext, use } from "react";

type SafeContextOptions = {
  name: string;
  errorMessage?: string;
};

export type SafeContext<T> = Context<T | undefined>;
export type UseSafeContext<T> = <O extends boolean = false>(
  optional?: O,
) => O extends true ? T | undefined : T;

export function createSafeContext<T>(
  options: SafeContextOptions,
): [SafeContext<T>, UseSafeContext<T>] {
  const { name, errorMessage } = options;

  const SafeContext = createContext<T | undefined>(undefined);

  const useSafeContext = <O extends boolean = false>(optional: O = false as O) => {
    const context = use(SafeContext);

    if (!optional && context === undefined) {
      throw new Error(
        errorMessage ??
          `use${name.replace("Context", "")} returned \`undefined\`. Seems you forgot to wrap component within ${name}`,
      );
    }

    return context as O extends true ? T | undefined : T;
  };

  return [SafeContext, useSafeContext] as const;
}
