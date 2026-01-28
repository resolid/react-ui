import { clamp } from "@resolid/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Direction } from "../../shared/types";

export type UseMovePosition = {
  x: number;
  y: number;
};

export const clampUseMovePosition = (position: UseMovePosition): UseMovePosition => ({
  x: clamp(position.x, [0, 1]),
  y: clamp(position.y, [0, 1]),
});

export type UseMoveHandlers = {
  onScrubStart?: () => void;
  onScrubEnd?: () => void;
};

export const useMove = <T extends HTMLElement = HTMLDivElement>(
  onChange: (value: UseMovePosition) => void,
  handlers?: UseMoveHandlers,
  direction?: Direction,
): [(node: T | null) => void, boolean] => {
  const frame = useRef(0);
  const mounted = useRef(false);
  const sliding = useRef(false);
  const cleanup = useRef<(() => void) | null>(null);

  const [active, setActive] = useState(false);

  useEffect(() => {
    mounted.current = true;
  }, []);

  const { onScrubStart, onScrubEnd } = handlers || {};

  const ref = useCallback(
    (node: T | null) => {
      if (cleanup.current) {
        cleanup.current();
        cleanup.current = null;
      }

      if (!node) {
        return;
      }

      const startScrubbing = () => {
        if (!sliding.current && mounted.current) {
          sliding.current = true;
          onScrubStart?.();
          setActive(true);
          bindEvents();
        }
      };

      const stopScrubbing = () => {
        if (sliding.current && mounted.current) {
          sliding.current = false;
          setActive(false);
          unbindEvents();
          setTimeout(() => {
            onScrubEnd?.();
          }, 0);
        }
      };

      const handleScrub = ({ x, y }: UseMovePosition) => {
        cancelAnimationFrame(frame.current);

        frame.current = requestAnimationFrame(() => {
          if (mounted.current && node) {
            node.style.userSelect = "none";
            const rect = node.getBoundingClientRect();

            if (rect.width && rect.height) {
              const _x = clamp((x - rect.left) / rect.width, [0, 1]);
              onChange({
                x: direction == "rtl" ? 1 - _x : _x,
                y: clamp((y - rect.top) / rect.height, [0, 1]),
              });
            }
          }
        });
      };

      const handleMouseMove = (event: MouseEvent) =>
        handleScrub({ x: event.clientX, y: event.clientY });

      const handleMouseDown = (event: MouseEvent) => {
        startScrubbing();
        event.preventDefault();
        handleMouseMove(event);
      };

      const handleTouchMove = (event: TouchEvent) => {
        if (event.cancelable) {
          event.preventDefault();
        }

        handleScrub({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY });
      };

      const handleTouchStart = (event: TouchEvent) => {
        if (event.cancelable) {
          event.preventDefault();
        }

        startScrubbing();
        handleTouchMove(event);
      };

      const bindEvents = () => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", stopScrubbing);
        document.addEventListener("touchmove", handleTouchMove, { passive: false });
        document.addEventListener("touchend", stopScrubbing);
      };

      const unbindEvents = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", stopScrubbing);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", stopScrubbing);
      };

      node.addEventListener("mousedown", handleMouseDown);
      node.addEventListener("touchstart", handleTouchStart, { passive: false });

      cleanup.current = () => {
        node.removeEventListener("mousedown", handleMouseDown);
        node.removeEventListener("touchstart", handleTouchStart);
      };
    },
    [direction, onChange, onScrubEnd, onScrubStart],
  );

  return [ref, active];
};
