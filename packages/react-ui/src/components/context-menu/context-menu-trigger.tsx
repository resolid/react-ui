import { type MouseEvent, type PointerEvent, useCallback, useEffect, useRef } from "react";
import type { JSX } from "react/jsx-runtime";
import { Polymorphic, type PolymorphicProps } from "../../primitives";
import { usePopperAnchor } from "../../primitives/popper/popper-anchor-context";
import { usePopperDispatch } from "../../primitives/popper/popper-dispatch-context";
import { usePopperState } from "../../primitives/popper/popper-state-context";
import { dataAttr, tx } from "../../utils";

type ContextMenuTriggerProps = {
  /**
   * 是否被禁用
   * @default false
   */
  disabled?: boolean;
};

export const ContextMenuTrigger = (
  props: PolymorphicProps<"div", ContextMenuTriggerProps>,
): JSX.Element => {
  const {
    render,
    disabled = false,
    onContextMenu,
    onPointerDown,
    onPointerMove,
    onPointerCancel,
    onPointerUp,
    children,
    className,
    ...rest
  } = props;

  const { open } = usePopperState();
  const { setPositionReference } = usePopperAnchor();
  const { handleOpen } = usePopperDispatch();

  const longPressTimerRef = useRef<number | null>(null);

  const clearLongPress = useCallback(() => {
    if (longPressTimerRef.current) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearLongPress();
  }, [clearLongPress]);

  useEffect(() => {
    if (disabled) {
      clearLongPress();
    }
  }, [disabled, clearLongPress]);

  const openMenu = ({ clientX, clientY }: { clientX: number; clientY: number }) => {
    setPositionReference({
      getBoundingClientRect() {
        return {
          height: 0,
          width: 0,
          x: clientX,
          y: clientY,
          top: clientY,
          right: clientX,
          bottom: clientY,
          left: clientX,
        };
      },
    });

    handleOpen?.();
  };

  const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    onContextMenu?.(e);

    if (!disabled) {
      clearLongPress();
      openMenu({ clientX: e.clientX, clientY: e.clientY });
      e.preventDefault();
    }
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    onPointerDown?.(e);

    if (!disabled && e.pointerType != "mouse") {
      clearLongPress();
      longPressTimerRef.current = window.setTimeout(
        () => openMenu({ clientX: e.clientX, clientY: e.clientY }),
        700,
      );
    }
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e);

    if (!disabled && e.pointerType != "mouse") {
      clearLongPress();
    }
  };

  const handlePointerCancel = (e: PointerEvent<HTMLDivElement>) => {
    onPointerCancel?.(e);

    if (!disabled && e.pointerType != "mouse") {
      clearLongPress();
    }
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    onPointerUp?.(e);

    if (!disabled && e.pointerType != "mouse") {
      clearLongPress();
    }
  };

  return (
    <Polymorphic<"div">
      as={"div"}
      render={render}
      data-active={dataAttr(open)}
      onContextMenu={handleContextMenu}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerCancel={handlePointerCancel}
      onPointerUp={handlePointerUp}
      className={tx("", className)}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
};
