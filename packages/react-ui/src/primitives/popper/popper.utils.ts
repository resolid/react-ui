import type { CSSProperties, RefObject } from "react";
import { isNumber } from "@resolid/utils";
import type { Duration, TransitionStatus } from "../../shared/types";
import { tx } from "../../utils/clsx";

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
  duration: Duration;
  transitionClassName?: string | string[];
  openClassName?: string | string[];
  defaultClassName?: string | string[];
};

export function getPopperAnimationProps(props: PopperAnimationProps): {
  style: CSSProperties;
  className: string | undefined;
} {
  const {
    status,
    duration,
    transitionClassName = "transition-opacity",
    openClassName = "opacity-100",
    defaultClassName = "opacity-0",
  } = props;

  const transitionDuration = isNumber(duration)
    ? duration
    : status == "open"
      ? duration.open
      : duration.close;

  return {
    style: {
      "--dv": `${transitionDuration}ms`,
    } as CSSProperties,
    className: tx(
      "duration-(--dv)",
      transitionClassName,
      status == "open" ? openClassName : defaultClassName,
    ),
  };
}
