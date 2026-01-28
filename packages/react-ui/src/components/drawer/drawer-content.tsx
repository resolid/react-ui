import { FloatingFocusManager } from "@floating-ui/react";
import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { usePopperAria } from "../../primitives/popper/popper-aria-context";
import { PopperFloating } from "../../primitives/popper/popper-floating";
import { usePopperTransition } from "../../primitives/popper/popper-transtion-context";
import { getPopperAnimationProps } from "../../primitives/popper/utils";
import { hasBackgroundBaseClass } from "../../shared/utils";
import { tx } from "../../utils";
import { useDialog } from "../dialog/dialog-context";
import { useDrawer } from "./drawer-context";

const placementStyles = {
  start: {
    base: "start-0 top-0 bottom-0",
    open: "translate-x-none",
    close: "-translate-x-full",
  },
  end: {
    base: "end-0 top-0 bottom-0",
    open: "translate-x-none",
    close: "translate-x-full",
  },
  top: {
    base: "top-0 start-0 end-0",
    open: "translate-y-none",
    close: "-translate-y-full",
  },
  bottom: {
    base: "bottom-0 start-0 end-0",
    open: "translate-y-none",
    close: "translate-y-full",
  },
};

export const DrawerContent = (props: PrimitiveProps<"div">): JSX.Element | null => {
  const { children, className, style, ...rest } = props;

  const { placement } = useDrawer();
  const { labelId, descriptionId } = usePopperAria();
  const { context, initialFocus, finalFocus } = useDialog();
  const { status, mounted, duration } = usePopperTransition();

  if (!mounted) {
    return null;
  }

  const drawerStyle = placementStyles[placement];
  const animationProps = getPopperAnimationProps({
    status,
    duration,
    transitionClassName: "transition-[opacity,translate]",
    openClassName: ["opacity-100", drawerStyle.open],
    defaultClassName: ["opacity-0", drawerStyle.close],
  });

  return (
    <div className={"fixed top-0 left-0 z-55 flex h-screen w-screen justify-center"}>
      <FloatingFocusManager
        disabled={!context.open}
        context={context}
        initialFocus={initialFocus}
        returnFocus={finalFocus}
      >
        <PopperFloating
          style={{ ...animationProps.style, ...style }}
          className={tx(
            "fixed flex flex-col shadow-md transition-[opacity,translate]",
            drawerStyle.base,
            animationProps.className,
            !hasBackgroundBaseClass(className) && "bg-bg-normal",
            className,
          )}
          aria-labelledby={labelId}
          aria-describedby={descriptionId}
          {...rest}
        >
          {children}
        </PopperFloating>
      </FloatingFocusManager>
    </div>
  );
};
