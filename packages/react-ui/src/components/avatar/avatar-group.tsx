import type { CSSProperties, ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
import { tx } from "../../utils/clsx";
import { AvatarGroupContext, type AvatarGroupContextValue } from "./avatar-group-context";

export type AvatarGroupProps = AvatarGroupContextValue & {
  /**
   * 头像之间的空间
   * @default "-1rem"
   */
  spacing?: string;
};

export function AvatarGroup(props: PrimitiveProps<"div", AvatarGroupProps>): ReactNode {
  const { size, radius, spacing = "-1rem", children, className, style, ...rest } = props;

  const context = {
    size,
    radius,
  };

  return (
    // react-doctor-disable-next-line react-doctor/prefer-tag-over-role
    <div
      role="group"
      style={{ ...style, "--pv": spacing } as CSSProperties}
      className={tx("isolate flex w-fit items-center", className)}
      {...rest}
    >
      <AvatarGroupContext value={context}>{children}</AvatarGroupContext>
    </div>
  );
}
