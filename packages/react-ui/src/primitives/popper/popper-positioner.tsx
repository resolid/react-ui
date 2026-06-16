import type { ReactNode } from "react";
import type { EmptyObject, PrimitiveProps } from "../polymorphic";
import { usePopperPositioner } from "./popper-positioner-context";

export function PopperPositioner(
  props: PrimitiveProps<"div", EmptyObject, "role" | "ref">,
): ReactNode {
  const { className, style, children, ...rest } = props;

  const { positionerStyles, setPositioner } = usePopperPositioner();

  return (
    <div
      ref={setPositioner}
      role="presentation"
      style={{ ...positionerStyles, ...style }}
      className={className}
      {...rest}
    >
      {children}
    </div>
  );
}
