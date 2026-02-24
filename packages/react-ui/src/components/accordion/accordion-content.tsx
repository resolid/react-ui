import type { JSX } from "react/jsx-runtime";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { CollapsibleContent } from "../collapsible/collapsible-content";

export const AccordionContent = (
  props: PrimitiveProps<"div", EmptyObject, "id" | "role">,
): JSX.Element => <CollapsibleContent role="region" {...props} />;
