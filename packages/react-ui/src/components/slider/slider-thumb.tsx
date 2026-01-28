import { runIf } from "@resolid/utils";
import type { KeyboardEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import { useFocus, useHover, useMergeRefs } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from "../tooltip/tooltip";
import { useSlider, useSliderControl, useSliderThumb, type ValueType } from "./slider-context";
import { sliderColorStyles, sliderSizeStyles } from "./slider.styles";
import { getStepValue } from "./utils";

type SliderThumbButtonProps = {
  value: number;
  index?: number;
};

const SliderThumbButton = (props: PrimitiveProps<"div", SliderThumbButtonProps>) => {
  const { className, children, value, index, ref, ...rest } = props;

  const { max, min, size, color, disabled, vertical } = useSlider();
  const { dragging } = useSliderThumb();

  const [hoverRef, hovered] = useHover();
  const [focusRef, focused] = useFocus();

  const borderStyle = sliderSizeStyles[size].border;
  const colorStyle = sliderColorStyles[color].thumb;

  const refs = useMergeRefs(ref, hoverRef, focusRef);

  return (
    <Tooltip open={dragging || hovered || focused} placement={vertical ? "right" : "top"}>
      <TooltipTrigger
        ref={refs}
        role={"slider"}
        disabled={disabled}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        aria-orientation={vertical ? "vertical" : "horizontal"}
        render={(triggerProps) => (
          <div
            className={tx(
              "absolute z-10 touch-none appearance-none rounded-full bg-bg-normal select-none",
              "h-(--s-thumb-h) w-(--s-thumb-w)",
              vertical ? "translate-y-1/2" : "-translate-x-1/2",
              disabled
                ? "cursor-not-allowed grayscale-75"
                : "cursor-pointer focus-visible:outline-2",
              disabled ? colorStyle.disable : colorStyle.enable,
              !children && borderStyle,
              className,
            )}
            {...triggerProps}
            {...rest}
          >
            {runIf(children, index, disabled)}
          </div>
        )}
      />
      <TooltipContent className={"capitalize"}>
        <TooltipArrow />
        {value}
      </TooltipContent>
    </Tooltip>
  );
};

export type SliderThumbProps = {
  size?: { width: number; height: number };
};

export const SliderThumb = (
  props: PrimitiveProps<"div", SliderThumbProps, "onKeyDown">,
): JSX.Element => {
  const { className, ...rest } = props;
  const { max, min, step, vertical, direction } = useSlider();

  const { value, onChange, onChangeEnd } = useSliderControl();

  const rtl = direction == "rtl";

  const handelKeyDown = (e: KeyboardEvent<HTMLDivElement>, index?: number) => {
    if (e.code == "ArrowUp" || e.key == "ArrowRight") {
      e.preventDefault();
      e.stopPropagation();

      const next = getStepValue(value, rtl && !vertical ? 0 - step : step, min, max, index);

      onChange(next);
      onChangeEnd(next);

      return;
    }

    if (e.code == "ArrowDown" || e.key == "ArrowLeft") {
      e.preventDefault();
      e.stopPropagation();

      const next = getStepValue(value, rtl && !vertical ? step : 0 - step, min, max, index);

      onChange(next);
      onChangeEnd(next);

      return;
    }

    if (e.code == "Home") {
      e.preventDefault();
      e.stopPropagation();

      const next: ValueType = Array.isArray(value)
        ? index == 1
          ? [value[0], value[0]]
          : [min, value[1]]
        : min;

      onChange(next);
      onChangeEnd(next);

      return;
    }

    if (e.code == "End") {
      e.preventDefault();
      e.stopPropagation();

      const next: ValueType = Array.isArray(value)
        ? index == 1
          ? [value[0], max]
          : [value[1], value[1]]
        : max;

      onChange(next);
      onChangeEnd(next);
    }
  };

  if (Array.isArray(value)) {
    return (
      <>
        <SliderThumbButton
          index={0}
          value={value[0]}
          className={tx(
            vertical
              ? "bottom-[calc(var(--s-thumb-s0)+var(--s-thumb-o0))]"
              : "start-[calc(var(--s-thumb-s0)+var(--s-thumb-o0))]",
            className,
          )}
          onKeyDown={(e) => {
            handelKeyDown(e, 0);
          }}
          {...rest}
        />
        <SliderThumbButton
          index={1}
          value={value[1]}
          className={tx(
            vertical
              ? "bottom-[calc(var(--s-thumb-s1)+var(--s-thumb-o1))]"
              : "start-[calc(var(--s-thumb-s1)+var(--s-thumb-o1))]",
            className,
          )}
          onKeyDown={(e) => {
            handelKeyDown(e, 1);
          }}
          {...rest}
        />
      </>
    );
  }

  return (
    <SliderThumbButton
      value={value}
      className={tx(
        vertical
          ? "bottom-[calc(var(--s-thumb-s0)+var(--s-thumb-o0))]"
          : "start-[calc(var(--s-thumb-s0)+var(--s-thumb-o0))]",
        className,
      )}
      onKeyDown={(e) => {
        handelKeyDown(e);
      }}
      {...rest}
    />
  );
};
