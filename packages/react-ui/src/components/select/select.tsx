import type { ReactNode } from "react";
import type { ListboxFilterProps } from "../listbox/listbox-filter";
import { ListboxFilterBase } from "../listbox/listbox-filter-base";

export { SelectRoot as Select, type SelectRootProps as SelectProps } from "./select-root";

export function SelectFilter(props: ListboxFilterProps): ReactNode {
  return <ListboxFilterBase focusable={false} {...props} />;
}

export { OptionEmpty as SelectEmpty } from "../../primitives/common/option-empty";
export { ListboxContent as SelectContent, ListboxList as SelectList } from "../listbox/listbox";
export { SelectVirtualizer } from "./select-virtualizer";
