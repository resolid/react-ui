import type { JSX } from "react/jsx-runtime";
import type { EmptyObject, PrimitiveProps } from "../polymorphic";
import { usePopperAria } from "./popper-aria-context";

export function PopperDescription(props: PrimitiveProps<"div", EmptyObject, "id">): JSX.Element {
  const { descriptionId } = usePopperAria();

  return <div id={descriptionId} {...props} />;
}
