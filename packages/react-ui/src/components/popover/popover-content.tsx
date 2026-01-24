import { FloatingFocusManager } from "@floating-ui/react";
import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { usePopperAria } from "../../primitives/popper/popper-aria-context";
import { PopperFloating } from "../../primitives/popper/popper-floating";
import { PopperPositioner } from "../../primitives/popper/popper-positioner";
import { usePopperTransition } from "../../primitives/popper/popper-transtion-context";
import { getPopperAnimationProps } from "../../primitives/popper/utils";
import { hasBackgroundBaseClass } from "../../shared/utils";
import { tx } from "../../utils";
import { Portal } from "../portal/portal";
import { usePopoverRoot } from "./popover-root-context";

export const PopoverContent = (props: PrimitiveProps<"div">): JSX.Element | null => {
  const { children, style, className, ...rest } = props;

  const { context, initialFocus, finalFocus } = usePopoverRoot();
  const { status, mounted, duration } = usePopperTransition();

  const { labelId, descriptionId } = usePopperAria();

  if (!mounted) {
    return null;
  }

  const animationProps = getPopperAnimationProps({ status, duration });

  return (
    <Portal>
      <PopperPositioner
        style={{ ...style, ...animationProps.style }}
        className={animationProps.className}
      >
        <FloatingFocusManager
          disabled={!context.open}
          context={context}
          initialFocus={initialFocus}
          returnFocus={finalFocus}
        >
          <PopperFloating
            className={tx(
              "relative border shadow-md",
              hasBackgroundBaseClass(className)
                ? "border-transparent"
                : "border-bd-normal bg-bg-normal",
              className,
            )}
            aria-labelledby={labelId}
            aria-describedby={descriptionId}
            {...rest}
          >
            {children}
          </PopperFloating>
        </FloatingFocusManager>
      </PopperPositioner>
    </Portal>
  );
};
