import type { ReactNode } from "react";
import type { PrimitiveProps } from "../polymorphic";
import { tx } from "../../utils/clsx";

export function MenuLabel(props: PrimitiveProps<"div">): ReactNode {
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
