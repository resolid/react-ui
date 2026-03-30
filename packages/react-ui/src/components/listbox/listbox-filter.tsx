import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { ListboxFilterBase, type ListboxFilterBaseProps } from "./listbox-filter-base";

export type ListboxFilterProps = Omit<ListboxFilterBaseProps, "focusable">;

export function ListboxFilter(
  props: PrimitiveProps<"input", ListboxFilterProps, "children" | "type" | "disabled">,
): JSX.Element {
  return <ListboxFilterBase {...props} />;
}
