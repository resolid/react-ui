import { useListItem } from "@floating-ui/react";
import { type FocusEvent, type MouseEvent, type ReactNode, useEffectEvent, useRef } from "react";
import { useButtonProps } from "../../hooks/use-button-props";
import { useIsomorphicEffect } from "../../hooks/use-isomorphic-effect";
import { useMergeRefs } from "../../hooks/use-merge-refs";
import { useComposite } from "../../primitives/composite/composite-context";
import { useOrientation } from "../../primitives/composite/orientation-context";
import { Polymorphic, type PolymorphicProps } from "../../primitives/polymorphic";
import { tx } from "../../utils/clsx";
import { ariaAttr, dataAttr } from "../../utils/dom";
import { getPanelId, getTabId, useTabs } from "./tabs-context";

type TabsTabProps = {
  /**
   * 将内容与触发器关联起来的唯一值
   */
  value: string;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
};

export function TabsTab(
  props: PolymorphicProps<"button", TabsTabProps, "type" | "role" | "id" | "tabIndex">,
): ReactNode {
  const {
    render,
    value,
    disabled = false,
    children,
    className,
    onClick,
    onFocus,
    ref,
    ...rest
  } = props;

  const orientation = useOrientation();
  const { baseId, selectedValue, setSelectedValue } = useTabs();
  const { ref: itemRef, index } = useListItem();
  const { activeIndex, setActiveIndex, setActiveElement } = useComposite();
  const elementRef = useRef(null);

  const tabId = getTabId(baseId, value);
  const panelId = getPanelId(baseId, value);
  const selected = selectedValue === value;

  const setActive = useEffectEvent((idx: number) => {
    setActiveIndex(idx);
  });

  useIsomorphicEffect(() => {
    if (selected) {
      setActiveElement?.(elementRef.current);

      if (index > -1 && index != activeIndex) {
        // oxlint-disable-next-line react-hooks/rules-of-hooks,react-doctor/rules-of-hooks
        setActive(index);
      }
    }
  }, [index, selected, activeIndex, setActiveElement]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    onClick?.(e);
    setSelectedValue(value);
  };

  const handleFocus = (e: FocusEvent<HTMLButtonElement>) => {
    onFocus?.(e);

    if (e.target === e.currentTarget) {
      setSelectedValue(value);
    }
  };

  const buttonProps = useButtonProps({
    hasRender: !!render,
    role: "tab",
    disabled,
    tabIndex: selected ? 0 : -1,
  });

  const refs = useMergeRefs(ref, elementRef, itemRef);

  return (
    <Polymorphic<"button">
      as="button"
      render={render}
      ref={refs}
      {...buttonProps}
      id={tabId}
      aria-controls={selected ? panelId : undefined}
      aria-selected={ariaAttr(selected)}
      data-active={dataAttr(selected)}
      className={tx(
        orientation == "horizontal" ? "-mb-px" : "-me-px",
        disabled && "opacity-60",
        className,
      )}
      onClick={handleClick}
      onFocus={handleFocus}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
}
