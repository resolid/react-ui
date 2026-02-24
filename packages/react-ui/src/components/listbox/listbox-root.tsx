import type { JSX } from "react/jsx-runtime";
import { useFloatingRootContext, useInteractions, useRole } from "@floating-ui/react";
import { type FocusEvent, useState } from "react";
import type { PrimitiveProps } from "../../primitives";
import type { FormFieldProps } from "../../shared/types";
import { tx } from "../../utils";
import { VisuallyHiddenInput } from "../visually-hidden/visually-hidden-input";
import { ListboxProvider } from "./listbox-provider";
import { type ListboxBaseProps, type ListboxItem, useListbox } from "./use-listbox";

export type ListboxRootProps<T extends ListboxItem> = FormFieldProps & {
  /**
   * 是否无效
   * @default false
   */
  invalid?: boolean;
} & ListboxBaseProps<T>;

export const ListboxRoot = <T extends ListboxItem>(
  props: PrimitiveProps<"div", ListboxRootProps<T>>,
): JSX.Element => {
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
    searchFilter,
    className,
    children,
    ...rest
  } = props;

  const [floating, setFloating] = useState<HTMLElement | null>(null);

  const context = useFloatingRootContext({
    open: true,
    elements: { floating: floating, reference: null },
  });

  const {
    selectedItems,
    navigationInteraction,
    typeaheadInteraction,
    interactiveHandlers,
    handleEnterKeydown,
    activeIndex,
    setActiveIndex,
    selectedIndices,
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
      setActiveIndex(selectedIndex ?? 0);
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
          activeIndex,
          selectedIndex,
          selectedIndices,
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
};
