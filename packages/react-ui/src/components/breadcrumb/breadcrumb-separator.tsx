import type { ReactNode } from "react";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { useBreadcrumb } from "./breadcrumb-context";

export function BreadcrumbSeparator(props: PrimitiveProps<"span", EmptyObject, "role">): ReactNode {
  const { separator } = useBreadcrumb();

  return (
    <span
      className="inline-flex items-center text-fg-subtle"
      aria-hidden="true"
      role="presentation"
      {...props}
    >
      {separator}
    </span>
  );
}
