import { clamp, isNumber } from "@resolid/utils";
import {
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
  type TouchEvent,
  useRef,
  useState,
} from "react";
import type { JSX } from "react/jsx-runtime";
import { useControllableState, useMergeRefs, useMove, type UseMovePosition } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import type { Orientation } from "../../shared/types";
import { hasSizeBaseClass } from "../../shared/utils";
import { tx } from "../../utils";
import { useDirection } from "../provider/direction-context";
import { VisuallyHiddenInput } from "../visually-hidden/visually-hidden-input";
import {
  SliderContext,
  type SliderContextValue,
  SliderControlContext,
  type SliderControlContextValue,
  SliderThumbContext,
  type SliderThumbContextValue,
  type ValueType,
} from "./slider-context";
import { SliderMark } from "./slider-mark";
import { sliderSizeStyles } from "./slider.styles";
import { getChangeValue, getNextValue, getOffset, getPosition, linearScale } from "./utils";

export type SliderRootProps = Partial<SliderControlContextValue> &
  Partial<Omit<SliderContextValue, "vertical" | "direction">> & {
    /**
     * 非可控默认值
     */
    defaultValue?: ValueType;

    /**
     * 字段的名称, 提交表单时使用
     */
    name?: string;

    /**
     * 是否必填
     * @default false
     */
    required?: boolean;

    /**
     * 方向
     * @default "horizontal"
     */
    orientation?: Orientation;

    /**
     * 标记
     */
    marks?: { value: number; label?: ReactNode }[];

    /**
     * 滑块大小, 如果自定义滑块需设置滑块大小以对其
     */
    thumbSize?: { width: number; height: number };
  };

