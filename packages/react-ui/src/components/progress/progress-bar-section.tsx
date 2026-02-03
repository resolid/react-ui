import { isNumber } from "@resolid/utils";
import type { CSSProperties } from "react";
import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { hasBackgroundBaseClass } from "../../shared/utils";
import { tx } from "../../utils";
import { progressBarSizeStyles, progressColorStyles } from "./progress-bar.styles";
import { useProgressBase } from "./progress-context";

export type ProgressBarSectionProps = {
  /**
   * 进度
   */
  percent: number;

  /**
   * 颜色
   * @default "primary"
   */
  color?: keyof typeof progressColorStyles;

  /**
   * 条纹
   * @default false
   */
  striped?: boolean;

  /**
   * 动画
   * @default false
   */
  animated?: boolean;
};

export const ProgressBarSection = (
  props: PrimitiveProps<"div", ProgressBarSectionProps>,
): JSX.Element => {
  const {
    percent,
    color = "primary",
    striped = false,
    animated = false,
    className,
    children,
    style,
    ...rest
  } = props;

  const { size, vertical, radiusClass } = useProgressBase();

  const sizeStyle = isNumber(size)
    ? {
        cv: `${size}px`,
        clsx: { width: "w-(--pbv)", height: "h-(--pbv)" },
      }
    : {
        cv: undefined,
        clsx: progressBarSizeStyles[size],
      };

  const precentValue = `${percent}%`;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-valuetext={precentValue}
      aria-label={precentValue}
      style={{ ...style, "--pbs": precentValue, "--pbv": sizeStyle.cv } as CSSProperties}
      className={tx(
        "flex items-center justify-center text-fg-emphasized duration-300 select-none",
        "leading-0 text-ellipsis whitespace-nowrap",
        vertical
          ? "not-first:not-last:rounded-none first:rounded-t-none last:rounded-b-none"
          : "not-first:not-last:rounded-none first:rounded-e-none last:rounded-s-none",
        vertical ? sizeStyle.clsx.width : sizeStyle.clsx.height,
        vertical
          ? "h-(--pbs) transition-[height] [writing-mode:vertical-lr]"
          : "w-(--pbs) transition-[width]",
        (striped || animated) && "bg-striped",
        animated && (vertical ? "animate-striped-h" : "animate-striped-w"),
        !hasBackgroundBaseClass(className) && progressColorStyles[color],
        radiusClass,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
