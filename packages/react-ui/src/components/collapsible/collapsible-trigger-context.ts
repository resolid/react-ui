import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type CollapsibleTriggerContextValue = {
  id: string;
  disabled: boolean;
  open: boolean;
  toggle: () => void;
};

const [context, hook] = createSafeContext<CollapsibleTriggerContextValue>({
  name: "CollapsibleTriggerContext",
});

export const CollapsibleTriggerContext: SafeContext<CollapsibleTriggerContextValue> = context;
export const useCollapsibleTrigger: UseSafeContext<CollapsibleTriggerContextValue> = hook;
