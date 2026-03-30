import { cx, tv as tvLite, type VariantProps } from "tailwind-variants/lite";

export type { TVReturnType as TvReturnType } from "tailwind-variants/lite";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VP<T extends (...args: any) => any> = VariantProps<T>;

export { cx as tx };

export { tvLite as tv };
