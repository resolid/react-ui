import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../polymorphic";
import { tx } from "../../utils";

export function MenuLabel(props: PrimitiveProps<"div">): JSX.Element {
  const { children, className, ...rest } = props;

  return (
    <div
      className={tx("flex w-full items-center px-2 py-1.5 text-fg-muted outline-none", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
