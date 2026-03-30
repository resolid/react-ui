import type { JSX, PropsWithChildren } from "react";
import type { ListboxItem } from "../listbox/use-listbox";
import { ComboboxProvider } from "./combobox-provider";
import { type ComboboxProps, useCombobox } from "./use-combobox";

export type { ComboboxProps };

export function Combobox<T extends ListboxItem>(
  props: PropsWithChildren<ComboboxProps<T>>,
): JSX.Element {
  const { children, ...rest } = props;

  const combobox = useCombobox<T>(rest);

  return <ComboboxProvider<T> value={combobox}>{children}</ComboboxProvider>;
}

export { OptionEmpty as ComboboxEmpty } from "../../primitives/common/option-empty";
export { ListboxContent as ComboboxContent } from "../listbox/listbox-content";
export { ListboxList as ComboboxList } from "../listbox/listbox-list";

export { ComboboxAnchor } from "./combobox-anchor";
export { ComboboxInput } from "./combobox-input";
export { ComboboxPopup } from "./combobox-popup";
export { ComboboxTrigger } from "./combobox-trigger";
export { ComboboxVirtualizer } from "./combobox-virtualizer";
