import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  size as floatingSize,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStatus,
} from "@floating-ui/react";
import { type JSX, type ReactNode, useRef } from "react";
import type { PrimitiveProps } from "../../primitives";
import type { DisclosureProps } from "../../shared/types";
import type { ListboxRootProps } from "../listbox/listbox-root";
import { useDisclosure, useMergeRefs } from "../../hooks";
import { InputItem } from "../../primitives/common/input-item";
import { inputItemSizeStyles } from "../../primitives/common/input-item.styles";
import { OptionEmptyContext } from "../../primitives/common/option-empty-context";
import { PopperPositioner } from "../../primitives/popper/popper-positioner";
import {
  PopperPositionerContext,
  type PopperPositionerContextValue,
} from "../../primitives/popper/popper-positioner-context";
import { getPopperAnimationProps } from "../../primitives/popper/utils";
import { inputTextShareStyles } from "../../shared/styles";
import { ariaAttr, dataAttr, tx } from "../../utils";
import { inputPyStyles, inputStyles, selectHeightStyles } from "../input/input.styles";
import { ListboxProvider } from "../listbox/listbox-provider";
import { type ListboxItem, useListbox } from "../listbox/use-listbox";
import { Portal } from "../portal/portal";
import { VisuallyHiddenInput } from "../visually-hidden/visually-hidden-input";
import { SelectChevron } from "./select-chevron";
import { selectSizeStyles } from "./select.styles";

export type SelectRootProps<T extends ListboxItem = ListboxItem> = DisclosureProps &
  ListboxRootProps<T> & {
    /**
     * 自定义值渲染
     */
    renderValue?: (item: T) => ReactNode;

    /**
     * 占位符
     */
    placeholder?: string;

    /**
     * 选择后关闭
     * @default true
     */
    closeOnSelect?: boolean;
  };

export function SelectRoot<T extends ListboxItem>(
  props: PrimitiveProps<"div", SelectRootProps<T>>,
): JSX.Element {
  const {
    open,
    defaultOpen,
    onOpenChange,
    multiple = false,
    value,
    defaultValue = multiple ? [] : null,
    onChange,
    collection,
    valueKey,
    labelKey,
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
    placeholder,
    closeOnSelect = !multiple,
    renderValue,
    children,
    className,
    ref,
    ...rest
  } = props;

  const [openState, { handleOpen, handleClose }] = useDisclosure({
    open,
    defaultOpen,
    onOpenChange,
  });

  const { refs, context, elements, floatingStyles } = useFloating<HTMLDivElement>({
    middleware: [
      offset(6),
      flip(),
      floatingSize({
        apply({ availableWidth, elements: applyElements, rects }) {
          Object.assign(applyElements.floating.style, {
            maxWidth: `${availableWidth}px`,
            minWidth: `${rects.reference.width}px`,
          });
        },
      }),
    ],
    open: openState,
    onOpenChange: (opened, _e, reason) => {
      if (opened) {
        if (reason != "click") {
          setActiveIndex(selectedIndex ?? 0);
        }

        handleOpen();
      } else {
        handleClose();

        if (reason != "focus-out" && reason != "outside-press") {
          requestAnimationFrame(() => {
            elements.domReference?.focus();
          });
        }

        setTimeout(() => {
          setFilterKeyword("");
        }, duration);
      }
    },
    placement: "bottom",
    whileElementsMounted: autoUpdate,
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
    filterInputRef,
    handleSelect,
    ...providerValue
  } = useListbox({
    disabled,
    readOnly,
    multiple,
    value,
    defaultValue,
    onChange,
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
    },
    searchFilter,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useRole(context, { role: "listbox" }),
    useClick(context, {
      enabled: !disabled && !readOnly,
      keyboardHandlers: closeOnSelect,
    }),
    useDismiss(context, {
      enabled: !disabled && !readOnly,
    }),
    typeaheadInteraction,
  ]);

  const {
    getFloatingProps: getNavigationFloatingProps,
    getReferenceProps: getNavigationProps,
    getItemProps: getNavigationItemProps,
  } = useInteractions([navigationInteraction]);

  const rootRef = useRef(null);

  const referenceRefs = useMergeRefs(refs.setReference, rootRef, ref);

  const { isMounted, status } = useTransitionStatus(context, {
    duration,
  });

  const positionerContext: PopperPositionerContextValue = {
    setPositioner: refs.setFloating,
    positionerStyles: floatingStyles,
  };

  const animationProps = getPopperAnimationProps({ status, duration });

  const sizeStyle = selectSizeStyles[size];

  const renderValueFn = renderValue ?? providerValue.getItemLabel;

  return (
    <>
      <div
        ref={referenceRefs}
        tabIndex={disabled ? -1 : 0}
        data-active={dataAttr(openState)}
        aria-disabled={ariaAttr(disabled)}
        aria-required={ariaAttr(required)}
        className={tx(
          "bg-bg-normal select-none",
          inputStyles({ disabled, invalid, active: openState, focusable: true }),
          inputPyStyles[size],
          selectHeightStyles[size],
          inputTextShareStyles[size],
          sizeStyle.select,
          sizeStyle.root,
          disabled
            ? "opacity-60"
            : "active:border-bg-primary-emphasis active:outline-bg-primary-emphasis/70",
          className,
        )}
        {...getReferenceProps(getNavigationProps(rest))}
      >
        {selectedItems.length > 0 ? (
          multiple ? (
            <div className="inline-flex gap-1">
              {selectedItems.map((item) => (
                <InputItem
                  key={providerValue.getItemValue(item)}
                  size={size}
                  disabled={disabled}
                  finalRef={rootRef}
                  className="bg-bg-subtlest"
                  onDelete={() => handleSelect(item)}
                >
                  {renderValueFn(item)}
                </InputItem>
              ))}
            </div>
          ) : (
            <div className={inputItemSizeStyles[size]}>{renderValueFn(selectedItems[0]!)}</div>
          )
        ) : (
          <div className={tx("text-fg-placeholder", inputItemSizeStyles[size])}>{placeholder}</div>
        )}
        <SelectChevron className={sizeStyle.chevron} />
      </div>
      {isMounted && (
        <Portal>
          <PopperPositionerContext value={positionerContext}>
            <OptionEmptyContext value={providerValue.nodeItems.length == 0}>
              <PopperPositioner
                style={animationProps.style}
                className={tx(
                  "rounded-md border border-bd-normal bg-bg-normal shadow-sm",
                  animationProps.className,
                )}
                tabIndex={-1}
              >
                <FloatingFocusManager
                  initialFocus={filterInputRef}
                  disabled={!openState}
                  context={context}
                  modal={false}
                  returnFocus={false}
                >
                  <ListboxProvider
                    value={{
                      ...providerValue,
                      selectedIndex,
                      selectedIndices,
                      setFilterKeyword,
                      handleSelect,
                      filterInputRef,
                      setFloating: refs.setFloating,
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

                      open: openState,
                      size,
                      multiple,
                      disabled,
                      readOnly,
                    }}
                  >
                    {children}
                  </ListboxProvider>
                </FloatingFocusManager>
              </PopperPositioner>
            </OptionEmptyContext>
          </PopperPositionerContext>
        </Portal>
      )}
      {name && (
        <VisuallyHiddenInput
          name={name}
          value={multiple ? selectedItems : selectedItems[0]}
          getValue={providerValue.getItemValue}
          disabled={disabled}
          required={required}
        />
      )}
    </>
  );
}
