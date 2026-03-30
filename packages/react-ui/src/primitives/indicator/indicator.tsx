import type { JSX } from "react/jsx-runtime";
import { type CSSProperties, useMemo } from "react";
import type { Orientation } from "../../shared/types";
import type { PrimitiveProps } from "../polymorphic";
import { useDirection } from "../../components/provider/direction-context";
import { tx } from "../../utils";
import { useIndicator } from "./indicator-context";

export type IndicatorProps = {
  orientation: Orientation;
};

export function Indicator(
  props: PrimitiveProps<"span", IndicatorProps, "role" | "children">,
): JSX.Element {
  const { orientation, className, style, ...rest } = props;

  const direction = useDirection(true);
  const vertical = orientation == "vertical";

  const { listElement, itemElement } = useIndicator();

  const indicatorStyle = useMemo(() => {
    if (!listElement || !itemElement) {
      return null;
    }

    const listStyle = getComputedStyle(listElement);

    const offset = vertical
      ? itemElement.offsetTop - parseFloat(listStyle.paddingTop)
      : direction == "rtl"
        ? -1 *
            ((itemElement.offsetParent as HTMLElement).offsetWidth -
              itemElement.offsetWidth -
              itemElement.offsetLeft) +
          parseFloat(listStyle.paddingLeft)
        : itemElement.offsetLeft - parseFloat(listStyle.paddingLeft);

    return {
      "--wv": `${itemElement.offsetWidth}px`,
      "--hv": `${itemElement.offsetHeight}px`,
      "--tv": `${offset}px`,
    } as CSSProperties;
  }, [direction, itemElement, listElement, vertical]);

  return (
    <span
      role="presentation"
      style={{
        ...style,
        ...indicatorStyle,
      }}
      className={tx(
        "absolute transition-[width,height,translate] duration-200",
        vertical ? "translate-y-(--tv)" : "translate-x-(--tv)",
        className,
      )}
      {...rest}
    />
  );
}
