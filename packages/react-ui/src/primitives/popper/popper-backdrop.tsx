import type { JSX } from "react/jsx-runtime";
import { hasBackgroundBaseClass } from "../../shared/utils";
import { tx } from "../../utils";
import type { PrimitiveProps } from "../index";
import { usePopperTransition } from "./popper-transtion-context";
import { getPopperAnimationProps } from "./utils";

export const PopperBackdrop = (props: PrimitiveProps<"div">): JSX.Element | null => {
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
};
