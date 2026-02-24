import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type CollapsibleContentContextValue = {
  id: string;
  open: boolean;
  duration: number;
};

const [context, hook] = createSafeContext<CollapsibleContentContextValue>({
  name: "CollapsibleContentContext",
});

export const CollapsibleContentContext: SafeContext<CollapsibleContentContextValue> = context;
export const useCollapsibleContent: UseSafeContext<CollapsibleContentContextValue> = hook;
