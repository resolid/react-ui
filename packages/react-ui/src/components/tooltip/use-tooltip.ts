import {
  safePolygon,
  useDismiss,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  type ReferenceType,
} from "@floating-ui/react";
import type { PopperFloatingContextValue } from "../../primitives/popper/popper-floating-context";
import type { PopperTriggerContextValue } from "../../primitives/popper/popper-trigger-context";
import type { TooltipRootContextValue } from "./tooltip-root-context";
import {
  usePopper,
  type UsePopperProps,
  type UsePopperReturnContexts,
} from "../../primitives/popper/use-popper";
import { tooltipColorStyles } from "./tooltip.styles";

export type TooltipProps = UsePopperProps & {
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
};

export type UseToolTipReturnContexts = {
  referenceContext: PopperTriggerContextValue;
  floatingContext: PopperFloatingContextValue;
  tooltipRootContext: TooltipRootContextValue;
} & UsePopperReturnContexts;

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
} & UseToolTipReturnContexts {
  const tooltipColorStyle = tooltipColorStyles[color];

  const { context, setReference, anchorContext, ...restContext } = usePopper({
    open,
    defaultOpen,
    onOpenChange,
    duration,
    placement,
    inlineMiddleware,
    arrowClassName: tooltipColorStyle.arrow,
  });

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

  const referenceContext: PopperTriggerContextValue = {
    setReference,
    getReferenceProps,
  };

  const floatingContext: PopperFloatingContextValue = {
    getFloatingProps,
  };

  const tooltipRootContext: TooltipRootContextValue = {
    interactive,
    contentClassName: tooltipColorStyle.content,
  };

  return {
    // oxlint-disable-next-line typescript/unbound-method
    setOpen: context.onOpenChange,
    setPosition: anchorContext.setPositionReference,
    floatingElement: context.elements.floating,
    referenceContext,
    floatingContext,
    tooltipRootContext,
    anchorContext,
    ...restContext,
  };
}
