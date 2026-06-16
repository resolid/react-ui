import type { ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives";
import { DialogRoot, type DialogRootProps } from "../dialog/dialog-root";
import { DrawerContext, type DrawerContextValue } from "./drawer-context";

export type DrawerRootProps = Omit<
  DialogRootProps,
  "scrollBehavior" | "preventScroll" | "placement" | "role"
> &
  Partial<DrawerContextValue>;

export function DrawerRoot(props: PrimitiveProps<"div", DrawerRootProps, "role">): ReactNode {
  const { placement = "end", children, ...rest } = props;

  return (
    <DrawerContext value={{ placement }}>
      <DialogRoot role="dialog" scrollBehavior="inside" preventScroll {...rest}>
        {children}
      </DialogRoot>
    </DrawerContext>
  );
}
