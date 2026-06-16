import type { ReactNode } from "react";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { CollapsibleContent } from "../collapsible/collapsible-content";

export function AccordionContent(
  props: PrimitiveProps<"div", EmptyObject, "id" | "role">,
): ReactNode {
  return <CollapsibleContent role="region" {...props} />;
}
