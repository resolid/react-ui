import type { ReactNode } from "react";
import type { PrimitiveProps } from "../polymorphic";

export function MenuGroup(props: PrimitiveProps<"div">): ReactNode {
  const { children, ...rest } = props;

  return (
    // react-doctor-disable-next-line react-doctor/prefer-tag-over-role
    <div role="group" {...rest}>
      {children}
    </div>
  );
}
