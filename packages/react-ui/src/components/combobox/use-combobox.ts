import {
  type FloatingRootContext,
  type ReferenceType,
  useClick,
  useDismiss,
  useFloatingRootContext,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { type HTMLProps, type KeyboardEvent, type SyntheticEvent, useRef, useState } from "react";
import { useDisclosure } from "../../hooks";
import type { PopperAnchorContextValue } from "../../primitives/popper/popper-anchor-context";
import type { PopperStateContextValue } from "../../primitives/popper/popper-state-context";
import type { PopperTriggerContextValue } from "../../primitives/popper/popper-trigger-context";
import type { DisclosureProps } from "../../shared/types";
import type { ListboxProviderProps } from "../listbox/listbox-provider";
import type { ListboxRootProps } from "../listbox/listbox-root";
import { type ListboxItem, useListbox } from "../listbox/use-listbox";
import type { ComboboxInputContextValue } from "./combobox-input-context";
import type { ComboboxPopupContextValue } from "./combobox-popup-context";
import type { ComboboxStateContextValue } from "./combobox-state-context";
import type { ComboboxTriggerContextValue } from "./combobox-trigger-context";

export type ComboboxProps<T extends ListboxItem> = DisclosureProps &
  ListboxRootProps<T> & {
    /**
     * 选择后关闭
     * @default true
     */
    closeOnSelect?: boolean;

    /**
     * 是否在输入值更改时打开组合框
     * @default true
     */
    openOnChange?: boolean;

    /**
     * 是否在按下箭头键时打开组合框
     * @default true
     */
    openOnArrowKeyDown?: boolean;
  };

export type UserComboboxReturnType<T extends ListboxItem> = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setPosition: (node: ReferenceType | null) => void;
  floatingElement: HTMLElement | null;
  rootContext: { rootContext: FloatingRootContext };
  stateContext: ComboboxStateContextValue;
  popupContext: ComboboxPopupContextValue;
  triggerContext: ComboboxTriggerContextValue;
  inputContext: ComboboxInputContextValue;
  popperStateContext: PopperStateContextValue;
  popperTriggerContext: PopperTriggerContextValue;
  popperAnchorContext: PopperAnchorContextValue;
  listboxProviderValue: ListboxProviderProps<T>["value"];
};

export const useCombobox = <T extends ListboxItem>({
  open,
  defaultOpen,
  onOpenChange,
  multiple = false,
  value,
  defaultValue = multiple ? [] : null,
  onChange,
  collection,
  valueKey = "value",
  labelKey = "value",
  disabledKey,
  childrenKey,
  searchFilter,
  renderItem,
  renderGroupLabel,
  name,
  disabled = false,
  readOnly = false,
  required = false,
  invalid = false,
  duration = 250,
  size = "md",
  closeOnSelect = true,
  openOnChange = true,
  openOnArrowKeyDown = true,
}: ComboboxProps<T>): UserComboboxReturnType<T> => {
  const [openState, { handleOpen, handleClose }] = useDisclosure({
    open,
    defaultOpen,
    onOpenChange,
  });

  const [reference, setReference] = useState<HTMLElement | null>(null);
  const [floating, setFloating] = useState<HTMLElement | null>(null);

  const [inputValue, setInputValue] = useState<string>(
    defaultValue === null
      ? ""
      : Array.isArray(defaultValue)
        ? defaultValue.join(",")
        : String(defaultValue),
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const context = useFloatingRootContext({
    elements: { reference, floating },
    open: openState,
    onOpenChange: (open, e, reason) => {
      if (open) {
        if (reason != "click") {
          setActiveIndex(selectedIndex ?? 0);
        }
        handleOpen();
      } else {
        if (
          !(
            (reason == "focus-out" && triggerRef.current == (e as FocusEvent).relatedTarget) ||
            (reason == "outside-press" && triggerRef.current?.contains(e?.target as Node))
          )
        ) {
          handleClose();

          setTimeout(() => {
            setActiveIndex(null);
            setFilterKeyword("");
          }, duration);
        }
      }
    },
  });

  const {
    selectedItems,
    setActiveIndex,
    selectedIndices,
    selectedIndex,
    navigationInteraction,
    typeaheadInteraction,
    interactiveHandlers,
    handleEnterKeydown,
    setFilterKeyword,
    ...providerValue
  } = useListbox({
    disabled,
    readOnly,
    multiple,
    value,
    defaultValue,
    onChange: (value) => {
      if (value == null) {
        setInputValue("");
      } else if (Array.isArray(value)) {
        setInputValue(value.join(","));
      } else {
        setInputValue(String(value));
      }

      onChange?.(value);
    },
    collection,
    valueKey,
    labelKey,
    disabledKey,
    childrenKey,
    context,
    onSelect: () => {
      if (closeOnSelect) {
        context.onOpenChange(false);
      }

      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    },
    typeahead: false,
    searchFilter,
    openOnArrowKeyDown,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useRole(context, { role: "listbox" }),
    useClick(context, {
      enabled: !disabled && !readOnly,
      ignoreMouse: true,
      keyboardHandlers: false,
    }),
    useDismiss(context, {
      enabled: !disabled && !readOnly,
    }),
  ]);

  const {
    getFloatingProps: getNavigationFloatingProps,
    getReferenceProps: getNavigationProps,
    getItemProps: getNavigationItemProps,
  } = useInteractions([navigationInteraction]);

  const referenceContext: PopperTriggerContextValue = {
    setReference: (node) => {
      setReference(node as HTMLElement);
    },
    getReferenceProps: (props) => {
      const { onKeyDown, onInput, ...rest } = props as HTMLProps<HTMLElement | HTMLInputElement>;

      // noinspection JSUnusedGlobalSymbols
      return getReferenceProps(
        getNavigationProps({
          onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
            handleEnterKeydown(e);

            onKeyDown?.(e);
          },
          onInput: (e: SyntheticEvent<HTMLInputElement, InputEvent>) => {
            setInputValue(e.currentTarget.value);

            if (!context.open && openOnChange) {
              context.onOpenChange(true);
            }

            setFilterKeyword(e.currentTarget.value);

            onInput?.(e);
          },
          ...rest,
        }),
      );
    },
  };

  return {
    open: openState,
    setOpen: (open) => context.onOpenChange(open),
    setPosition: context.refs.setPositionReference,
    floatingElement: context.elements.floating,
    rootContext: { rootContext: context },
    stateContext: { required, invalid },
    popupContext: { duration, setFloating },
    triggerContext: { triggerRef },
    inputContext: { inputRef, inputValue, name },
    popperStateContext: { open: openState },
    popperTriggerContext: referenceContext,
    popperAnchorContext: { setPositionReference: context.refs.setPositionReference },
    listboxProviderValue: {
      selectedIndices,
      selectedIndex,
      setFilterKeyword,
      ...providerValue,
      getFloatingProps: (props) =>
        getFloatingProps(
          getNavigationFloatingProps({
            ...interactiveHandlers,
            ...props,
          }),
        ),
      renderItem,
      renderGroupLabel,
      getNavigationProps: (props) =>
        getNavigationProps({
          onKeyDown: handleEnterKeydown,
          ...props,
        }),
      getItemProps: (props) => getItemProps(getNavigationItemProps(props)),
      open: openState,
      size,
      multiple,
      disabled,
      readOnly,
    },
  };
};
