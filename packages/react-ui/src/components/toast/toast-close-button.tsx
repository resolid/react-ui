import type { ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives";
import { usePopperDispatch } from "../../primitives/popper/popper-dispatch-context";
import { AlertCloseButton, type AlertCloseButtonProps } from "../alert/alert";

export function ToastCloseButton(
  props: PrimitiveProps<"button", AlertCloseButtonProps, "type" | "color">,
): ReactNode {
  const { handleClose } = usePopperDispatch();

  return <AlertCloseButton onClick={handleClose} {...props} />;
}
