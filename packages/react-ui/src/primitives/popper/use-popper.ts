import {
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  type FloatingContext,
  inline,
  offset,
  type Placement,
  type ReferenceType,
  shift,
  useFloating,
  useTransitionStatus,
} from "@floating-ui/react";
import { useState } from "react";
import type { DisclosureProps } from "../../shared/types";
import type { PopperAnchorContextValue } from "./popper-anchor-context";
import type { PopperArrowContextValue } from "./popper-arrow-context";
import type { PopperDispatchContextValue } from "./popper-dispatch-context";
import type { PopperPositionerContextValue } from "./popper-positioner-context";
import type { PopperStateContextValue } from "./popper-state-context";
import type { PopperTransitionContextValue } from "./popper-transtion-context";
import { useDisclosure } from "../../hooks";

export type UsePopperProps = DisclosureProps & {
  /**
   * 放置位置
   * @default "auto"
   */
  placement?: "auto" | Placement;

  /**
   * 控制是否启用 inline 中间件
   * @default false
   */
  inlineMiddleware?: boolean;
};

type UsePopperOptions = UsePopperProps & {
  arrowClassName: string;
};

export type UsePopperReturnContexts = {
  stateContext: PopperStateContextValue;
  arrowContext: PopperArrowContextValue;
  anchorContext: PopperAnchorContextValue;
  positionerContext: PopperPositionerContextValue;
  transitionContext: PopperTransitionContextValue;
  dispatchContext: PopperDispatchContextValue;
};

export function usePopper({
  open,
  defaultOpen = false,
  onOpenChange,
  duration = 250,
  placement = "auto",
  inlineMiddleware = false,
  arrowClassName,
}: UsePopperOptions): {
  context: FloatingContext;
  setReference: (node: ReferenceType | null) => void;
} & UsePopperReturnContexts {
  const [arrowElem, setArrowElem] = useState<SVGSVGElement | null>(null);

  const [openState, { handleOpen, handleClose }] = useDisclosure({
    open,
    defaultOpen,
    onOpenChange,
  });

  const stateContext: PopperStateContextValue = {
    open: openState,
  };

  const { floatingStyles, refs, context } = useFloating({
    middleware: [
      inlineMiddleware && inline(),
      offset(8),
      placement == "auto" ? autoPlacement() : flip(),
      shift({ padding: 8 }),
      arrow({
        element: arrowElem,
        padding: 4,
      }),
    ],
    open: openState,
    onOpenChange: (open) => {
      if (open) {
        handleOpen();
      } else {
        handleClose();
      }
    },
    placement: placement == "auto" ? undefined : placement,
    whileElementsMounted: autoUpdate,
  });

  const arrowContext: PopperArrowContextValue = {
    context,
    setArrow: setArrowElem,
    arrowClassName,
  };

  const anchorContext: PopperAnchorContextValue = {
    // oxlint-disable-next-line typescript/unbound-method
    setPositionReference: refs.setPositionReference,
  };

  const { isMounted, status } = useTransitionStatus(context, { duration });

  const transitionContext: PopperTransitionContextValue = {
    status,
    mounted: isMounted,
    duration,
  };

  const positionerContext: PopperPositionerContextValue = {
    setPositioner: refs.setFloating,
    positionerStyles: floatingStyles,
  };

  const dispatchContext: PopperDispatchContextValue = {
    handleOpen,
    handleClose,
  };

  return {
    context,
    setReference: refs.setReference,
    stateContext,
    arrowContext,
    anchorContext,
    positionerContext,
    transitionContext,
    dispatchContext,
  };
}
