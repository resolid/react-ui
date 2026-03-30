import type { JSX } from "react/jsx-runtime";
import type { PolymorphicProps } from "../polymorphic";
import { getInteractiveHandlers } from "../../shared/utils";
import { MenuBaseItem, type MenuBaseItemProps } from "./menu-base-item";
import { useMenuItem } from "./menu-item-context";

export type MenuItemProps = MenuBaseItemProps & {
  /**
   * 选择项目后, 菜单将关闭
   */
  closeOnSelect?: boolean;

  /**
   * 当用户选择一个项目（通过鼠标或键盘）时调用事件处理程序
   */
  onSelect?: () => void;
};

export function MenuItem(props: PolymorphicProps<"div", MenuItemProps, "tabIndex">): JSX.Element {
  const { menuEvents, closeOnSelect: menuCloseOnSelect, typingRef } = useMenuItem();

  const {
    className,
    children,
    onClick,
    onSelect,
    disabled = false,
    closeOnSelect = menuCloseOnSelect,
    ...rest
  } = props;

  const { handleClick, handleKeyUp, handleKeyDown } = getInteractiveHandlers({
    disabled,
    typingRef,
    onClick: (e) => {
      onClick?.(e);
      onSelect?.();

      if (closeOnSelect) {
        menuEvents.emit("close");
      }
    },
  });

  return (
    <MenuBaseItem
      disabled={disabled}
      className={className}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      {...rest}
    >
      {children}
    </MenuBaseItem>
  );
}
