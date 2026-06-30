import type { AnyObject } from "../../primitives/polymorphic";
import type { ListboxBaseProps } from "./use-listbox";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives/context";

export type ListboxGroupContextValue<T extends AnyObject = AnyObject> = Required<
  Pick<ListboxBaseProps<T>, "renderGroupLabel">
>;

const [context, hook] = createSafeContext<ListboxGroupContextValue>({
  name: "ListboxGroupContext",
});

export const ListboxGroupContext: SafeContext<ListboxGroupContextValue> = context;
export const useListboxGroup: UseSafeContext<ListboxGroupContextValue> = hook;
