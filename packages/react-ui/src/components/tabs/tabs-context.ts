import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type TabsContextValue = {
  baseId: string;
  selectedValue?: string;
  setSelectedValue: (value: string) => void;
};

const [context, hook] = createSafeContext<TabsContextValue>({
  name: "TabsContext",
});

export const TabsContext: SafeContext<TabsContextValue> = context;
export const useTabs: UseSafeContext<TabsContextValue> = hook;

export const getTabId = (baseId: string, value: string) => `${baseId}-t-${value}`;

export const getPanelId = (baseId: string, value: string) => `${baseId}-p-${value}`;
