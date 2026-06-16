import type { ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
import { tx } from "../../utils/clsx";

export function BreadcrumbItem(props: PrimitiveProps<"li">): ReactNode {
  const { className, children, ...rest } = props;

  return (
    <li className={tx("inline-flex items-center", className)} {...rest}>
      {children}
    </li>
  );
}
