import type { ReactNode } from "react";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { usePopperAria } from "../../primitives/popper/popper-aria-context";
import { AlertDescription } from "../alert/alert";

export function ToastDescription(props: PrimitiveProps<"div", EmptyObject, "id">): ReactNode {
  const { descriptionId } = usePopperAria();

  return <AlertDescription id={descriptionId} {...props} />;
}
