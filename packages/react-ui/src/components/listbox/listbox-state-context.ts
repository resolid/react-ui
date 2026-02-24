import type { InputSize } from "../input/input.styles";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type ListboxStateContextValue = {
  size: InputSize;
  multiple: boolean;
  disabled: boolean;
  readOnly: boolean;
};

const dest = createSafeContext<ListboxStateContextValue>({
  name: "ListboxStateContext",
});

export const ListboxStateContext: SafeContext<ListboxStateContextValue> = dest[0];
export const useListboxState: UseSafeContext<ListboxStateContextValue> = dest[1];
