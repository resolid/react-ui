import type { ReactNode } from "react";
import type { EmptyObject, PrimitiveProps } from "../polymorphic";
import { tx } from "../../utils/clsx";
import { usePopperAria } from "./popper-aria-context";

export function PopperTitle(props: PrimitiveProps<"h2", EmptyObject, "id">): ReactNode {
  const { className, children, ...rest } = props;

  const { labelId } = usePopperAria();

  return (
    <h2 id={labelId} className={tx("font-medium", className)} {...rest}>
      {children}
    </h2>
  );
}
