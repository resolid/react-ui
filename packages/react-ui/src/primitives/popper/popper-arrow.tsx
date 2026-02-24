import type { JSX } from "react/jsx-runtime";
import { FloatingArrow, type FloatingArrowProps } from "@floating-ui/react";
import { usePopperArrow } from "./popper-arrow-context";

export type PopperArrowProps = Omit<FloatingArrowProps, "context" | "stroke" | "fill">;

export const PopperArrow = (props: PopperArrowProps): JSX.Element => {
  const { className, width = 8, height = 4, tipRadius = 0.1, strokeWidth = 1, ...rest } = props;

  const { context, setArrow, arrowClassName } = usePopperArrow();

  return (
    <FloatingArrow
      ref={setArrow}
      className={className?.includes("fill-") ? className : arrowClassName}
      strokeWidth={strokeWidth}
      width={width}
      height={height}
      context={context}
      tipRadius={tipRadius}
      {...rest}
    />
  );
};
