import type { ReactNode } from "react";
import { FloatingFocusManager, FloatingList } from "@floating-ui/react";
import type { PrimitiveProps } from "../polymorphic";
import { Portal } from "../../components/portal/portal";
import { useMergeRefs } from "../../hooks/use-merge-refs";
import { tx } from "../../utils/clsx";
import { PopperFloating } from "../popper/popper-floating";
import { usePopperPositioner } from "../popper/popper-positioner-context";
import { usePopperTransition } from "../popper/popper-transtion-context";
import { getPopperAnimationProps } from "../popper/popper.utils";
import { useMenu } from "./menu-context";
import { useMenuHover } from "./menu-hover-context";
import { MenuItemContext, type MenuItemContextValue } from "./menu-item-context";

export function MenuContent(props: PrimitiveProps<"div">): ReactNode {
  const { children, className, style, ref, ...rest } = props;

  const {
    context,
    menuEvents,
    closeOnSelect,
    activeIndex,
    getItemProps,
    nested,
    elementsRef,
    labelsRef,
    typingRef,
  } = useMenu();

  const { setHoverEnabled } = useMenuHover();
  const { status, mounted, duration } = usePopperTransition();
  const { setPositioner, positionerStyles } = usePopperPositioner();

  const refs = useMergeRefs(ref, setPositioner);

  if (!mounted) {
    return null;
  }

  const menuItemContext: MenuItemContextValue = {
    menuEvents,
    closeOnSelect,
    activeIndex,
    getItemProps,
    typingRef,
  };

  const handleMouseEnter = () => {
    if (nested) {
      setHoverEnabled(false);
    }
  };

  const animationProps = getPopperAnimationProps({ status, duration });

  return (
    <Portal>
      <FloatingFocusManager context={context} modal={false}>
        <PopperFloating
          ref={refs}
          style={{ ...style, ...positionerStyles, ...animationProps.style }}
          onMouseEnter={handleMouseEnter}
          className={tx(
            "z-30 min-w-25 border border-bd-normal bg-bg-normal p-1 shadow-sm",
            animationProps.className,
            className,
          )}
          {...rest}
        >
          <MenuItemContext value={menuItemContext}>
            <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
              {children}
            </FloatingList>
          </MenuItemContext>
        </PopperFloating>
      </FloatingFocusManager>
    </Portal>
  );
}
