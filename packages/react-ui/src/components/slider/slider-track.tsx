import type { ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
import { tx } from "../../utils/clsx";
import { useSlider } from "./slider-context";
import { sliderColorStyles } from "./slider.styles";

export function SliderTrack(props: PrimitiveProps<"div">): ReactNode {
  const { className, ...rest } = props;

  const { color, disabled, vertical, inverted } = useSlider();

  const colorStyle = sliderColorStyles[color].track;

  return (
    <div
      className={tx(
        "relative overflow-hidden rounded-full select-none",
        vertical ? "h-full w-(--s-root-s)" : "h-(--s-root-s) w-full",
        disabled && "opacity-75 grayscale-75",
        inverted ? colorStyle : "bg-bg-subtle",
        className,
      )}
      {...rest}
    >
      <div
        className={tx(
          "absolute",
          inverted ? "bg-bg-subtle" : colorStyle,
          vertical
            ? "top-(--s-track-e) bottom-(--s-track-s) w-full"
            : "inset-s-(--s-track-s) inset-e-(--s-track-e) h-full",
        )}
      />
    </div>
  );
}
