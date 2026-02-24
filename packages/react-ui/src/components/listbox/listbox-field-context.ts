import type { ListboxItem, UseListboxResult } from "./use-listbox";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type ListboxFieldsContextValue = Pick<
  UseListboxResult<ListboxItem>,
  "getItemValue" | "getItemLabel" | "getItemDisabled" | "getItemChildren"
> & {
  childrenKey: string;
};

const [context, hook] = createSafeContext<ListboxFieldsContextValue>({
  name: "ListboxFieldsContext",
});

export const ListboxFieldsContext: SafeContext<ListboxFieldsContextValue> = context;
export const useListboxFields: UseSafeContext<ListboxFieldsContextValue> = hook;
