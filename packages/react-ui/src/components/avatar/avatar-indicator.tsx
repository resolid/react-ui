import type { ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
import { tx } from "../../utils/clsx";
import { useDirection } from "../provider/direction-context";

export type AvatarIndicatorProps = {
  /**
   * 指示器相对于头像的位置
   * @default "top"
   */
  position?: "top" | "bottom";
};

export function AvatarIndicator(props: PrimitiveProps<"div", AvatarIndicatorProps>): ReactNode {
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
}
