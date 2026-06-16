import type { ReactNode } from "react";
import type { EmptyObject, PrimitiveProps } from "../polymorphic";
import { usePopperAria } from "./popper-aria-context";

export function PopperDescription(props: PrimitiveProps<"div", EmptyObject, "id">): ReactNode {
  const { descriptionId } = usePopperAria();

  return <div id={descriptionId} {...props} />;
}
