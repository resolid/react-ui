import type { ReactElement, ReactNode } from "react";
import { FloatingFocusManager } from "@floating-ui/react";
import { PopperPositioner } from "../../primitives/popper/popper-positioner";
import { usePopperTransition } from "../../primitives/popper/popper-transtion-context";
import { getPopperAnimationProps } from "../../primitives/popper/utils";
import { tx } from "../../utils/clsx";
import { Portal } from "../portal/portal";
import { usePickerRoot } from "./picker-context";

export function PickerContent({ children }: { children: ReactElement }): ReactNode {
  const { context } = usePickerRoot();
  const { status, mounted, duration } = usePopperTransition();

  if (!mounted) {
    return null;
  }

  const animationProps = getPopperAnimationProps({ status, duration });

  return (
    <Portal>
      <PopperPositioner
        style={animationProps.style}
        className={tx(
          "z-30 rounded-md  border border-bd-normal bg-bg-normal p-2 shadow-sm",
          animationProps.className,
        )}
      >
        <FloatingFocusManager
          disabled={!context.open}
          context={context}
          modal={false}
          returnFocus={false}
          order={["reference", "content"]}
        >
          {children}
        </FloatingFocusManager>
      </PopperPositioner>
    </Portal>
  );
}
