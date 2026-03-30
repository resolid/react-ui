import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";

export function BreadcrumbItem(props: PrimitiveProps<"li">): JSX.Element {
  const { className, children, ...rest } = props;

  return (
    <li className={tx("inline-flex items-center", className)} {...rest}>
      {children}
    </li>
  );
}
