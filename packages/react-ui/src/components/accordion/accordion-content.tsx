import type { JSX } from "react/jsx-runtime";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { CollapsibleContent } from "../collapsible/collapsible-content";

export function AccordionContent(
  props: PrimitiveProps<"div", EmptyObject, "id" | "role">,
): JSX.Element {
  // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
  return <CollapsibleContent role="region" {...props} />;
}
