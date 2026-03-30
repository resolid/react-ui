import type { CSSProperties } from "react";
import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { AvatarGroupContext, type AvatarGroupContextValue } from "./avatar-group-context";

export type AvatarGroupProps = AvatarGroupContextValue & {
  /**
   * 头像之间的空间
   * @default "-1rem"
   */
  spacing?: string;
};

export function AvatarGroup(props: PrimitiveProps<"div", AvatarGroupProps>): JSX.Element {
  const { size, radius, spacing = "-1rem", children, className, style, ...rest } = props;

  const context = {
    size,
    radius,
  };

  return (
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
