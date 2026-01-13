import {
  arrow,
  autoUpdate,
  flip,
  FloatingNode,
  FloatingTree,
  offset,
  type Placement,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListNavigation,
  useRole,
  useTransitionStatus,
  useTypeahead,
} from "@floating-ui/react";
import { type PropsWithChildren, useEffect, useEffectEvent, useRef, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { useDirection } from "../../components/provider/direction-context";
import { useDisclosure, usePreventScroll, useTransitionComplete } from "../../hooks";
import type { DisclosureProps } from "../../shared/types";
import {
  PopperAnchorContext,
  type PopperAnchorContextValue,
} from "../popper/popper-anchor-context";
import { PopperArrowContext, type PopperArrowContextValue } from "../popper/popper-arrow-context";
import {
  PopperDispatchContext,
  type PopperDispatchContextValue,
} from "../popper/popper-dispatch-context";
import {
  PopperFloatingContext,
  type PopperFloatingContextValue,
} from "../popper/popper-floating-context";
import {
  PopperPositionerContext,
  type PopperPositionerContextValue,
} from "../popper/popper-positioner-context";
import { PopperStateContext, type PopperStateContextValue } from "../popper/popper-state-context";
import {
  PopperTransitionContext,
  type PopperTransitionContextValue,
} from "../popper/popper-transtion-context";
import {
  PopperTriggerContext,
  type PopperTriggerContextValue,
} from "../popper/popper-trigger-context";
import { MenuContext, type MenuContextValue } from "./menu-context";
import { MenuHoverContext } from "./menu-hover-context";

export type MenuRootProps = DisclosureProps & {
  /**
   * 选择项目后, 菜单将关闭
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * 打开时阻止背景页面滚动
   * @default false
   */
  preventScroll?: boolean;

  /**
   * 放置位置
   * @default "bottom-start"
   */
  placement?: Placement;
};

export const MenuRoot = (props: PropsWithChildren<MenuRootProps>): JSX.Element => {
  const parentId = useFloatingParentNodeId();

  if (parentId == null) {
    return (
      <FloatingTree>
        <MenuTree {...props} />
      </FloatingTree>
    );
  }

  return <MenuTree {...props} />;
};

const MenuTree = (props: PropsWithChildren<MenuRootProps>) => {
  const {
    open,
    defaultOpen = false,
    onOpenChange,
    closeOnSelect = true,
    preventScroll = false,
    placement = "bottom-start",
    duration = 250,
    children,
  } = props;

  const direction = useDirection(true);

  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const nested = parentId != null;

  const [openState, { handleOpen, handleClose }] = useDisclosure({
    open,
    defaultOpen,
    onOpenChange,
  });

  const [arrowElem, setArrowElem] = useState<SVGSVGElement | null>(null);

  const { floatingStyles, refs, context } = useFloating({
    open: openState,
    onOpenChange: (open) => {
      if (open) {
        handleOpen();
      } else {
        handleClose();
      }
    },
    nodeId,
    middleware: [
      offset({ mainAxis: nested ? 0 : 8, alignmentAxis: nested ? -5 : 0 }),
      flip(),
      shift({ padding: 8 }),
      arrow({
        element: arrowElem,
        padding: 4,
      }),
    ],
    placement: nested ? "right-start" : placement,
    whileElementsMounted: autoUpdate,
  });

  const arrowContext: PopperArrowContextValue = {
    context,
    setArrow: setArrowElem,
    arrowClassName: "fill-bg-normal [&>path:first-of-type]:stroke-bg-muted",
  };

  usePreventScroll({
    enabled: preventScroll && openState && !nested,
    contentElement: context.elements.reference as HTMLElement,
  });

  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const labelsRef = useRef<(string | null)[]>([]);
  const typingRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverEnabled, setHoverEnabled] = useState(true);

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useRole(context, { role: "menu" }),
    useHover(context, {
      enabled: hoverEnabled && nested,
      mouseOnly: true,
      move: false,
      delay: 100,
      handleClose: safePolygon({ blockPointerEvents: true }),
    }),
    useClick(context, {
      event: "mousedown",
      toggle: !nested,
      ignoreMouse: nested,
    }),
    useDismiss(context, { outsidePressEvent: "mousedown", bubbles: true }),
    useListNavigation(context, {
      listRef: elementsRef,
      nested,
      activeIndex,
      onNavigate: setActiveIndex,
      rtl: direction == "rtl",
    }),
    useTypeahead(context, {
      listRef: labelsRef,
      activeIndex,
      resetMs: 500,
      onMatch: (index) => {
        if (openState && index !== activeIndex) {
          setActiveIndex(index);
        }
      },
      onTypingChange: (nextTyping) => {
        typingRef.current = nextTyping;
      },
    }),
  ]);

  const stateContext: PopperStateContextValue = {
    open: openState,
  };

  const referenceContext: PopperTriggerContextValue = {
    setReference: refs.setReference,
    getReferenceProps: getReferenceProps,
  };

  const anchorContext: PopperAnchorContextValue = {
    setPositionReference: refs.setPositionReference,
  };

  const menuEvents = useFloatingTree()!.events;

  const floatingContext: PopperFloatingContextValue = {
    getFloatingProps,
  };

  const menuContext: MenuContextValue = {
    context,
    menuEvents,
    closeOnSelect,
    activeIndex,
    getItemProps,
    nested,
    elementsRef,
    labelsRef,
    typingRef,
  };

  const dispatchContext: PopperDispatchContextValue = {
    handleOpen,
    handleClose,
  };

  const handleCloseEvent = useEffectEvent(() => {
    handleClose();
  });

  const handleOpenChangeEvent = useEffectEvent(
    (event: { open: boolean; nodeId: string; parentId: string }) => {
      if (event.parentId === nodeId) {
        setHoverEnabled(!event.open);
      }

      if (event.open && event.nodeId !== nodeId && event.parentId === parentId) {
        handleClose();
      }
    },
  );

  useEffect(() => {
    menuEvents.on("close", handleCloseEvent);
    menuEvents.on("openchange", handleOpenChangeEvent);

    return () => {
      menuEvents.off("close", handleCloseEvent);
      menuEvents.off("openchange", handleOpenChangeEvent);
    };
  }, [menuEvents]);

  useEffect(() => {
    menuEvents.emit("openchange", { open: openState, parentId, nodeId });
  }, [menuEvents, nodeId, parentId, openState]);

  const { isMounted, status } = useTransitionStatus(context, {
    duration,
  });

  useTransitionComplete({
    status,
    onCloseComplete() {
      setHoverEnabled(true);
    },
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

  return (
    <PopperArrowContext value={arrowContext}>
      <PopperStateContext value={stateContext}>
        <PopperTriggerContext value={referenceContext}>
          <PopperAnchorContext value={anchorContext}>
            <MenuContext value={menuContext}>
              <PopperDispatchContext value={dispatchContext}>
                <PopperTransitionContext value={transitionContext}>
                  <PopperPositionerContext value={positionerContext}>
                    <PopperFloatingContext value={floatingContext}>
                      <MenuHoverContext value={{ setHoverEnabled }}>
                        <FloatingNode id={nodeId}>{children}</FloatingNode>
                      </MenuHoverContext>
                    </PopperFloatingContext>
                  </PopperPositionerContext>
                </PopperTransitionContext>
              </PopperDispatchContext>
            </MenuContext>
          </PopperAnchorContext>
        </PopperTriggerContext>
      </PopperStateContext>
    </PopperArrowContext>
  );
};
