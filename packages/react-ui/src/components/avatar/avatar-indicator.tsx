import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { useDirection } from "../provider/direction-context";

export type AvatarIndicatorProps = {
  /**
   * 指示器相对于头像的位置
   * @default "top"
   */
  position?: "top" | "bottom";
};

export const AvatarIndicator = (
  props: PrimitiveProps<"div", AvatarIndicatorProps>,
): JSX.Element => {
  const { position = "top", className, children, ...rest } = props;

  const direction = useDirection(true);

  return (
    <div
      className={tx(
        "absolute inset-e-0 flex items-center justify-center",
        direction == "rtl" ? "-translate-x-1/10" : "translate-x-1/10",
        position == "top" ? "top-0 -translate-y-1/10" : "bottom-0 translate-y-1/10",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
