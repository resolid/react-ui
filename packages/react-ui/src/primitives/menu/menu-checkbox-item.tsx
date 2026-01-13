import type { JSX } from "react/jsx-runtime";
import { ariaAttr, tx } from "../../utils";
import type { PolymorphicProps } from "../index";
import { MenuItem, type MenuItemProps } from "./menu-item";
import { type CheckedState, MenuItemIndicatorContext } from "./menu-item-indicator-context";

export type MenuCheckboxItemProps = MenuItemProps & {
  /**
   * 项目的受控选中状态
   */
  checked?: CheckedState;

  /**
   * 项目选中状态更改时调用的事件处理程序
   */
  onChange?: (checked: CheckedState) => void;
};

export const MenuCheckboxItem = (
  props: PolymorphicProps<"div", MenuCheckboxItemProps, "role" | "tabIndex">,
): JSX.Element => {
  const { checked = false, className, onChange, onSelect, children, ...rest } = props;

  const handleSelect = () => {
    onChange?.(checked == "indeterminate" ? true : !checked);
    onSelect?.();
  };

  return (
    <MenuItemIndicatorContext value={{ checked }}>
      <MenuItem
        role="menuitemcheckbox"
        onSelect={handleSelect}
        aria-checked={checked == "indeterminate" ? "mixed" : ariaAttr(checked)}
        className={tx("relative ps-6", className)}
        {...rest}
      >
        {children}
      </MenuItem>
    </MenuItemIndicatorContext>
  );
};
