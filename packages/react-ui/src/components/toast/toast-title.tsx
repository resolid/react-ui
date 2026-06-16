import type { ReactNode } from "react";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { usePopperAria } from "../../primitives/popper/popper-aria-context";
import { AlertTitle } from "../alert/alert";

export function ToastTitle(props: PrimitiveProps<"div", EmptyObject, "id">): ReactNode {
  const { labelId } = usePopperAria();

  return <AlertTitle id={labelId} {...props} />;
}
