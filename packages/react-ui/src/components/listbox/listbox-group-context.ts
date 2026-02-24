import type { ListboxBaseProps, ListboxItem } from "./use-listbox";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type ListboxGroupContextValue = Required<
  Pick<ListboxBaseProps<ListboxItem>, "renderGroupLabel">
>;

const [context, hook] = createSafeContext<ListboxGroupContextValue>({
  name: "ListboxGroupContext",
});

export const ListboxGroupContext: SafeContext<ListboxGroupContextValue> = context;
export const useListboxGroup: UseSafeContext<ListboxGroupContextValue> = hook;
