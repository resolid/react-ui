import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { useMergeRefs } from "../../hooks";
import { PopperFloating } from "../../primitives/popper/popper-floating";
import { usePopperPositioner } from "../../primitives/popper/popper-positioner-context";
import { usePopperTransition } from "../../primitives/popper/popper-transtion-context";
import { getPopperAnimationProps } from "../../primitives/popper/utils";
import { tx } from "../../utils";
import { PortalLite } from "../portal/portal-lite";
import { useTooltipRoot } from "./tooltip-root-context";

export function TooltipContent(props: PrimitiveProps<"div">): JSX.Element | null {
  const { children, className, style, ref, ...rest } = props;

  const { interactive, contentClassName } = useTooltipRoot();
  const { status, mounted, duration } = usePopperTransition();
  const { positionerStyles, setPositioner } = usePopperPositioner();

  const refs = useMergeRefs(ref, setPositioner);

  if (!mounted) {
    return null;
  }

  const animationProps = getPopperAnimationProps({ status, duration });

  return (
    <PortalLite>
      <PopperFloating
        ref={refs}
        style={{ ...style, ...positionerStyles, ...animationProps.style }}
        className={tx(
          "z-90 inline-block max-w-96 border px-2 py-1 text-sm text-fg-emphasized shadow-sm",
          animationProps.className,
          !interactive && "select-none",
          contentClassName,
          className,
        )}
        {...rest}
      >
        {children}
      </PopperFloating>
    </PortalLite>
  );
}
