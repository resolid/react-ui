import type { JSX } from "react/jsx-runtime";
import { ariaAttr, tx } from "../../utils";
import type { PolymorphicProps } from "../index";
import { MenuItem, type MenuItemProps } from "./menu-item";
import { MenuItemIndicatorContext } from "./menu-item-indicator-context";
import { useMenuRadioGroup } from "./menu-radio-group-context";

export type MenuRadioItemProps = MenuItemProps & {
  /**
   * 菜单单选项的价值
   */
  value: string | number;
};

export const MenuRadioItem = (
  props: PolymorphicProps<"div", MenuRadioItemProps, "role" | "tabIndex">,
): JSX.Element => {
  const { value, onSelect, children, className, ...rest } = props;

  const group = useMenuRadioGroup();
  const checked = value == group.value;

  const handleSelect = () => {
    group.onChange?.(value);
    onSelect?.();
  };

  return (
    <MenuItemIndicatorContext value={{ checked }}>
      <MenuItem
        role="menuitemradio"
        onSelect={handleSelect}
        label={value as string}
        aria-checked={ariaAttr(checked)}
        className={tx("relative ps-6", className)}
        {...rest}
      >
        {children}
      </MenuItem>
    </MenuItemIndicatorContext>
  );
};
