import type { ReactNode } from "react";
import type { AnyObject, PrimitiveProps } from "../../primitives/polymorphic";
import type { ListboxFlatItem } from "./use-listbox";
import { useMergeRefs } from "../../hooks/use-merge-refs";
import { CheckIcon } from "../../shared/icons";
import { getInteractiveHandlers } from "../../shared/utils";
import { tx } from "../../utils/clsx";
import { ariaAttr, dataAttr } from "../../utils/dom";
import { inputPxStyles, type InputSize } from "../input/input.styles";
import { useListboxItem } from "./listbox-item-context";
import { listboxItemStyles } from "./listbox.styles";

type ListboxItemProps = {
  item: ListboxFlatItem<AnyObject>;
  size: InputSize;
  disabled: boolean;
  readOnly: boolean;
  checkmark: boolean;
};

export function ListboxItem(
  props: PrimitiveProps<"div", ListboxItemProps, "tabIndex" | "children">,
): ReactNode {
  const {
    item,
    size,
    disabled: disabledProps,
    readOnly,
    checkmark,
    ref,
    className,
    ...rest
  } = props;

  const {
    firstIndex,
    activeIndex,
    selectedIndex,
    handleSelect,
    getItemProps,
    getItemValue,
    typingRef,
    focusItemOnOpen,
    virtual,
    renderItem,
    elementsRef,
    labelsRef,
  } = useListboxItem();

  const refs = useMergeRefs(ref, (node) => {
    if (node) {
      elementsRef.current[item.index] = node;
      labelsRef.current[item.index] = String(getItemValue(item));
    }

    return () => {
      elementsRef.current[item.index] = null;
      labelsRef.current[item.index] = null;
    };
  });

  const active = item.index === activeIndex;
  const disabled = disabledProps || item.disabled;
  const tabIndex =
    disabled || focusItemOnOpen !== false
      ? undefined
      : virtual
        ? -1
        : activeIndex != null
          ? active
            ? 0
            : -1
          : selectedIndex != null
            ? item.selected
              ? 0
              : -1
            : item.index == firstIndex
              ? 0
              : -1;

  const { handleClick, handleKeyUp, handleKeyDown } = getInteractiveHandlers({
    disabled: disabled || readOnly,
    typingRef,
    onClick: () => {
      handleSelect(item.item);
    },
  });

  return (
    <div
      ref={refs}
      role="option"
      data-active={dataAttr(active)}
      aria-selected={ariaAttr(item.selected)}
      aria-disabled={ariaAttr(disabled)}
      className={tx(
        "flex w-full cursor-default items-center justify-between gap-1 rounded-md leading-none transition-colors outline-none",
        disabled ? !item.selected && "text-fg-subtlest" : "active:bg-bg-subtle",
        listboxItemStyles[size],
        inputPxStyles[size],
        item.selected && "text-fg-primary",
        className,
      )}
      {...getItemProps({
        ...rest,
        tabIndex,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        onKeyUp: handleKeyUp,
      })}
    >
      {
        // react-doctor-disable-next-line react-doctor/no-render-in-render
        renderItem(item.item, { active, selected: item.selected })
      }
      {checkmark && item.selected && <CheckIcon />}
    </div>
  );
}