export const SliderRoot = (props: PrimitiveProps<"div", SliderRootProps>): JSX.Element => {
  const {
    className,
    children,
    name,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    required = false,
    inverted = false,
    orientation = "horizontal",
    color = "primary",
    size = "md",
    marks,
    value,
    defaultValue = min,
    onChange,
    onChangeEnd,
    thumbSize,
    ref,
    ...rest
  } = props;

  const direction = useDirection(true);
  const vertical = orientation == "vertical";
  const precision = step.toString().split(".")[1]?.length ?? 0;

  const [valueState, setValueState] = useControllableState({
    value: isNumber(value) ? clamp(value, [min, max]) : value,
    defaultValue: isNumber(defaultValue) ? clamp(defaultValue, [min, max]) : defaultValue,
    onChange,
  });

  const [thumbIndex, setThumbIndex] = useState<number | undefined>(undefined);

  const contextValue: SliderContextValue = {
    min,
    max,
    step,
    size,
    color,
    disabled,
    inverted,
    vertical,
    direction,
  };

  const controlContextValue: SliderControlContextValue = {
    value: valueState,
    onChange: (value) => {
      setValueState(value);
    },
    onChangeEnd: (value) => {
      onChangeEnd?.(value);
    },
  };

  const valueRef = useRef(valueState);

  const handleMoveChange = ({ x, y }: UseMovePosition) => {
    if (disabled) {
      return;
    }

    const next = getNextValue(
      (vertical ? y : x) * (max - min),
      min,
      max,
      step,
      precision,
      vertical,
    );

    const value: ValueType = getChangeValue(valueState, next, min, max, thumbIndex);

    setValueState(value);
    valueRef.current = value;
  };

  const handleScrubEnd = () => {
    if (!disabled && onChangeEnd) {
      onChangeEnd(valueRef.current);
    }
  };

  const [moveRef, active] = useMove(
    handleMoveChange,
    {
      onScrubEnd: handleScrubEnd,
    },
    direction,
  );

  const thumbContextValue: SliderThumbContextValue = {
    dragging: active,
  };

  const sizeStyle = sliderSizeStyles[size];

  const rootRef = useRef<HTMLDivElement | null>(null);

  const refs = useMergeRefs(ref, rootRef, moveRef);

  const handleTrackMouseDownCapture = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
  ) => {
    if (!Array.isArray(valueState)) {
      return;
    }

    if (!rootRef.current) {
      return;
    }

    const rect = rootRef.current.getBoundingClientRect();

    const clientPos =
      e.type == "mousedown"
        ? vertical
          ? (e as MouseEvent).nativeEvent.clientY
          : (e as MouseEvent).nativeEvent.clientX
        : vertical
          ? (e as TouchEvent).nativeEvent.touches[0].clientY
          : (e as TouchEvent).nativeEvent.touches[0].clientX;

    const clientSize = vertical ? rect.height : rect.width;
    const offset = clientPos - (vertical ? rect.top : rect.left);
    const ratio = clamp(offset, [0, clientSize]) / clientSize;

    const next = getNextValue(
      (!vertical && direction == "rtl" ? 1 - ratio : ratio) * (max - min),
      min,
      max,
      step,
      precision,
      vertical,
    );

    const nearest = Math.abs(valueState[0] - next) > Math.abs(valueState[1] - next) ? 1 : 0;

    setThumbIndex(nearest);
  };

  const position = Array.isArray(valueState)
    ? [getPosition(valueState[0], min, max), getPosition(valueState[1], min, max)]
    : getPosition(valueState, min, max);

  const resolvedThumbSize = thumbSize ?? sizeStyle.thumb;
  const thumbHalf = vertical ? resolvedThumbSize.height / 2 : resolvedThumbSize.width / 2;
  const computeOffset = linearScale([0, 50], [0, thumbHalf]);
  const directionValue = !vertical && direction == "rtl" ? -1 : 1;

  const thumbOffsets = Array.isArray(position)
    ? [
        getOffset(thumbHalf, computeOffset(position[0]), directionValue),
        getOffset(thumbHalf, computeOffset(position[1]), directionValue),
      ]
    : [getOffset(thumbHalf, computeOffset(position), directionValue), 0];

  const thumbStarts = Array.isArray(position)
    ? [position[0] + "%", position[1] + "%"]
    : [position + "%", "0%"];

  const style = {
    "--s-root-s": vertical ? sizeStyle.width : sizeStyle.heigh,
    "--s-track-s": Array.isArray(position) ? position[0] + "%" : "0%",
    "--s-track-e": Array.isArray(position) ? 100 - position[1] + "%" : 100 - position + "%",
    "--s-thumb-w": resolvedThumbSize.width + "px",
    "--s-thumb-h": resolvedThumbSize.height + "px",
    "--s-thumb-s0": thumbStarts[0],
    "--s-thumb-s1": thumbStarts[1],
    "--s-thumb-o0": thumbOffsets[0] + "px",
    "--s-thumb-o1": thumbOffsets[1] + "px",
  };

  return (
    <SliderContext value={contextValue}>
      <SliderControlContext value={controlContextValue}>
        <SliderThumbContext value={thumbContextValue}>
          <div
            ref={refs}
            dir={direction}
            tabIndex={-1}
            style={style as CSSProperties}
            className={tx(
              "relative isolate flex touch-none items-center outline-none",
              !hasSizeBaseClass(className) && (vertical ? "h-full" : "w-full"),
              vertical
                ? "w-[calc(var(--s-root-s)*3)] touch-pan-y flex-col"
                : "h-[calc(var(--s-root-s)*3)] touch-pan-x flex-row",
              className,
            )}
            onTouchStartCapture={handleTrackMouseDownCapture}
            onTouchEndCapture={() => {
              setThumbIndex(undefined);
            }}
            onMouseDownCapture={handleTrackMouseDownCapture}
            onMouseUpCapture={() => {
              setThumbIndex(undefined);
            }}
            {...rest}
          >
            {children}
            {marks && (
              <SliderMark
                marks={marks}
                min={min}
                max={max}
                vertical={vertical}
                direction={direction}
                thumbHalf={thumbHalf}
                computeOffset={computeOffset}
              />
            )}
            {name && (
              <VisuallyHiddenInput
                name={name}
                value={valueState}
                disabled={disabled}
                required={required}
              />
            )}
          </div>
        </SliderThumbContext>
      </SliderControlContext>
    </SliderContext>
  );
};
