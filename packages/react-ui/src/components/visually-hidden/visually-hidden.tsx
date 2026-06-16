import type { ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
import { tx } from "../../utils/clsx";

export function VisuallyHidden(props: PrimitiveProps<"span">): ReactNode {
  const { className, ...rest } = props;

  return <span className={tx("sr-only", className)} {...rest} />;
}
