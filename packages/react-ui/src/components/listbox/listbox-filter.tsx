import type { ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
import {
  CollectionFilter,
  type CollectionFilterProps,
} from "../../primitives/collection/collection-filter";

export type ListboxFilterProps = Omit<CollectionFilterProps, "focusable">;

export function ListboxFilter(
  props: PrimitiveProps<"input", ListboxFilterProps, "children" | "type">,
): ReactNode {
  return <CollectionFilter {...props} />;
}
