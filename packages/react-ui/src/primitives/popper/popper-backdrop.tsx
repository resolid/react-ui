import type { ReactNode } from "react";
import type { PrimitiveProps } from "../polymorphic";
import { hasBackgroundBaseClass } from "../../shared/utils";
import { tx } from "../../utils/clsx";
import { usePopperTransition } from "./popper-transtion-context";
import { getPopperAnimationProps } from "./utils";

export function PopperBackdrop(props: PrimitiveProps<"div">): ReactNode {
  const { className, children, style, ...rest } = props;

  const { status, mounted, duration } = usePopperTransition();

  if (!mounted) {
    return null;
  }

  const animationProps = getPopperAnimationProps({ status, duration, openClassName: "opacity-50" });

  return (
    <div
      style={{ ...animationProps.style, ...style }}
      className={tx(
        "fixed inset-0 z-50 overflow-auto",
        animationProps.className,
        !hasBackgroundBaseClass(className) && "bg-black",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
