import {
  useClick,
  useDismiss,
  useInteractions,
  useRole,
  useTransitionStatus,
  type ReferenceType,
} from "@floating-ui/react";
import { useId } from "react";
import type { PopperAnchorContextValue } from "../../primitives/popper/popper-anchor-context";
import type { PopperArrowContextValue } from "../../primitives/popper/popper-arrow-context";
import type { PopperDispatchContextValue } from "../../primitives/popper/popper-dispatch-context";
import type { PopperFloatingContextValue } from "../../primitives/popper/popper-floating-context";
import type { PopperPositionerContextValue } from "../../primitives/popper/popper-positioner-context";
import type { PopperStateContextValue } from "../../primitives/popper/popper-state-context";
import type { PopperTransitionContextValue } from "../../primitives/popper/popper-transtion-context";
import type { PopperTriggerContextValue } from "../../primitives/popper/popper-trigger-context";
import type { DisclosureProps } from "../../shared/types";
import type { PopoverBaseProps, PopoverRootContextValue } from "./popover-root-context";
import { useDisclosure } from "../../hooks";
import {
  usePopperWithInline,
  type PopperWithInlineProps,
} from "../../primitives/popper/use-popper-with-inline";

export type PopoverProps = DisclosureProps &
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
  } & PopperWithInlineProps;

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
  ariaContext: {
    labelId: string;
    descriptionId: string;
  };
  arrowContext: PopperArrowContextValue;
  stateContext: PopperStateContextValue;
  transitionContext: PopperTransitionContextValue;
  popoverRootContext: PopoverRootContextValue;
  dispatchContext: PopperDispatchContextValue;
  floatingContext: PopperFloatingContextValue;
  referenceContext: PopperTriggerContextValue;
  positionerContext: PopperPositionerContextValue;
  anchorContext: PopperAnchorContextValue;
} {
  const [openState, { handleOpen, handleClose }] = useDisclosure({
    open,
    defaultOpen,
    onOpenChange,
  });

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const ariaContext = {
    labelId,
    descriptionId,
  };

  const { setArrowElem, floatingStyles, refs, context } = usePopperWithInline({
    inlineMiddleware,
    placement,
    openState,
    handleOpen,
    handleClose,
  });

  const arrowContext: PopperArrowContextValue = {
    context,
    setArrow: setArrowElem,
    arrowClassName: "fill-bg-normal [&>path:first-of-type]:stroke-bd-normal",
  };

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

  const stateContext: PopperStateContextValue = {
    open: openState,
  };

  const referenceContext: PopperTriggerContextValue = {
    setReference: refs.setReference,
    getReferenceProps,
  };

  const anchorContext: PopperAnchorContextValue = {
    setPositionReference: (node) => refs.setPositionReference(node),
  };

  const floatingContext: PopperFloatingContextValue = {
    getFloatingProps,
  };

  const popoverRootContext: PopoverRootContextValue = {
    context,
    initialFocus,
    finalFocus,
  };

  const dispatchContext: PopperDispatchContextValue = {
    handleOpen,
    handleClose,
  };

  const { isMounted, status } = useTransitionStatus(context, {
    duration,
  });

  const transitionContext: PopperTransitionContextValue = {
    status,
    mounted: isMounted,
    duration,
  };

  const positionerContext: PopperPositionerContextValue = {
    setPositioner: refs.setFloating,
    positionerStyles: floatingStyles,
  };

  return {
    setOpen: (opened: boolean) => context.onOpenChange(opened),
    setPosition: (node) => refs.setPositionReference(node),
    floatingElement: context.elements.floating,
    ariaContext,
    arrowContext,
    stateContext,
    transitionContext,
    popoverRootContext,
    dispatchContext,
    floatingContext,
    referenceContext,
    positionerContext,
    anchorContext,
  };
}
