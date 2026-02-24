import type { JSX } from "react/jsx-runtime";
import { MenuContent } from "../../primitives/menu/menu-content";
import { MenuGroup } from "../../primitives/menu/menu-group";
import { MenuItemIndicator } from "../../primitives/menu/menu-item-indicator";
import { MenuLabel } from "../../primitives/menu/menu-label";
import { MenuRoot, type MenuRootProps } from "../../primitives/menu/menu-root";
import { MenuSeparator } from "../../primitives/menu/menu-separator";
import { MenuSubTrigger } from "../../primitives/menu/menu-sub-trigger";

export type ContextMenuProps = Omit<MenuRootProps, "placement" | "preventScroll">;

export const ContextMenu = (props: ContextMenuProps): JSX.Element => (
  <MenuRoot preventScroll {...props} />
);

export { ContextMenuCheckboxItem } from "./context-menu-checkbox-item";
export { ContextMenuItem } from "./context-menu-item";
export { ContextMenuRadioGroup } from "./context-menu-radio-group";
export { ContextMenuRadioItem } from "./context-menu-radio-item";
export { ContextMenuTrigger } from "./context-menu-trigger";

export const ContextMenuContent: typeof MenuContent = MenuContent;
export const ContextMenuSeparator: typeof MenuSeparator = MenuSeparator;
export const ContextMenuGroup: typeof MenuGroup = MenuGroup;
export const ContextMenuLabel: typeof MenuLabel = MenuLabel;
export const ContextMenuItemIndicator: typeof MenuItemIndicator = MenuItemIndicator;
export const ContextMenuSubTrigger: typeof MenuSubTrigger = MenuSubTrigger;
