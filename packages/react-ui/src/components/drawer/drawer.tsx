import type { ComponentProps } from "react";
import type { JSX } from "react/jsx-runtime";
import { PopperBackdrop } from "../../primitives/popper/popper-backdrop";
import { PopperClose } from "../../primitives/popper/popper-close";
import { PopperDescription } from "../../primitives/popper/popper-description";
import { PopperPortal } from "../../primitives/popper/popper-portal";
import { PopperTitle } from "../../primitives/popper/popper-title";
import { PopperTrigger } from "../../primitives/popper/popper-trigger";
import { DrawerRoot, type DrawerRootProps } from "./drawer-root";

export type DrawerProps = DrawerRootProps;

export const Drawer: typeof DrawerRoot = DrawerRoot;

export const DrawerTrigger = (
  props: Omit<ComponentProps<typeof PopperTrigger>, "active">,
): JSX.Element => <PopperTrigger active={false} {...props} />;

export const DrawerPortal: typeof PopperPortal = PopperPortal;

export const DrawerBackdrop: typeof PopperBackdrop = PopperBackdrop;

export { DrawerContent } from "./drawer-content";

export const DrawerTitle: typeof PopperTitle = PopperTitle;
export const DrawerDescription: typeof PopperDescription = PopperDescription;
export const DrawerClose: typeof PopperClose = PopperClose;
