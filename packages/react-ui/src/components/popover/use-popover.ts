import {
  type ReferenceType,
  useClick,
  useDismiss,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { useId } from "react";
import type { PopperFloatingContextValue } from "../../primitives/popper/popper-floating-context";
import type { PopperTriggerContextValue } from "../../primitives/popper/popper-trigger-context";
import type { PopoverBaseProps, PopoverRootContextValue } from "./popover-root-context";
import {
  usePopper,
  type UsePopperProps,
  type UsePopperReturnContexts,
} from "../../primitives/popper/use-popper";

export type PopoverProps = UsePopperProps &
  PopoverBaseProps & {
    /**
     * 按下 Esc 键时关闭
     * @default true
     */
    closeOnEscape?: boolean;

    /**
     * 单击外部时关闭
     * @default true
     */
    closeOnOutsideClick?: boolean;
  };

export type UsePopoverReturnContexts = {
  ariaContext: {
    labelId: string;
    descriptionId: string;
  };
  referenceContext: PopperTriggerContextValue;
  floatingContext: PopperFloatingContextValue;
  popoverRootContext: PopoverRootContextValue;
} & UsePopperReturnContexts;

export function usePopover({
  open,
  defaultOpen,
  onOpenChange,
  initialFocus,
  finalFocus,
  closeOnEscape = true,
  closeOnOutsideClick = true,
  placement = "auto",
  duration = 250,
  inlineMiddleware = false,
}: PopoverProps = {}): {
  setOpen: (open: boolean) => void;
  setPosition: (node: ReferenceType | null) => void;
  floatingElement: HTMLElement | null;
} & UsePopoverReturnContexts {
  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const ariaContext = {
    labelId,
    descriptionId,
  };

  const { context, setReference, anchorContext, ...restContext } = usePopper({
    open,
    defaultOpen,
    onOpenChange,
    duration,
    placement,
    inlineMiddleware,
    arrowClassName: "fill-bg-normal [&>path:first-of-type]:stroke-bd-normal",
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useRole(context),
    useClick(context, {
      event: "mousedown",
    }),
    useDismiss(context, {
      outsidePressEvent: "mousedown",
      escapeKey: closeOnEscape,
      outsidePress: closeOnOutsideClick,
    }),
  ]);

  const referenceContext: PopperTriggerContextValue = {
    setReference,
    getReferenceProps,
  };

  const floatingContext: PopperFloatingContextValue = {
    getFloatingProps,
  };

  const popoverRootContext: PopoverRootContextValue = {
    context,
    initialFocus,
    finalFocus,
  };

  return {
    // oxlint-disable-next-line typescript/unbound-method
    setOpen: context.onOpenChange,
    setPosition: anchorContext.setPositionReference,
    floatingElement: context.elements.floating,
    ariaContext,
    popoverRootContext,
    floatingContext,
    referenceContext,
    anchorContext,
    ...restContext,
  };
}
