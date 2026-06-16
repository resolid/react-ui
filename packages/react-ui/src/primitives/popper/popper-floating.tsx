import type { ReactNode } from "react";
import type { PrimitiveProps } from "../polymorphic";
import { useMergeRefs } from "../../hooks/use-merge-refs";
import { tx } from "../../utils/clsx";
import { usePopperFloating } from "./popper-floating-context";

export function PopperFloating(props: PrimitiveProps<"div">): ReactNode {
  const { className, children, ref, ...rest } = props;

  const { setFloating, getFloatingProps } = usePopperFloating();

  const refs = useMergeRefs(ref, setFloating);

  return (
    <div
      ref={refs}
      className={tx("rounded-md outline-none", className)}
      {...getFloatingProps(rest)}
    >
      {children}
    </div>
  );
}
