import { useFloatingRootContext, useInteractions, useRole } from "@floating-ui/react";
import { type FocusEvent, type ReactNode, useState } from "react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
import type { FormFieldProps } from "../../shared/types";
import type { InputSize } from "../input/input.styles";
import { tx } from "../../utils/clsx";
import { VisuallyHiddenInput } from "../visually-hidden/visually-hidden-input";
import { ListboxProvider } from "./listbox-provider";
import { type ListboxBaseProps, type ListboxItem, useListbox } from "./use-listbox";

export type ListboxRootProps<T extends ListboxItem = ListboxItem> = FormFieldProps & {
  /**
   * 是否无效
   * @default false
   */
  invalid?: boolean;

  /**
   * 大小
   * @default "md"
   */
  size?: InputSize;
} & ListboxBaseProps<T>;

export function ListboxRoot<T extends ListboxItem>(
  props: PrimitiveProps<"div", ListboxRootProps<T>>,
): ReactNode {
  const {
    multiple = false,
    value,
    defaultValue,
    onChange,
    collection,
    valueKey,
    labelKey,
    disabledKey,
    childrenKey,
    renderItem,
    renderGroupLabel,
    name,
    disabled = false,
    readOnly = false,
    required = false,
    invalid = false,
    size = "md",
    defaultKeyword,
    searchFilter,
    className,
    children,
    ...rest
  } = props;

  const [floating, setFloating] = useState<HTMLElement | null>(null);

  const context = useFloatingRootContext({
    open: true,
    elements: { floating, reference: null },
  });

  const {
    firstIndex,
    selectedItems,
    navigationInteraction,
    typeaheadInteraction,
    interactiveHandlers,
    handleEnterKeydown,
    activeIndex,
    setActiveIndex,
    selectedIndex,
    ...providerValue
  } = useListbox({
    disabled,
    readOnly,
    multiple,
    value,
    defaultValue,
    onChange,
    collection,
    searchFilter,
    valueKey,
    labelKey,
    disabledKey,
    childrenKey,
    context,
    defaultKeyword,
    focusItemOnOpen: false,
  });

  const { getFloatingProps, getItemProps } = useInteractions([
    useRole(context, { role: "listbox" }),
    typeaheadInteraction,
  ]);

  const {
    getFloatingProps: getNavigationFloatingProps,
    getReferenceProps: getNavigationProps,
    getItemProps: getNavigationItemProps,
  } = useInteractions([navigationInteraction]);

  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setActiveIndex(null);
    }
  };

  const handleFocus = () => {
    if (activeIndex == null) {
      setActiveIndex(selectedIndex ?? firstIndex);
    }
  };

  return (
    <div
      role="presentation"
      className={tx(
        "rounded-md border",
        invalid ? "border-bd-invalid" : "border-bd-normal",
        className,
      )}
      onBlur={handleBlur}
      onFocus={handleFocus}
      {...rest}
    >
      <ListboxProvider
        value={{
          ...providerValue,
          firstIndex,
          activeIndex,
          selectedIndex,
          setFloating,
          getFloatingProps: (floatingProps) =>
            getFloatingProps(
              getNavigationFloatingProps({
                ...interactiveHandlers,
                ...floatingProps,
              }),
            ),
          renderItem,
          renderGroupLabel,
          getNavigationProps: (navProps) =>
            getNavigationProps({
              onKeyDown: handleEnterKeydown,
              ...navProps,
            }),
          getItemProps: (itemProps) => getItemProps(getNavigationItemProps(itemProps)),
          open: true,
          size,
          multiple,
          disabled,
          readOnly,
          filterKeyword: defaultKeyword,
          focusItemOnOpen: false,
        }}
      >
        {children}
      </ListboxProvider>
      {name && (
        <VisuallyHiddenInput
          name={name}
          value={multiple ? selectedItems : selectedItems[0]}
          getValue={providerValue.getItemValue}
          disabled={disabled}
          required={required}
        />
      )}
    </div>
  );
}
