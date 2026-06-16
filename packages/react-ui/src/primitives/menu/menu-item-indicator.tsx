import type { ReactNode } from "react";
import type { PrimitiveProps } from "../polymorphic";
import { tx } from "../../utils/clsx";
import { useMenuItemIndicator } from "./menu-item-indicator-context";

export function MenuItemIndicator(props: PrimitiveProps<"span">): ReactNode {
  const { className, children, ...rest } = props;

  const context = useMenuItemIndicator();

  return context.checked ? (
    <span
      className={tx("absolute left-0 inline-flex w-6 items-center justify-center", className)}
      {...rest}
    >
      {children}
    </span>
  ) : null;
}
