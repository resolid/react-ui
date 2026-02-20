import { useListItem } from "@floating-ui/react";
import { isString } from "@resolid/utils";
import type { JSX } from "react/jsx-runtime";
import { useMergeRefs } from "../../hooks";
import { ariaAttr, dataAttr, tx } from "../../utils";
import { Polymorphic, type PolymorphicProps } from "../polymorphic";
import { useMenuItem } from "./menu-item-context";

export type MenuBaseItemProps = {
  /**
   * 用于菜单的提前导航文本。如果未提供，将使用菜单项的文本内容
   */
  label?: string;

  /**
   * 该项目是否被禁用
   * @default false
   */
  disabled?: boolean;
};

export const MenuBaseItem = (
  props: PolymorphicProps<"div", MenuBaseItemProps, "tabIndex">,
): JSX.Element => {
  const { render, className, ref, children, label, role, disabled = false, ...rest } = props;

  const { getItemProps, activeIndex } = useMenuItem();
  const { ref: itemRef, index } = useListItem({
    label: label ?? (isString(children) ? children : null),
  });

  const active = index !== null && index === activeIndex;

  const refs = useMergeRefs(ref, itemRef);

  return (
    <Polymorphic<"div">
      as={"div"}
      render={render}
      ref={refs}
      role={role ?? "menuitem"}
      aria-disabled={ariaAttr(disabled)}
      data-active={dataAttr(active)}
      tabIndex={active ? 0 : -1}
      className={tx(
        "flex w-full cursor-default items-center rounded-md px-2 py-1.5 transition-colors outline-none select-none",
        disabled ? "text-fg-muted" : "active:bg-bg-subtle",
        className,
      )}
      {...getItemProps(rest)}
    >
      {children}
    </Polymorphic>
  );
};
