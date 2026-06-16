import type { ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
import { tx } from "../../utils/clsx";

export function InputAffix(props: PrimitiveProps<"div">): ReactNode {
  const { children, className, ...rest } = props;

  return (
    <div
      className={tx(
        "pointer-events-none absolute inset-y-0 flex items-center justify-center text-fg-subtlest",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
