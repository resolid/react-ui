import type { CSSProperties, ReactNode } from "react";
import type { JSX } from "react/jsx-runtime";
import type { Direction } from "../../shared/types";
import { tx } from "../../utils";
import { getOffset, getPosition } from "./utils";

export type SliderMarkProps = {
  vertical: boolean;
  direction?: Direction;
  marks: { value: number; label?: ReactNode }[];
  min: number;
  max: number;
  thumbHalf: number;
  computeOffset: (position: number) => number;
};

export const SliderMark = ({
  direction,
  marks,
  min,
  max,
  vertical,
  thumbHalf,
  computeOffset,
}: SliderMarkProps): JSX.Element => {
  return (
    <div
      className={
        "pointer-events-none absolute flex h-full w-full items-center justify-center select-none"
      }
    >
      {marks.map((mark) => {
        const markPos = getPosition(mark.value, min, max);
        const offset = getOffset(thumbHalf, computeOffset(markPos), 1);

        return (
          <div
            key={mark.value}
            role="presentation"
            style={
              {
                "--s-mark-s": markPos + "%",
                "--s-mark-o": offset + "px",
              } as CSSProperties
            }
            className={tx(
              "absolute flex size-[calc(var(--s-root-s)*2/3)] items-center justify-center rounded-full bg-bg-normal",
              vertical
                ? "translate-y-1/2"
                : direction == "rtl"
                  ? "translate-x-1/2"
                  : "-translate-x-1/2",
              vertical
                ? "bottom-[calc(var(--s-mark-s)+var(--s-mark-o))]"
                : "start-[calc(var(--s-mark-s)+var(--s-mark-o))]",
            )}
          >
            {mark.label && (
              <span
                className={tx("absolute text-sm leading-none", vertical ? "start-3.5" : "top-3.5")}
              >
                {mark.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
