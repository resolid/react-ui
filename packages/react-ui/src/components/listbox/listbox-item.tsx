import type { ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
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
  item: ListboxFlatItem;
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
      elementsRef.current[item.__index] = node;
      labelsRef.current[item.__index] = String(getItemValue(item));
    }

    return () => {
      elementsRef.current[item.__index] = null;
      labelsRef.current[item.__index] = null;
    };
  });

  const active = item.__index === activeIndex;
  const selected = item.__selected;
  const disabled = disabledProps || item.__disabled;
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
            ? selected
              ? 0
              : -1
            : item.__index == firstIndex
              ? 0
              : -1;

  const { handleClick, handleKeyUp, handleKeyDown } = getInteractiveHandlers({
    disabled: disabled || readOnly,
    typingRef,
    onClick: () => {
      handleSelect(item);
    },
  });

  return (
    <div
      ref={refs}
      // react-doctor-disable-next-line react-doctor/prefer-tag-over-role
      role="option"
      data-active={dataAttr(active)}
      aria-selected={ariaAttr(selected)}
      aria-disabled={ariaAttr(disabled)}
      className={tx(
        "flex w-full cursor-default items-center justify-between gap-1 rounded-md leading-none transition-colors outline-none",
        disabled ? !selected && "text-fg-subtlest" : "active:bg-bg-subtle",
        listboxItemStyles[size],
        inputPxStyles[size],
        selected && "text-fg-primary",
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
        renderItem(item, { active, selected })
      }
      {checkmark && selected && <CheckIcon />}
    </div>
  );
}
