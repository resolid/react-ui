import { type CSSProperties, type ReactNode, useMemo } from "react";
import type { Orientation } from "../../shared/types";
import type { PrimitiveProps } from "../polymorphic";
import { useDirection } from "../../components/provider/direction-context";
import { tx } from "../../utils/clsx";
import { useIndicator } from "./indicator-context";

export type IndicatorProps = {
  orientation: Orientation;
};

export function Indicator(
  props: PrimitiveProps<"span", IndicatorProps, "role" | "children">,
): ReactNode {
  const { orientation, className, style, ...rest } = props;

  const direction = useDirection(true);
  const vertical = orientation == "vertical";

  const { listElement, activeElement } = useIndicator();

  // react-doctor-disable-next-line react-doctor/react-compiler-no-manual-memoization
  const indicatorStyle = useMemo(() => {
    if (!listElement || !activeElement) {
      return null;
    }

    const listStyle = getComputedStyle(listElement);

    const offset = vertical
      ? activeElement.offsetTop - parseFloat(listStyle.paddingTop)
      : direction == "rtl"
        ? -1 *
            ((activeElement.offsetParent as HTMLElement).offsetWidth -
              activeElement.offsetWidth -
              activeElement.offsetLeft) +
          parseFloat(listStyle.paddingLeft)
        : activeElement.offsetLeft - parseFloat(listStyle.paddingLeft);

    return {
      "--wv": `${activeElement.offsetWidth}px`,
      "--hv": `${activeElement.offsetHeight}px`,
      "--tv": `${offset}px`,
    } as CSSProperties;
  }, [direction, activeElement, listElement, vertical]);

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
