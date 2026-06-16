import type { ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives";
import { hasRoundedBaseClass } from "../../shared/utils";
import { tx } from "../../utils/clsx";

export function FilePickerItem(props: PrimitiveProps<"li">): ReactNode {
  const { className, children, ...rest } = props;

  return (
    <li
      className={tx("relative", !hasRoundedBaseClass(className) && "rounded-md", className)}
      {...rest}
    >
      {children}
    </li>
  );
}
