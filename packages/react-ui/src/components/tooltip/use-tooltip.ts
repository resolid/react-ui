import {
  safePolygon,
  useDismiss,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStatus,
  type ReferenceType,
} from "@floating-ui/react";
import type { PopperAnchorContextValue } from "../../primitives/popper/popper-anchor-context";
import type { PopperArrowContextValue } from "../../primitives/popper/popper-arrow-context";
import type { PopperFloatingContextValue } from "../../primitives/popper/popper-floating-context";
import type { PopperPositionerContextValue } from "../../primitives/popper/popper-positioner-context";
import type { PopperStateContextValue } from "../../primitives/popper/popper-state-context";
import type { PopperTransitionContextValue } from "../../primitives/popper/popper-transtion-context";
import type { PopperTriggerContextValue } from "../../primitives/popper/popper-trigger-context";
import type { DisclosureProps } from "../../shared/types";
import type { TooltipRootContextValue } from "./tooltip-root-context";
import { useDisclosure } from "../../hooks";
import {
  usePopperWithInline,
  type PopperWithInlineProps,
} from "../../primitives/popper/use-popper-with-inline";
import { tooltipColorStyles } from "./tooltip.styles";

export type TooltipProps = DisclosureProps & {
  /**
   * 颜色
   * @default "neutral"
   */
  color?: keyof typeof tooltipColorStyles;

  /**
   * 打开延迟
   * @default 300
   */
  openDelay?: number;

  /**
   * 关闭延迟
   * @default 150
   */
  closeDelay?: number;

  /**
   * 内容是否是交互。在此模式下，当用户将鼠标悬停在内容上时，工具提示将保持打开状态
   * @default false
   */
  interactive?: boolean;
} & PopperWithInlineProps;

export function useTooltip({
  open,
  defaultOpen = false,
  onOpenChange,
  color = "neutral",
  placement = "auto",
  interactive = false,
  openDelay = 300,
  closeDelay = 150,
  duration = 250,
  inlineMiddleware = false,
}: TooltipProps = {}): {
  setOpen: (open: boolean) => void;
  setPosition: (node: ReferenceType | null) => void;
  floatingElement: HTMLElement | null;
  stateContext: PopperStateContextValue;
  arrowContext: PopperArrowContextValue;
  anchorContext: PopperAnchorContextValue;
  referenceContext: PopperTriggerContextValue;
  positionerContext: PopperPositionerContextValue;
  floatingContext: PopperFloatingContextValue;
  transitionContext: PopperTransitionContextValue;
  tooltipRootContext: TooltipRootContextValue;
} {
  const [openState, { handleOpen, handleClose }] = useDisclosure({
    open,
    defaultOpen,
    onOpenChange,
  });

  const { setArrowElem, floatingStyles, refs, context } = usePopperWithInline({
    inlineMiddleware,
    placement,
    openState,
    handleOpen,
    handleClose,
  });

  const tooltipColorStyle = tooltipColorStyles[color];

  const arrowContext: PopperArrowContextValue = {
    context,
    setArrow: setArrowElem,
    arrowClassName: tooltipColorStyle.arrow,
  };

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useRole(context, { role: "tooltip" }),
    useHover(context, {
      mouseOnly: true,
      move: false,
      delay: { open: openDelay, close: closeDelay },
      handleClose: interactive ? safePolygon() : null,
    }),
    useFocus(context),
    useDismiss(context, { referencePress: true }),
  ]);

  const stateContext: PopperStateContextValue = {
    open: openState,
  };

  const referenceContext: PopperTriggerContextValue = {
    setReference: refs.setReference,
    getReferenceProps: getReferenceProps,
  };

  const anchorContext: PopperAnchorContextValue = {
    setPositionReference: (node) => refs.setPositionReference(node),
  };

  const floatingContext: PopperFloatingContextValue = {
    getFloatingProps,
  };

  const tooltipRootContext: TooltipRootContextValue = {
    interactive,
    contentClassName: tooltipColorStyle.content,
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
    setOpen: (opened) => context.onOpenChange(opened),
    setPosition: (node) => refs.setPositionReference(node),
    floatingElement: context.elements.floating,
    stateContext,
    arrowContext,
    anchorContext,
    referenceContext,
    positionerContext,
    floatingContext,
    transitionContext,
    tooltipRootContext,
  };
}
