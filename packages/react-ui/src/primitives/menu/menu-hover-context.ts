import type { Dispatch, SetStateAction } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../index";

export type MenuHoverContextValue = { setHoverEnabled: Dispatch<SetStateAction<boolean>> };

const [context, hook] = createSafeContext<MenuHoverContextValue>({
  name: "MenuHoverContext",
});

export const MenuHoverContext: SafeContext<MenuHoverContextValue> = context;
export const useMenuHover: UseSafeContext<MenuHoverContextValue> = hook;
