import type { CSSProperties, KeyboardEvent, MouseEvent, RefObject } from "react";
import { isNumber } from "@resolid/utils";

const radiusStyles = {
  none: "",
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
} as const;

export type Radius = number | keyof typeof radiusStyles;

export function getRadiusStyleAndClass(radius: Radius): {
  radiusStyle: CSSProperties | undefined;
  radiusClass: string;
} {
  const radiusStyle =
    isNumber(radius) && radius > 0 ? ({ "--rv": `${radius}px` } as CSSProperties) : undefined;
  const radiusClass = radiusStyle
    ? "rounded-(--rv)"
    : radiusStyles[radius as keyof typeof radiusStyles];

  return { radiusStyle, radiusClass };
}

export function hasBackgroundBaseClass(className?: string): boolean {
  return !!className && /(?:^|\s)bg-\S+/.test(className);
}

export function hasSizeBaseClass(className?: string): boolean {
  return !!className && /(?:^|\s)(?:[wh]|size)-\S+/.test(className);
}

export function hasRoundedBaseClass(className?: string): boolean {
  return !!className && /(?:^|\s)rounded-\S+/.test(className);
}

export function getInteractiveHandlers<E extends HTMLElement = HTMLDivElement>({
  disabled,
  typingRef,
  onClick,
}: {
  disabled: boolean;
  typingRef: RefObject<boolean>;
  onClick: (e: MouseEvent<E>) => void;
}): {
  handleClick: (e: MouseEvent<E>) => void;
  handleKeyDown: (e: KeyboardEvent) => void;
  handleKeyUp: (e: KeyboardEvent) => void;
} {
  const handleClick = (e: MouseEvent<E>): void => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    onClick(e);
  };

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.target === e.currentTarget && e.key === " ") {
      e.preventDefault();
    }

    if (e.target === e.currentTarget && e.key === "Enter") {
      handleClick(e as unknown as MouseEvent<E>);
    }
  };

  const handleKeyUp = (e: KeyboardEvent): void => {
    if (e.target === e.currentTarget && !typingRef.current && e.key === " ") {
      handleClick(e as unknown as MouseEvent<E>);
    }
  };

  return { handleClick, handleKeyDown, handleKeyUp };
}
