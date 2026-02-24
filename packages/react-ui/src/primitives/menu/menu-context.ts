import type { FloatingRootContext } from "@floating-ui/react";
import type { RefObject } from "react";
import type { MenuItemContextValue } from "./menu-item-context";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../index";

export type MenuContextValue = MenuItemContextValue & {
  context: FloatingRootContext;
  nested: boolean;
  labelsRef: RefObject<(string | null)[]>;
  elementsRef: RefObject<(HTMLElement | null)[]>;
};

const [context, hook] = createSafeContext<MenuContextValue>({
  name: "MenuContext",
});

export const MenuContext: SafeContext<MenuContextValue> = context;
export const useMenu: UseSafeContext<MenuContextValue> = hook;
