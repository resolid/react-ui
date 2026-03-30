import type { JSX } from "react/jsx-runtime";
import { MenuRoot, type MenuRootProps } from "../../primitives/menu/menu-root";

export type ContextMenuProps = Omit<MenuRootProps, "placement" | "preventScroll">;

export function ContextMenu(props: ContextMenuProps): JSX.Element {
  return <MenuRoot preventScroll {...props} />;
}

export { ContextMenuCheckboxItem } from "./context-menu-checkbox-item";
export { ContextMenuItem } from "./context-menu-item";
export { ContextMenuRadioGroup } from "./context-menu-radio-group";
export { ContextMenuRadioItem } from "./context-menu-radio-item";
export { ContextMenuTrigger } from "./context-menu-trigger";

export { MenuContent as ContextMenuContent } from "../../primitives/menu/menu-content";
export { MenuGroup as ContextMenuGroup } from "../../primitives/menu/menu-group";
export { MenuItemIndicator as ContextMenuItemIndicator } from "../../primitives/menu/menu-item-indicator";
export { MenuLabel as ContextMenuLabel } from "../../primitives/menu/menu-label";
export { MenuSeparator as ContextMenuSeparator } from "../../primitives/menu/menu-separator";
export { MenuSubTrigger as ContextMenuSubTrigger } from "../../primitives/menu/menu-sub-trigger";
