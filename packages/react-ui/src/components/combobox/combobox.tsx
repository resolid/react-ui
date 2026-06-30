import type { PropsWithChildren, ReactNode } from "react";
import type { AnyObject } from "../../primitives/polymorphic";
import { ComboboxProvider } from "./combobox-provider";
import { type ComboboxProps, useCombobox } from "./use-combobox";

export type { ComboboxProps };

export function Combobox<T extends AnyObject = AnyObject>(
  props: PropsWithChildren<ComboboxProps<T>>,
): ReactNode {
  const { children, ...rest } = props;

  const combobox = useCombobox<T>(rest);

  return <ComboboxProvider<T> value={combobox}>{children}</ComboboxProvider>;
}

export { ComboboxAnchor } from "./combobox-anchor";
export { ComboboxTrigger } from "./combobox-trigger";
export { ComboboxInput } from "./combobox-input";
export { ComboboxContent } from "./combobox-content";
export { ComboboxVirtualizer } from "./combobox-virtualizer";
export { ListboxList as ComboboxList } from "../listbox/listbox-list";
export { OptionEmpty as ComboboxEmpty } from "../../primitives/common/option-empty";
