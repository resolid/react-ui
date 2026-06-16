import type { FloatingEvents } from "@floating-ui/react";
import type { HTMLProps, RefObject } from "react";
import type { AnyObject } from "../polymorphic";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

export type MenuItemContextValue = {
  menuEvents: FloatingEvents;
  closeOnSelect: boolean;
  activeIndex: number | null;
  getItemProps: (userProps?: HTMLProps<HTMLElement>) => AnyObject;
  typingRef: RefObject<boolean>;
};

const [context, hook] = createSafeContext<MenuItemContextValue>({
  name: "MenuItemContext",
});

export const MenuItemContext: SafeContext<MenuItemContextValue> = context;
export const useMenuItem: UseSafeContext<MenuItemContextValue> = hook;
