import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../polymorphic";
import { tx } from "../../utils";
import { useMenuItemIndicator } from "./menu-item-indicator-context";

export function MenuItemIndicator(props: PrimitiveProps<"span">): JSX.Element | null {
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
