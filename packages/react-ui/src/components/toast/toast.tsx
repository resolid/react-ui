import type { JSX } from "react/jsx-runtime";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { usePopperAria } from "../../primitives/popper/popper-aria-context";
import { usePopperDispatch } from "../../primitives/popper/popper-dispatch-context";
import {
  AlertCloseButton,
  type AlertCloseButtonProps,
  AlertDescription,
  AlertTitle,
} from "../alert/alert";

export { ToastRoot as Toast, type ToastRootProps as ToastProps } from "./toast-root";

export { AlertContent as ToastContent, AlertIndicator as ToastIndicator } from "../alert/alert";

export function ToastTitle(props: PrimitiveProps<"div", EmptyObject, "id">): JSX.Element {
  const { labelId } = usePopperAria();

  return <AlertTitle id={labelId} {...props} />;
}

export function ToastDescription(props: PrimitiveProps<"div", EmptyObject, "id">): JSX.Element {
  const { descriptionId } = usePopperAria();

  return <AlertDescription id={descriptionId} {...props} />;
}

export function ToastCloseButton(
  props: PrimitiveProps<"button", AlertCloseButtonProps, "type" | "color">,
): JSX.Element {
  const { handleClose } = usePopperDispatch();

  return <AlertCloseButton onClick={handleClose} {...props} />;
}
