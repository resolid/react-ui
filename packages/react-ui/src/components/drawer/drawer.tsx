import type { ComponentProps, ReactNode } from "react";
import { PopperTrigger } from "../../primitives/popper/popper-trigger";

export { DrawerRoot as Drawer, type DrawerRootProps as DrawerProps } from "./drawer-root";

export function DrawerTrigger(
  props: Omit<ComponentProps<typeof PopperTrigger>, "active">,
): ReactNode {
  return <PopperTrigger active={false} {...props} />;
}

export { DrawerContent } from "./drawer-content";

export { PopperBackdrop as DrawerBackdrop } from "../../primitives/popper/popper-backdrop";
export { PopperClose as DrawerClose } from "../../primitives/popper/popper-close";
export { PopperDescription as DrawerDescription } from "../../primitives/popper/popper-description";
export { PopperPortal as DrawerPortal } from "../../primitives/popper/popper-portal";
export { PopperTitle as DrawerTitle } from "../../primitives/popper/popper-title";
