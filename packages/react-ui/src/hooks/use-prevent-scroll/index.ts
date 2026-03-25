import { getDocument, getPlatform } from "@floating-ui/react/utils";
import { useEffect } from "react";
import type { Dict } from "../../primitives";

export type UsePreventScrollOptions = {
  enabled?: boolean;
  contentElement: HTMLElement | null;
};

const LOCK_ATTRIBUTE = "data-prevent-scroll";

const assignStyle = (
  element: HTMLElement | null | undefined,
  style: Partial<CSSStyleDeclaration>,
) => {
  if (!element) {
    return;
  }

  const current = Object.keys(style).reduce((acc, key) => {
    acc[key] = element.style.getPropertyValue(key);
    return acc;
  }, {} as Dict<string>);

  Object.assign(element.style, style);

  return () => {
    Object.assign(element.style, current);
  };
};

const getPaddingProperty = (documentElement: HTMLElement) => {
  const documentLeft = documentElement.getBoundingClientRect().left;
  const scrollbarX = Math.round(documentLeft) + documentElement.scrollLeft;

  return scrollbarX ? "paddingLeft" : "paddingRight";
};

const setCSSProperty = (
  element: HTMLElement | null | undefined,
  property: string,
  value: string,
) => {
  if (!element) {
    return;
  }

  const current = element.style.getPropertyValue(property);

  element.style.setProperty(property, value);

  return () => {
    if (current) {
      element.style.setProperty(property, current);
    } else {
      element.style.removeProperty(property);
    }
  };
};

const checkOverflowScroll = (element: Element): boolean => {
  const style = window.getComputedStyle(element);

  if (
    style.overflowX === "scroll" ||
    style.overflowY === "scroll" ||
    (style.overflowX === "auto" && element.clientWidth < element.scrollWidth) ||
    (style.overflowY === "auto" && element.clientHeight < element.scrollHeight)
  ) {
    return true;
  }

  const parent = element.parentNode as Element | null;

  if (!parent || parent.tagName === "BODY") {
    return false;
  }

  return checkOverflowScroll(parent);
};

export const usePreventScroll = (options: UsePreventScrollOptions): void => {
  const { enabled, contentElement } = options;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const doc = getDocument(contentElement);

    const { documentElement, body } = doc;

    const locked = body.hasAttribute(LOCK_ATTRIBUTE);

    if (locked) {
      return;
    }

    body.setAttribute(LOCK_ATTRIBUTE, "");

    const win = doc.defaultView ?? window;

    const scrollbarWidth = win.innerWidth - documentElement.clientWidth;

    const setScrollbarWidth = () =>
      setCSSProperty(documentElement, "--scrollbar-width", `${scrollbarWidth}px`);

    const paddingProperty = getPaddingProperty(documentElement);

    const preventScrollStandard = () =>
      assignStyle(body, {
        overflow: "hidden",
        [paddingProperty]: `${scrollbarWidth}px`,
      });

    const preventScrollMobileSafari = /iP(hone|ad|od)|iOS/.test(getPlatform())
      ? () => {
          const stopTouchMove = (e: TouchEvent) => {
            const { target } = e;

            if (target instanceof Element && checkOverflowScroll(target)) {
              return;
            }

            if (e.touches.length > 1) {
              return;
            }

            if (e.cancelable) {
              e.preventDefault();
            }
          };

          doc.addEventListener("touchmove", stopTouchMove, { passive: false });

          return () => {
            doc.removeEventListener("touchmove", stopTouchMove);
          };
        }
      : null;

    const cleanups = [setScrollbarWidth(), preventScrollStandard(), preventScrollMobileSafari?.()];

    return () => {
      for (const fn of cleanups) {
        fn?.();
      }

      body.removeAttribute(LOCK_ATTRIBUTE);
    };
  }, [contentElement, enabled]);
};
