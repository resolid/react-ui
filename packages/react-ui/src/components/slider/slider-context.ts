import type { Direction } from "../../shared/types";
import type { SliderColor, SliderSize } from "./slider.styles";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type SliderContextValue = {
  /**
   * 最小值
   * @default 0
   */
  min: number;

  /**
   * 最大值
   * @default 100
   */
  max: number;

  /**
   * 计数器步长
   * @default 1
   */
  step: number;

  /**
   * 是否禁用
   * @default false
   */
  disabled: boolean;

  /**
   * 反转视觉
   * @default false
   */
  inverted: boolean;

  /**
   * 大小
   * @default 'md'
   */
  size: SliderSize;

  /**
   * 颜色
   * @default 'primary'
   */
  color: SliderColor;

  vertical: boolean;
  direction?: Direction;
};

const [context, hook] = createSafeContext<SliderContextValue>({
  name: "SliderContext",
});

export const SliderContext: SafeContext<SliderContextValue> = context;
export const useSlider: UseSafeContext<SliderContextValue> = hook;

export type ValueType = number | [number, number];

export type SliderControlContextValue = {
  /**
   * 可控值
   */
  value: ValueType;

  /**
   * 拖动时触发值改变
   */
  onChange: (value: ValueType) => void;

  /**
   * 拖动后触发值改变
   */
  onChangeEnd: (value: ValueType) => void;
};

const [controlContext, controlHook] = createSafeContext<SliderControlContextValue>({
  name: "SliderControlContext",
});

export const SliderControlContext: SafeContext<SliderControlContextValue> = controlContext;
export const useSliderControl: UseSafeContext<SliderControlContextValue> = controlHook;

export type SliderThumbContextValue = {
  dragging: boolean;
};

const [thumbContext, thumbHook] = createSafeContext<SliderThumbContextValue>({
  name: "SliderThumbContext",
});

export const SliderThumbContext: SafeContext<SliderThumbContextValue> = thumbContext;
export const useSliderThumb: UseSafeContext<SliderThumbContextValue> = thumbHook;
