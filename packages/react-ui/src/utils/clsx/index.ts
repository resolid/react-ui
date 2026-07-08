import type { VariantProps } from "tailwind-variants/lite";

export { type TVReturnType as TvReturnType, tv, cx as tx } from "tailwind-variants/lite";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VP<T extends (...args: any) => any> = VariantProps<T>;
