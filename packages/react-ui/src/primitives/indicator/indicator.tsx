import { type CSSProperties, useMemo } from "react";
import type { JSX } from "react/jsx-runtime";
import type { Orientation } from "../../shared/types";
import { tx } from "../../utils";
import type { PrimitiveProps } from "../polymorphic";
import { useIndicator } from "./indicator-context";

export type IndicatorProps = {
  orientation: Orientation;
};

export const Indicator = (
  props: PrimitiveProps<"span", IndicatorProps, "role" | "children">,
): JSX.Element => {
  const { orientation, className, style, ...rest } = props;

  const { listElement, itemElement } = useIndicator();

  const indicatorStyle = useMemo(() => {
    if (!listElement || !itemElement) {
      return null;
    }

    const listStyle = getComputedStyle(listElement);

    return {
      "--wv": itemElement.offsetWidth + "px",
      "--hv": itemElement.offsetHeight + "px",
      "--tv":
        orientation == "vertical"
          ? `${itemElement.offsetTop - parseFloat(listStyle.paddingTop)}px`
          : `${itemElement.offsetLeft - parseFloat(listStyle.paddingLeft)}px`,
    } as CSSProperties;
  }, [itemElement, listElement, orientation]);

  return (
    <span
      role={"presentation"}
      style={{
        ...style,
        ...indicatorStyle,
      }}
      className={tx(
        "absolute transition-[width,height,translate] duration-200",
        orientation == "vertical" ? "translate-y-(--tv)" : "translate-x-(--tv)",
        className,
      )}
      {...rest}
    />
  );
};
