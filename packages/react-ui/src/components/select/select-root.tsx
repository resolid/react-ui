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
import type { JSX, ReactNode } from "react";
import { useDisclosure, useMergeRefs } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { OptionEmptyContext } from "../../primitives/common/option-empty-context";
import { PopperPositioner } from "../../primitives/popper/popper-positioner";
import {
  PopperPositionerContext,
  type PopperPositionerContextValue,
} from "../../primitives/popper/popper-positioner-context";
import { getPopperAnimationProps } from "../../primitives/popper/utils";
import { inputTextShareStyles } from "../../shared/styles";
import type { DisclosureProps } from "../../shared/types";
import { ariaAttr, dataAttr, tx } from "../../utils";
import { inputPyStyles, inputStyles, selectHeightStyles } from "../input/input.styles";
import { ListboxProvider } from "../listbox/listbox-provider";
import type { ListboxRootProps } from "../listbox/listbox-root";
import { type ListboxItem, useListbox } from "../listbox/use-listbox";
import { Portal } from "../portal/portal";
import { VisuallyHiddenInput } from "../visually-hidden/visually-hidden-input";
import { SelectChevron } from "./select-chevron";
import { selectSizeStyles } from "./select.styles";

export type SelectRootProps<T extends ListboxItem> = DisclosureProps &
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

export const SelectRoot = <T extends ListboxItem>(
  props: PrimitiveProps<"div", SelectRootProps<T>>,
): JSX.Element => {
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
    closeOnSelect = true,
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
        apply({ availableWidth, elements, rects }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`,
            minWidth: `${rects.reference.width}px`,
          });
        },
      }),
    ],
    open: openState,
    onOpenChange: (open, _e, reason) => {
      if (open) {
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
    filterInputRef,
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

  const referenceRefs = useMergeRefs(refs.setReference, ref);

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
            <div className={"inline-flex gap-1"}>
              {selectedItems.map((item) => (
                <div
                  className={"rounded-md bg-bg-subtlest px-1.5"}
                  key={providerValue.getItemValue(item)}
                >
                  {renderValueFn(item)}
                </div>
              ))}
            </div>
          ) : (
            <div className={sizeStyle.item}>{renderValueFn(selectedItems[0])}</div>
          )
        ) : (
          <div className={tx("text-fg-placeholder", sizeStyle.item)}>{placeholder}</div>
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
                      filterInputRef,
                      setFloating: refs.setFloating,
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
};
