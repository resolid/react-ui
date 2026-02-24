import type { ComponentProps } from "react";
import type { JSX } from "react/jsx-runtime";
import { PopperBackdrop } from "../../primitives/popper/popper-backdrop";
import { PopperClose } from "../../primitives/popper/popper-close";
import { PopperDescription } from "../../primitives/popper/popper-description";
import { PopperPortal } from "../../primitives/popper/popper-portal";
import { PopperTitle } from "../../primitives/popper/popper-title";
import { PopperTrigger } from "../../primitives/popper/popper-trigger";
import { DialogRoot, type DialogRootProps } from "./dialog-root";

export type DialogProps = DialogRootProps;

export const Dialog: typeof DialogRoot = DialogRoot;

export const DialogTrigger = (
  props: Omit<ComponentProps<typeof PopperTrigger>, "active">,
): JSX.Element => <PopperTrigger active={false} {...props} />;

export const DialogPortal: typeof PopperPortal = PopperPortal;

export const DialogBackdrop: typeof PopperBackdrop = PopperBackdrop;

export { DialogContent } from "./dialog-content";

export const DialogTitle: typeof PopperTitle = PopperTitle;
export const DialogDescription: typeof PopperDescription = PopperDescription;

export const DialogClose: typeof PopperClose = PopperClose;
