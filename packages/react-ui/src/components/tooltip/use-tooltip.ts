import {
  type ReferenceType,
  safePolygon,
  useDelayGroup,
  useDismiss,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStatus,
} from "@floating-ui/react";
import type { PopperFloatingContextValue } from "../../primitives/popper/popper-floating-context";
import type { PopperTransitionContextValue } from "../../primitives/popper/popper-transtion-context";
import type { PopperTriggerContextValue } from "../../primitives/popper/popper-trigger-context";
import type { DelayProps } from "../../shared/types";
import type { TooltipRootContextValue } from "./tooltip-root-context";
import {
  usePopper,
  type UsePopperProps,
  type UsePopperReturnContexts,
} from "../../primitives/popper/use-popper";
import { tooltipColorStyles } from "./tooltip.styles";

export type TooltipProps = UsePopperProps &
  DelayProps & {
    /**
     * 颜色
     * @default "neutral"
     */
    color?: keyof typeof tooltipColorStyles;

    /**
     * 内容是否是交互。在此模式下，当用户将鼠标悬停在内容上时，工具提示将保持打开状态
     * @default false
     */
    interactive?: boolean;
  };

export type UseToolTipReturnContexts = {
  referenceContext: PopperTriggerContextValue;
  floatingContext: PopperFloatingContextValue;
  transitionContext: PopperTransitionContextValue;
  tooltipRootContext: TooltipRootContextValue;
} & UsePopperReturnContexts;

export function useTooltip(props: TooltipProps = {}): {
  setOpen: (open: boolean) => void;
  setPosition: (node: ReferenceType | null) => void;
  floatingElement: HTMLElement | null;
} & UseToolTipReturnContexts {
  const {
    open,
    defaultOpen = false,
    onOpenChange,
    color = "neutral",
    placement = "auto",
    interactive = false,
    duration = 250,
    inlineMiddleware = false,
    ...delayProps
  } = props;

  const tooltipColorStyle = tooltipColorStyles[color];

  const { context, setReference, anchorContext, ...restContext } = usePopper({
    open,
    defaultOpen,
    onOpenChange,
    placement,
    inlineMiddleware,
    arrowClassName: tooltipColorStyle.arrow,
  });
  const groupContext = useDelayGroup(context);

  const transitionDuration = groupContext.isInstantPhase
    ? { open: 0, close: context.floatingId === groupContext.currentId ? duration : 0 }
    : duration;

  const { isMounted, status } = useTransitionStatus(context, {
    duration: transitionDuration,
  });

  const transitionContext: PopperTransitionContextValue = {
    status,
    mounted: isMounted,
    duration: transitionDuration,
  };

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useRole(context, { role: "tooltip" }),
    useHover(context, {
      mouseOnly: true,
      move: false,
      delay:
        groupContext.delay == 0
          ? { open: delayProps.openDelay ?? 300, close: delayProps.closeDelay ?? 150 }
          : groupContext.delay,
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
    setOpen(opened) {
      context.onOpenChange(opened);
    },
    setPosition: anchorContext.setPositionReference,
    floatingElement: context.elements.floating,
    anchorContext,
    referenceContext,
    floatingContext,
    transitionContext,
    tooltipRootContext,
    ...restContext,
  };
}
