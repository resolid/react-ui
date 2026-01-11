import type { CSSProperties, RefObject } from "react";
import type { TransitionStatus } from "../../shared/types";
import { tx } from "../../utils";

export type PopperFocusProps = {
  /**
   * 开启后焦点目标
   */
  initialFocus?: number | RefObject<HTMLElement | null>;

  /**
   * 关闭后焦点目标
   */
  finalFocus?: boolean | RefObject<HTMLElement | null>;
};

export type PopperAnimationProps = {
  status: TransitionStatus;
  duration: number;
  transitionClassName?: string | string[];
  openClassName?: string | string[];
  defaultClassName?: string | string[];
};

export const getPopperAnimationProps = (
  props: PopperAnimationProps,
): {
  style: CSSProperties;
  className: string | undefined;
} => {
  const {
    status,
    duration,
    transitionClassName = "transition-opacity",
    openClassName = "opacity-100",
    defaultClassName = "opacity-0",
  } = props;

  return {
    style: {
      "--dv": `${duration}ms`,
    } as CSSProperties,
    className: tx(
      "duration-(--dv)",
      transitionClassName,
      status == "open" ? openClassName : defaultClassName,
    ),
  };
};
