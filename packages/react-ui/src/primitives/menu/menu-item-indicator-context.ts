import { createSafeContext, type SafeContext, type UseSafeContext } from "../index";

export type CheckedState = boolean | "indeterminate";

type MenuItemIndicatorContextValue = {
  checked: CheckedState;
};

const [context, hook] = createSafeContext<MenuItemIndicatorContextValue>({
  name: "MenuItemIndicatorContext",
});

export const MenuItemIndicatorContext: SafeContext<MenuItemIndicatorContextValue> = context;
export const useMenuItemIndicator: UseSafeContext<MenuItemIndicatorContextValue> = hook;
