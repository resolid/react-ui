import type { JSX } from "react";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";

export const Textarea = ({ className, ...rest }: PrimitiveProps<"textarea">): JSX.Element => (
  <textarea
    className={tx(
      "rounded-md border p-2",
      "rounded-md border border-bd-normal bg-bg-normal p-2 outline-1 outline-transparent transition-colors",
      "focus-within:border-bg-primary-emphasis focus-within:outline-bg-primary-emphasis/70 not-focus-within:hover:border-bd-hovered",
      className,
    )}
    {...rest}
  />
);
