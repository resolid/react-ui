import type { KeyboardEvent, MouseEvent, RefObject } from "react";

export const hasBackgroundBaseClass = (className?: string): boolean => {
  return !!className && /(?:^|\s)bg-\S+/.test(className);
};

export const hasWidthHeightBaseClass = (className?: string): boolean => {
  return !!className && /(?:^|\s)[wh]-\S+/.test(className);
};

export const getInteractiveHandlers = <E extends HTMLElement = HTMLDivElement>({
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
} => {
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
};
