import type { JSX } from "react/jsx-runtime";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { useBreadcrumb } from "./breadcrumb-context";

export function BreadcrumbSeparator(
  props: PrimitiveProps<"span", EmptyObject, "role">,
): JSX.Element {
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
