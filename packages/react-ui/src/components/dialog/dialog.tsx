import type { ComponentProps } from "react";
import type { JSX } from "react/jsx-runtime";
import { PopperTrigger } from "../../primitives/popper/popper-trigger";

export { DialogRoot as Dialog, type DialogRootProps as DialogProps } from "./dialog-root";

export function DialogTrigger(
  props: Omit<ComponentProps<typeof PopperTrigger>, "active">,
): JSX.Element {
  return <PopperTrigger active={false} {...props} />;
}

export { DialogContent } from "./dialog-content";

export { PopperPortal as DialogPortal } from "../../primitives/popper/popper-portal";
export { PopperBackdrop as DialogBackdrop } from "../../primitives/popper/popper-backdrop";
export { PopperTitle as DialogTitle } from "../../primitives/popper/popper-title";
export { PopperClose as DialogClose } from "../../primitives/popper/popper-close";
export { PopperDescription as DialogDescription } from "../../primitives/popper/popper-description";
