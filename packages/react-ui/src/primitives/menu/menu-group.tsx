import type { ReactNode } from "react";
import type { PrimitiveProps } from "../polymorphic";

export function MenuGroup(props: PrimitiveProps<"div">): ReactNode {
  const { children, ...rest } = props;

  return (
    <div role="group" {...rest}>
      {children}
    </div>
  );
}
